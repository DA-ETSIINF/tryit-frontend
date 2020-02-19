import { Module, Mutation, VuexModule, getModule } from "vuex-module-decorators"
import { TicketResource } from "~/types"
import { FormType, Indexes, StatusOnInput } from "~/types/components"
import { ticketForm as tf } from "./template-forms"
import { store } from "~/store"

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

	getForm(): FormType {
		tf.sections.forEach((section, sectionIndex) => {
			section.inputs.forEach((_, inputIndex) => {
				tf.sections[sectionIndex].inputs[inputIndex].indexes = {
					section: sectionIndex,
					input: inputIndex
				}
			})
		})
		return tf
	}

	@Mutation
	updateInput({ key, value, indexes }: { key: string; value: string; indexes: Indexes }) {
		if (indexes.section === undefined || indexes.input === undefined) {
			return
		}
		this.ticketForm.sections[indexes.section].inputs[indexes.input][key] = value
	}

	@Mutation
	updateProperty({ key, value, indexes }: { key: string; value: string; indexes: Indexes }) {
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
}
export const TicketModule = getModule(Ticket)
