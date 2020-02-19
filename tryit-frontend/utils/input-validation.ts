import {
	StatusOnInput,
	Requirement,
	StatusDetailOnInput,
	Indexes,
	InputStatus
} from "~/types/components"
import { TicketModule } from "../store/ticket"

const INPUTS_ERRORS = {
	notEmpty: {
		message: "Este campo no puede estar vacío",
		abbreviation: "field_cannot_be_empty"
	},
	isOnlyLetters: {
		message: "Sólo puede contener letras",
		abbreviation: "just_letters"
	}
}

function generateResponse(status: InputStatus, statusDetail: StatusDetailOnInput): StatusOnInput {
	if (status === "ok") {
		statusDetail = { message: "", abbreviation: "" }
	}

	return {
		status,
		statusDetail
	}
}

export function isOnlyLetters(str: string): StatusOnInput {
	const letters = /^[A-Za-z]+$/
	const containsErrors = str.match(letters) !== null
	return generateResponse(containsErrors ? "ok" : "error", INPUTS_ERRORS.isOnlyLetters)
}

export function notEmpty(str: string): StatusOnInput {
	const containsErrors = str.length <= 0
	return generateResponse(containsErrors ? "error" : "ok", INPUTS_ERRORS.notEmpty)
}

export function validate(type: Requirement, str: string, indexes: Indexes) {
	let status: StatusOnInput
	switch (type) {
		case "not-empty":
			status = isOnlyLetters(str)
			break
		case "only-letters":
			status = notEmpty(str)
			break
	}
	TicketModule.updateErrorOnInput({
		indexes,
		status
	})
	return status.status !== "error"
}
