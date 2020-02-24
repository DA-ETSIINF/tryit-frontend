import {
	Indexes,
	DynamicFormModule,
	FormType,
	InputType,
	InputIdType,
	InputValueType
} from "~/types/components"
import { emitInput } from "./"

function findInputById(form: FormType, id: InputIdType): Indexes {
	let section: number = -1
	let input: number = -1
	form.sections.forEach((s, _sectionIndex) => {
		s.inputs.forEach((i, _inputIndex) => {
			if (i.id === id) {
				section = _sectionIndex
				input = _inputIndex
			}
		})
	})
	return { section, input }
}

function getInputByIndexes(form: FormType, indexes: Indexes): InputType {
	// console.log("Form requires.ts: ", form)
	return form.sections[indexes.section].inputs[indexes.input]
}

function getInputById(form: FormType, id: InputIdType): InputType | null {
	for (let i = 0; i < form.sections.length; i++) {
		const section = form.sections[i]
		for (let j = 0; j < section.inputs.length; j++) {
			const input = section.inputs[j]
			if (input.id === id) {
				return input
			}
		}
	}
	return null
}

function compareObjects(obj1: any, obj2: any) {
	return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function getDependencies(form: FormType, indexes: Indexes): InputType[] {
	// It gets all the inputs that depend on the input being checked
	const input = getInputByIndexes(form, indexes)
	let inputsToUnlock: InputType[] = []
	form.sections.forEach(section => {
		const unlockInputs = section.inputs.filter(i =>
			i.requires?.find(r => r.id === input.id && compareObjects(r.value, input.value))
		)
		inputsToUnlock.push(...unlockInputs)
	})
	return inputsToUnlock
}

interface InputTypeValue {
	show: boolean
	input: InputType
}
function checkForTheRest(
	inputsToUnlock: InputType[],
	expectedValue: InputValueType
): InputTypeValue[] {
	// It checks that the rest of the inputs for all the inputs that were depending
	// on the input being checked are valid as well
	return inputsToUnlock.map(input => {
		if (input.requires) {
			if (!input.requires || input.requires.length > 0) {
				for (let i = 0; i < input.requires.length; i++) {
					const requires = input.requires[i]
					if (!compareObjects(expectedValue, requires.value)) {
						return {
							show: false,
							input
						}
					}
				}
			}
		}
		return {
			show: true,
			input
		}
	})
}

function unlock(form: FormType, formModule: DynamicFormModule, inputsToUnlock: InputTypeValue[]) {
	inputsToUnlock.forEach(input => {
		// If all of the requires array elements are fulfilled then we show the input
		const data = {
			key: "show",
			value: input.show,
			indexes: findInputById(form, input.input.id)
		}
		emitInput(formModule, data)
	})
}
import { TicketModule } from "~/store/ticket"
import {VolunteerModule} from "~/store/volunteer"

function getFormName(formModule) {
	switch (formModule) {
		case "ticket":
			return "ticketForm"
		case "volunteer":
			return "volunteerForm"
	}
}
export function checkForRequires(
	indexes: Indexes,
	formModule: DynamicFormModule,
	expectedValue: InputValueType
) {
	let formName = getFormName(formModule)
	if (!formName) {
		return
	}
	//I think I have found a bug
	// console.log("formName: ", formName)
	let form: FormType = formName == "ticketForm" ? TicketModule[formName] : VolunteerModule[formName]
	let inputsToUnlock: InputType[] = getDependencies(form, indexes)
	let checkedInputsToUnlock: InputTypeValue[] = checkForTheRest(inputsToUnlock, expectedValue)
	unlock(form, formModule, checkedInputsToUnlock)
}

export function checkInputsForRequires(
	form: FormType,
	formModule: DynamicFormModule,
	expectedValue: InputValueType
) {
	form.sections.forEach((s, section) => {
		s.inputs.forEach((i, input) => {
			let inputsToUnlock: InputType[] = getDependencies(form, { section, input })
			let checkedInputsToUnlock: InputTypeValue[] = checkForTheRest(inputsToUnlock, expectedValue)
			unlock(form, formModule, checkedInputsToUnlock)
		})
	})
}
