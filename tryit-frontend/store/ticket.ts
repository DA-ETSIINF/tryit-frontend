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
				// console.log("Indexes: ", indexes)
				if (indexes.section === 1 && indexes.input === 1) {
				this.getUpmInfo(indexes)
				}
			})
		})
		return tf
	}

	getUpmInfo(indexes: Indexes) {
		console.log("getUpmInfo")
		const config = {
			headers: {'Access-Control-Allow-Origin': '*'}
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
				// console.log("Schools: ", schoolsOptions)
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
	updateErrorOnInput({ indexes, status }: { indexes: Indexes; status: StatusOnInput }) {
		store.commit("ticket/updateProperty", { key: "status", value: status, indexes })
		store.commit("ticket/updateProperty", {
			key: "helperText",
			value: status.statusDetail.message,
			indexes
		})
	}
	@Action
	postTicket() {
		// post({ ticketForm: this.ticketForm }, "/ticket")
	}
}
export const TicketModule = getModule(Ticket)
