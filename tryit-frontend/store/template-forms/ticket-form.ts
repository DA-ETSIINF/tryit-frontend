import { FormType, StatusOnInput } from "~/types/components"

// Default status
const status: StatusOnInput = {
	status: "",
	statusDetail: {
		message: "",
		abbreviation: ""
	}
}
export const ticketForm: FormType = {
	title: "Consigue tu entrada",
	description: "",
	formModule: "ticket",
	status: {
		everythingOk: false
	},
	sections: [
		{
			title: "Información personal",
			description:
				"Usaremos esta información para poder enviarte el ticket y convalidarte los créditos",
			inputs: [
				{
					tag: "text-input",
					properties: {
						placeholder: "Nombre",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "1",
					requirements: ["string-not-empty", "only-letters"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "Apellidos",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "2",
					requirements: ["string-not-empty", "only-letters"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "DNI / NIE",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "3",
					requirements: ["string-not-empty", "is-person-id"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "Email",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "4",
					requirements: ["string-not-empty", "is-email"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "Teléfono",
						helperText: "",
						status: {
							...status,
							status: "ok"
						}
					},
					value: "",
					id: "5",
					requirements: ["is-phone"]
				}
			]
		},
		{
			title: "Información universitaria",
			description:
				"Queremos conocerte un poquito más. Estos datos nos sirven para tener estadísticas y poder ofrecer mejores congresos en el futuro.",
			inputs: [
				{
					tag: "student-input",
					properties: {
						status: {
							...status,
							status: "ok"
						}
					},
					value: {
						isStudent: true,
						isUpmStudent: true
					},
					id: "student-input",
					requirements: []
				},
				{
					tag: "select-input",
					question: "¿En qué Escuela estudias?",
					properties: {
						options: [],
						open: false,
						status: {
							...status,
							status: "ok"
						}
					},
					selected: "10",
					oldSelected: "10",
					value: "",
					id: "schools-selection",
					requirements: [],
					requires: [
						{
							id: "student-input",
							value: {
								isStudent: true,
								isUpmStudent: true
							}
						}
					]
				},
				{
					tag: "select-input",
					question: "¿Qué titulación?",
					properties: {
						options: [],
						open: false,
						status: {
							...status,
							status: "ok"
						}
					},
					id: "8",
					selected: "10II",
					oldSelected: "10II",
					requirements: [],
					requires: [
						{
							id: "student-input",
							value: {
								isStudent: true,
								isUpmStudent: true
							}
						}
					]
				},
				{
					tag: "labels-input",
					question: "¿Qué curso estudias?",
					properties: {
						status,
						options: [
							{
								title: "1",
								id: "1"
							},
							{
								title: "2",
								id: "2"
							},
							{
								title: "3",
								id: "3"
							},
							{
								title: "4",
								id: "4"
							},
							{
								title: "5",
								id: "5"
							},
							{
								title: "6",
								id: "6"
							}
						]
					},
					selected: "",
					id: "9",
					value: "",
					requirements: ["at-least-N-selected"],
					requires: [
						{
							id: "student-input",
							value: {
								isStudent: true,
								isUpmStudent: true
							}
						}
					]
				}
			]
		},
		{
			title: "Una última cosa...",
			inputs: [
				{
					tag: "checkbox-detail",
					properties: {
						text: "Quiero tener mi entrada impresa.",
						checked: false,
						htmlId: "printed-ticket",
						status: {
							...status,
							status: "ok"
						}
					},
					id: "printed-ticket",
					value: false,
					requirements: []
				},
				{
					tag: "checkbox-detail",
					properties: {
						text:
							"El usuario concede a la organización el derecho de uso de las imágenes tomadas durante el evento para su posible uso en redes sociales y página web.",
						checked: false,
						htmlId: "ticket-conditions",
						status
					},
					id: "10",
					value: false,
					requirements: ["must-be-checked"]
				}
			]
		}
	]
}
