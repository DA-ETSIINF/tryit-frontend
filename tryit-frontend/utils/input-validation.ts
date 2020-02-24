import {
	StatusOnInput,
	Requirement,
	StatusDetailOnInput,
	Indexes,
	InputStatus,
	DynamicFormModule,
	InputValueType
} from "~/types/components"
import { emitStatusOnInput, emitInput, checkForRequires, checkForRequirements } from "./"

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
			message: "El DNI/NIE es incorrecto, recuerda que debe tener letra",
			abbreviation: "not_contains_letters"
		},
		invalidLetter: {
			message: "Comprueba el {{type}}",
			abbreviation: "invalid_letter"
		}
	},
	atLeastOneSelected: {
		message: "Tienes que seleccionar al menos una de las opciones",
		abbreviation: "at_least_one_selected"
	},
	invalidEmail: {
		message: "Comprueba el email",
		abbreviation: "invalid_email"
	},
	invalidPhone: {
		message: "Comprueba el número de telefóno",
		abbreviation: "invalid_phone"
	},
	isNotChecked: {
		message: "Debes aceptar los términos y condiciones",
		abbreviation: "not_checked"
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
	// Allow spaces, alphabets and accented characters
	const re = /^[\sa-zA-Z\u00C0-\u00FF]*$/
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
		let personIdType = str[0] === "X" || str[0] === "Y" || str[0] === "Z" ? "NIE" : "DNI"
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

function isChecked(checked: boolean) {
	return generateResponse(checked ? "ok" : "error", INPUTS_ERRORS.isNotChecked)
}

function atLeastNSelected(actives: string[], n: number) {
	const checked = actives.length == n
	return generateResponse(checked ? "ok" : "error", INPUTS_ERRORS.atLeastOneSelected)
}

export function validate(
	requirements: Requirement[],
	value: InputValueType,
	indexes: Indexes,
	formModule: DynamicFormModule,
	N: number = 1
): boolean {
	let isOk = true
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
			case "must-be-checked":
				status = isChecked(value as boolean)
				break
			case "at-least-N-selected":
				status = atLeastNSelected(value as string[], N)
				break
		}
		emitStatusOnInput(formModule, { indexes, status })

		if (status.status !== "ok") {
			value = false
			break
		}
	}
	emitInput(formModule, { indexes, key: "show", value: isOk })
	checkForRequires(indexes, formModule, value)
	checkForRequirements(formModule)
	return isOk
}
