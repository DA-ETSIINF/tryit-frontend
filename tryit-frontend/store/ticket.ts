import { Module, Mutation, VuexModule, getModule, Action } from "vuex-module-decorators"
import { TicketResource, UPMSchools } from "~/types/api"
import {
	FormType,
	Indexes,
	StatusOnInput,
	DynamicFormModule,
	InputValueType,
	SelectInputType,
	OptionSelected
} from "~/types/components"
import { ticketForm as tf } from "./template-forms"
import { store } from "~/store"
import { getHTTP, schoolsUPM } from "../utils"
import axios from "axios"
import dataSchools from "../assets/data/schools.json"
import dataDegrees from "../assets/data/degrees.json"

@Module({ dynamic: true, store, name: "ticket", stateFactory: true, namespaced: true })
export default class Ticket extends VuexModule {
	ticket!: TicketResource
	ticketForm: FormType = this.getForm()

	get getTitle(): string | undefined {
		return this.ticketForm.title
	}

	get getDescription(): string | undefined {
		return this.ticketForm.description
	}

	get getTicketForm(): FormType {
		return this.ticketForm
	}

	get getFormModule(): DynamicFormModule {
		return this.ticketForm.formModule
	}

	getForm() {
		// console.log("getForm")
		tf.sections.forEach((section, sectionIndex) => {
			section.inputs.forEach((input, inputIndex) => {
				const indexes = {
					section: sectionIndex,
					input: inputIndex
				}
				tf.sections[sectionIndex].inputs[inputIndex].indexes = indexes
				const requires = tf.sections[sectionIndex].inputs[inputIndex].requires
				tf.sections[sectionIndex].inputs[inputIndex].show = !(requires && requires.length > 0)

				if (indexes.section === 1 && indexes.input === 1) {
					// this.getUpmInfo(indexes)
					tf.sections[sectionIndex].inputs[inputIndex].properties["options"] = dataSchools
					tf.sections[sectionIndex].inputs[inputIndex].properties["selected"] = "10"
				} else if (indexes.section === 1 && indexes.input === 2) {
					tf.sections[sectionIndex].inputs[inputIndex].properties["options"] = dataDegrees
					tf.sections[sectionIndex].inputs[inputIndex].properties["selected"] = "10II"
				}
			})
		})
		return tf
	}

	getUpmInfo(indexes: Indexes) {
		const config = {
			headers: { "Content-Type": "application/json" }
		}
		axios
			.get("https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/centro.json", config)
			.then(data => {
				const schools: OptionSelected[] = data.data.map(s => {
					return { title: s.nombre, id: s.codigo }
				})
				const schoolsOptions: OptionSelected[][] = [[]]
				const schoolsByDefault = ["10"]
				schoolsByDefault.forEach(school => {
					const i = schools
						.map(s => {
							return s.id
						})
						.indexOf(school)
					schoolsOptions[0].push(schools[i])
					schools.splice(i, 1)
				})
				schoolsOptions.push(schools)
				// console.log("Value: ", schoolsOptions)
				// const indexes: Indexes ={
				// 	section: 1,
				// 	input: 1
				// }
				this.updateProperty({ key: "options", value: schoolsOptions, indexes })
				// console.log("Store:", this.ticketForm.sections[1].inputs[1])
			})
			.catch(e => {
				console.error(e)
			})
	}

	@Mutation
	updateInput({ key, value, indexes }: { key: string; value: InputValueType; indexes: Indexes }) {
		if (indexes.section === undefined || indexes.input === undefined) {
			return
		}
		this.ticketForm.sections[indexes.section].inputs[indexes.input][key] = value
	}

	@Mutation
	updateProperty({ key, value, indexes }: { key: string; value: any; indexes: Indexes }) {
		if (indexes.section === undefined || indexes.input === undefined) {
			return
		}
		this.ticketForm.sections[indexes.section].inputs[indexes.input].properties[key] = value
	}

	@Mutation
	updateIndexes({ sectionIndex, inputIndex }: { sectionIndex: number; inputIndex: number }) {
		this.ticketForm.sections[sectionIndex].inputs[inputIndex].indexes = {
			section: sectionIndex,
			input: inputIndex
		}
	}

	@Mutation
	updateAreInputsOk({ value }: { value: boolean }) {
		this.ticketForm.status.everythingOk = value
	}

	@Mutation
	updateStatusOnInput({ indexes, status }: { indexes: Indexes; status: StatusOnInput }) {
		store.commit("ticket/updateProperty", { key: "status", value: status, indexes })
		store.commit("ticket/updateProperty", {
			key: "helperText",
			value: status.statusDetail.message,
			indexes
		})
	}
	@Mutation
	setVolunteer() {
		this.ticket.name = this.ticketForm.sections[0].inputs[0]["value"]
		this.ticket.lastname = this.ticketForm.sections[0].inputs[1]["value"]
		this.ticket.identity = this.ticketForm.sections[0].inputs[2]["value"]
		this.ticket.email = this.ticketForm.sections[0].inputs[3]["value"]
		this.ticket.phone = this.ticketForm.sections[0].inputs[4]["value"]
		this.ticket.isStudent = this.ticketForm.sections[1].inputs[0]["value"]["isStudent"]
		this.ticket.isUpmStudent = this.ticketForm.sections[1].inputs[0]["value"]["isUpmStudent"]
		this.ticket.upmSchool = this.ticketForm.sections[1].inputs[1]["value"]
		this.ticket.degree = this.ticketForm.sections[1].inputs[2]["value"]
		this.ticket.year = this.ticketForm.sections[1].inputs[3]["value"]
		
	}
	@Action
	postTicket() {
		this.ticket.name = this.ticketForm.sections[0].inputs[0]["value"]
		this.ticket.lastname = this.ticketForm.sections[0].inputs[1]["value"]
		this.ticket.identity = this.ticketForm.sections[0].inputs[2]["value"]
		this.ticket.email = this.ticketForm.sections[0].inputs[3]["value"]
		this.ticket.phone = this.ticketForm.sections[0].inputs[4]["value"]
		this.ticket.isStudent = this.ticketForm.sections[1].inputs[0]["value"]["isStudent"]
		this.ticket.isUpmStudent = this.ticketForm.sections[1].inputs[0]["value"]["isUpmStudent"]
		this.ticket.upmSchool = this.ticketForm.sections[1].inputs[1]["value"]
		this.ticket.degree = this.ticketForm.sections[1].inputs[2]["value"]
		this.ticket.year = this.ticketForm.sections[1].inputs[3]["value"]
		console.log("PostTicket: ", this.ticket)
		const config = {
			headers: { "Content-Type": "application/json" }
		}
		axios
			.post("https://iecisamandaynotupanda.congresotryit.es/tickets", this.ticket, config)
			.then(response => {
				console.log(response)
			})
			.catch(response => {
				console.log("response_error: ", response)
			})

	}
}

export const TicketModule = getModule(Ticket)
