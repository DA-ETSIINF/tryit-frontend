import {
	StatusOnInput,
	Requirement,
	StatusDetailOnInput,
	Indexes,
	InputStatus,
	DynamicFormModule,
	InputValueType,
	FormType,
	InputType,
	InputIdType
} from "~/types/components"
import { TicketModule } from "../store/ticket"
import { VolunteerModule } from "../store/volunteer"

const INPUTS_ERRORS = {
	notEmpty: {
		message: "Este campo no puede estar vacío",
		abbreviation: "field_cannot_be_empty"
	},
	isOnlyLetters: {
		message: "Sólo puede contener letras",
		abbreviation: "just_letters"
	},
	isPersonId: {
		incorrectFormat: {
			message: "Esto no está bien, recuerda que debe tener una letra",
			abbreviation: "not_contains_letters"
		},
		invalidLetter: {
			message: "Comprueba el {{type}}",
			abbreviation: "invalid_letter"
		}
	},
	invalidEmail: {
		message: "Comprueba el email",
		abbreviation: "invalid_email"
	},
	invalidPhone: {
		message: "Comprueba el número de telefóno",
		abbreviation: "invalid_phone"
	}
}

function generateResponse(
	status: InputStatus,
	statusDetail: StatusDetailOnInput | undefined = undefined
): StatusOnInput {
	if (status === "ok" || !statusDetail) {
		statusDetail = { message: "", abbreviation: "" }
	}

	return {
		status,
		statusDetail
	}
}

function isOnlyLetters(str: string): StatusOnInput {
	// Allow alphabets and accented characters
	const re = /^[a-zA-Z\u00C0-\u00FF]*$/
	const isJustLetteres = re.test(str.toLowerCase())
	return generateResponse(isJustLetteres ? "ok" : "error", INPUTS_ERRORS.isOnlyLetters)
}

function notEmpty(str: string): StatusOnInput {
	const containsErrors = str.length > 0
	return generateResponse(containsErrors ? "ok" : "error", INPUTS_ERRORS.notEmpty)
}

function isPersonId(_str: string): StatusOnInput {
	const str = _str.toUpperCase()

	const validChars = "TRWAGMYFPDXBNJZSQVHLCKET"
	const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
	const nieRegex = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i

	if (!nifRegex.test(str) && !nieRegex.test(str)) {
		return generateResponse("error", INPUTS_ERRORS.isPersonId.incorrectFormat)
	}

	const nie = str
		.replace(/^[X]/, "0")
		.replace(/^[Y]/, "1")
		.replace(/^[Z]/, "2")

	const letter = str.substr(-1)
	const charIndex = parseInt(nie.substr(0, 8)) % 23

	if (validChars.charAt(charIndex) === letter) {
		return generateResponse("ok")
	} else {
		let personIdType = str[0] === "X" || str[0] === "X" || str[0] === "X" ? "NIE" : "DNI"
		const e = {
			...INPUTS_ERRORS.isPersonId.invalidLetter,
			message: INPUTS_ERRORS.isPersonId.invalidLetter.message.replace("{{type}}", personIdType)
		}
		return generateResponse("error", e)
	}
}

function isEmail(str: string) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const isEmail = re.test(str.toLowerCase())
	return generateResponse(isEmail ? "ok" : "error", INPUTS_ERRORS.invalidEmail)
}

function isPhone(phone: string) {
	const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
	const isPhone = re.test(phone.toLowerCase())
	return generateResponse(isPhone ? "ok" : "error", INPUTS_ERRORS.invalidPhone)
}

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

function getIdByIndexes(form: FormType, indexes: Indexes): InputType {
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
function checkForRequires(indexes: Indexes, formModule: DynamicFormModule) {
	let form: FormType
	switch (formModule) {
		case "ticket":
			form = TicketModule.ticketForm
			break
		case "volunteer":
			form = VolunteerModule.volunteerForm
			break
	}

	// It gets all the inputs that depend on the input being checked
	const inputId = getIdByIndexes(form, indexes).id
	let inputsToUnlock: InputType[] = []
	form.sections.forEach(section => {
		const unlockInputs = section.inputs.filter(e => e.id === inputId)
		inputsToUnlock.push(...unlockInputs)
	})

	// It checks that the rest of the inputs for all the inputs that were depending
	// on the input being checked are valid as well
	inputsToUnlock = inputsToUnlock.filter(input => {
		if (input.requires) {
			input.requires.forEach(requires => {
				const inputRequired = getInputById(form, requires.id)
				if (inputRequired?.value !== input.value) {
					return false
				}
			})
		}
		// If all of the requires array elements are fulfilled then we show the input
		const data = {
			key: "value",
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

export function validate(
	requirements: Requirement[],
	value: InputValueType,
	indexes: Indexes,
	formModule: DynamicFormModule
): boolean {
	for (let i = 0; i < requirements.length; i++) {
		const r = requirements[i]
		let status: StatusOnInput
		switch (r) {
			case "string-not-empty":
				status = notEmpty(value as string)
				break
			case "only-letters":
				status = isOnlyLetters(value as string)
				break
			case "is-person-id":
				status = isPersonId(value as string)
				break
			case "is-email":
				status = isEmail(value as string)
				break
			case "is-phone":
				status = isPhone(value as string)
				break
		}
		switch (formModule) {
			case "ticket":
				TicketModule.updateErrorOnInput({
					indexes,
					status
				})
				break
			case "volunteer":
				VolunteerModule.updateErrorOnInput({
					indexes,
					status
				})
				break
		}

		if (status.status !== "ok") {
			return false
		}
	}

	checkForRequires(indexes, formModule)
	return true
}
