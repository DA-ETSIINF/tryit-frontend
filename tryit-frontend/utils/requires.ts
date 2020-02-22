import { Indexes, DynamicFormModule, FormType, InputType, InputIdType } from "~/types/components"
import { TicketModule } from "../store/ticket"
import { VolunteerModule } from "../store/volunteer"

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
	return form.sections[indexes.section].inputs[indexes.input]
}

function getInputById(form: FormType, id: InputIdType): InputType | null {
	form.sections.forEach(section => {
		section.inputs.forEach(input => {
			if (input.id === id) {
				return input
			}
		})
	})
	return null
}

function getForm(formModule: DynamicFormModule) {
	switch (formModule) {
		case "ticket":
			return TicketModule.ticketForm
		case "volunteer":
			return VolunteerModule.volunteerForm
	}
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

function checkForTheRest(form: FormType, inputsToUnlock: InputType[]) {
	// It checks that the rest of the inputs for all the inputs that were depending
	// on the input being checked are valid as well
	return inputsToUnlock.filter(input => {
		if (input.requires) {
			input.requires.forEach(requires => {
				const inputRequired = getInputById(form, requires.id)
				if (compareObjects(inputRequired?.value, input.value)) {
					return false
				}
			})
		}
		return true
	})
}

function unlock(form: FormType, formModule: DynamicFormModule, inputsToUnlock: InputType[]) {
	inputsToUnlock.forEach(input => {
		// If all of the requires array elements are fulfilled then we show the input
		const data = {
			key: "show",
			value: true,
			indexes: findInputById(form, input.id)
		}
		switch (formModule) {
			case "ticket":
				TicketModule.updateInput(data)
				break
			case "volunteer":
				VolunteerModule.updateInput(data)
				break
		}
	})
}

export function checkForRequires(indexes: Indexes, formModule: DynamicFormModule) {
	let form: FormType = getForm(formModule)
	let inputsToUnlock: InputType[] = getDependencies(form, indexes)
	let checkedInputsToUnlock: InputType[] = checkForTheRest(form, inputsToUnlock)
	unlock(form, formModule, checkedInputsToUnlock)
	console.log(checkedInputsToUnlock)
}

export function checkInputsForRequires(form: FormType, formModule: DynamicFormModule) {
	form.sections.forEach((s, section) => {
		s.inputs.forEach((i, input) => {
			let inputsToUnlock: InputType[] = getDependencies(form, { section, input })
			let checkedInputsToUnlock: InputType[] = checkForTheRest(form, inputsToUnlock)
			unlock(form, formModule, checkedInputsToUnlock)
		})
	})
}
