import { FormType, StatusOnInput } from "~/types/components"

// Default status
const status: StatusOnInput = {
	status: "",
	statusDetail: {
		message: "",
		abbreviation: ""
	}
}
export const volunteerForm: FormType = {
	title: "Registro voluntarios",
	description:
		"Rellena este formulario si te interesa ayudarnos a la realización del congreso. Los voluntarios podréis conseguir hasta 1 ECTS extra, además de los 2 ECTS por asistir a todas las charlas, lo cual es posible. Una vez rellenado el formulario, nos pondremos en contacto contigo si acabas siendo seleccionado. Intentaremos dar prioridad a las personas que más necesiten los créditos, así que háznoslo saber en la caja de comentarios.",
	formModule: "volunteer",
	status: {
		everythingOk: false
	},
	sections: [
		{
			title: "Información personal",
			description:
				"Para poder registrarte como posible voluntario necesitarás primero tener un ticket que puedes conseguir <a href='/ticket'>aquí</>",
			inputs: [
				{
					tag: "text-input",
					properties: {
						placeholder: "DNI / NIE",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "1",
					requirements: ["string-not-empty", "is-person-id"]
				},
				{
					tag: "labels-input",
					question: "¿Cuál es tu talla de camiseta?",
					properties: {
						options: [
							{
								title: "S",
								id: "1"
							},
							{
								title: "M",
								id: "2"
							},
							{
								title: "L",
								id: "3"
							},
							{
								title: "XL",
								id: "4"
							},
							{
								title: "XXL",
								id: "5"
							}
						],
						status
					},
					selected: "",
					id: "9",
					value: "",
					requirements: ["at-least-N-selected"]
				},
				{
					tag: "checkbox-detail",
					properties: {
						text: "Tengo un dispositivo android",
						details: [
							"Necesitamos validar las entradas de los asistentes con una app que funciona en android",
							"Si rellenas esta casilla, es posible que deberás instalarte una app para el checkeo de las entradas"
						],
						checked: false,
						htmlId: "android",
						status: {
							...status,
							status: "ok"
						}
					},
					id: "android-checkbox",
					value: false,
					requirements: []
				},
				{
					tag: "text-area",
					properties: {
						placeholder: "¿Algo qué deberíamos saber?¿Necesitas los créditos con urgencia?",
						status: {
							...status,
							status: "ok"
						}
					},
					value: "",
					id: "2",
					requirements: []
				}
			]
		},
		{
			title: "Disponibilidad",
			description:
				"Recuerda que a mayor número de períodos de tiempo escogidos, mayor será la probabilidad de que te seleccionemos. Como mínimo deberás marcar 3.",
			oneColumnSection: true,
			inputs: [
				{
					tag: "availability-input",
					properties: {
						periodsAvailable: ["morning", "afternoon"],
						timePeriods: [],
						status: {
							...status,
							status: "ok"
						}
					},
					id: "3",
					value: [],
					requirements: []
				}
			]
		},
		{
			title: "Y una firmita por aquí...",
			inputs: [
				{
					tag: "checkbox-detail",
					properties: {
						text:
							"He leído y acepto los <a target='_blank' href='https://drive.google.com/file/d/17OlNAmQusxIv_tQnr7tx4rRZjj0ynvkS/view?usp=sharing'>términos y condiciones de inscripción de voluntarios Try IT! 2020</a>",
						checked: false,
						htmlId: "conditions",
						status
					},
					id: "conditions-checkbox",
					value: false,
					requirements: ["must-be-checked"]
				}
			]
		}
	]
}
