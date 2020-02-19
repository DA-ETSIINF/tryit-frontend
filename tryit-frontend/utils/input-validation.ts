import { ErrorOnInput, _ErrorOnInput, Requirement } from "~/types/components"

export function isOnlyLetters(str: string): boolean {
	const letters = /^[A-Za-z]+$/
	return str.match(letters) !== null
}

export function notEmpty(str: string): boolean {
	return str.length > 0
}

function generateError(errorDetail): _ErrorOnInput {
	return {
		error: true,
		errorDetail: errorDetail
	}
}

function validateFn(e: boolean, message: string, abbreviation: string): ErrorOnInput {
	if (e) {
		return { error: false }
	} else {
		return generateError({ message, abbreviation })
	}
}

export function validate(type: Requirement, str: string): ErrorOnInput {
	switch (type) {
		case "not-empty":
			return validateFn(
				isOnlyLetters(str),
				"Este campo no puede estar vacío",
				"field_cannot_be_empty"
			)
		case "only-letters":
			return validateFn(isOnlyLetters(str), "Sólo puede contener letras", "just_letters")
	}
}
