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
	description: "TODO",
	formModule: "ticket",
	sections: [
		{
			title: "Información personal",
			description:
				"Usaremos esta información para poder enviarte el ticket y para poder convalidarte los créditos",
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
					requirements: ["not-empty", "only-letters"]
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
					requirements: ["not-empty", "only-letters"]
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
					requirements: ["not-empty", "is-person-id"]
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
					requirements: ["not-empty", "is-email"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "Teléfono",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "5",
					requirements: ["not-empty", "is-phone"]
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
						isStudent: true,
						isUpmStudent: true
					},
					value: "",
					id: "6",
					requirements: []
				},
				{
					tag: "select-input",
					question: "¿En qué Escuela estudias?",
					properties: {
						options: [
							[
								{
									title: "Escuela Superior de Ingenieros Informáticos",
									id: "1"
								}
							],
							[
								{
									title: "Escuela Superior de Arquitectos",
									id: "2"
								},
								{
									title: "Escuela Superior de Moda",
									id: "3"
								}
							]
						],
						// TODO change this to an index
						selected: {
							title: "Escuela Superior de Ingenieros Informáticos",
							id: "1"
						},
						// TODO change this to an index
						oldSelected: {
							title: "Escuela Superior de Ingenieros Informáticos",
							id: "1"
						},
						open: false
					},
					value: "",
					id: "7",
					requirements: []
				},
				{
					tag: "select-input",
					question: "¿Que titulación?",
					properties: {
						options: [
							[
								{
									title: "Ingenería Informática",
									id: "1"
								}
							],
							[
								{
									title: "Ingenería de Telecomunicaciones",
									id: "2"
								},
								{
									title: "Ingenería la calle",
									id: "3"
								}
							]
						],
						// TODO change this to an index
						selected: {
							title: "Escuela Superior de Ingenieros Informáticos",
							id: "1"
						},
						// TODO change this to an index
						oldSelected: {
							title: "Escuela Superior de Ingenieros Informáticos",
							id: "1"
						},
						open: false
					},
					id: "8",
					value: "",
					requirements: []
				},
				{
					tag: "labels-input",
					question: "¿Que curso estudias?",
					properties: {
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
							}
						],
						selected: 1
					},
					id: "9",
					value: "",
					requirements: []
				}
			]
		},
		{
			title: "Una última cosa...",
			inputs: [
				{
					tag: "checkbox-detail",
					properties: {
						text:
							"El usuario concede a la organización el derecho de uso de las imágenes tomadas durante el evento para su posible uso en redes sociales y página web.",
						checked: false,
						htmlId: "ticket-conditions"
					},
					id: "10",
					value: "",
					requirements: []
				}
			]
		}
	]
}
