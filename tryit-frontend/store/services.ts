import axios from "axios"
import { Context as TicketContext } from "@nuxt/types"
import { checkDniResponse } from "~/types/checkDniResponse"

export function post({ data }: any, path: string) {
	axios.post(path, { data }).then(
		response => {
			console.log(response)
		},
		error => {
			console.log(error)
		}
	)
}
export async function get(path: string): Promise<any> {
	return axios.get(path, {
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	})
}
export function validateEmail(email: string) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export function valid_id(value: string): checkDniResponse {
	if (value === undefined) {
		// return "El DNI/NIE es obligatorio"
		const response: checkDniResponse = {
			message: "El DNI/NIE es obligatorio",
			message_abbr: "DNI is missing",
			cod: 1
		}
		return response
	}
	const validChars = "TRWAGMYFPDXBNJZSQVHLCKET"
	const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
	const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
	const str = value.toString().toUpperCase()

	if (!nifRexp.test(str) && !nieRexp.test(str)) {
		const response: checkDniResponse = {
			message: "Comprueba el DNI/NIE. Debe tener letra.",
			message_abbr: "Letter is missing",
			cod: 2
		}
		return response
	}

	const nie = str
		.replace(/^[X]/, "0")
		.replace(/^[Y]/, "1")
		.replace(/^[Z]/, "2")

	const letter = str.substr(-1)
	const charIndex = parseInt(nie.substr(0, 8)) % 23

	if (validChars.charAt(charIndex) === letter) {
		const response: checkDniResponse = {
			message: "El DNI es válido",
			message_abbr: "OK",
			cod: 200
		}
		return response
	} else {
	}
	const response: checkDniResponse = {
		message: "Comprueba el DNI/NIE. Es inválido.",
		message_abbr: "Invalid DNI",
		cod: 3
	}
	return response
}
