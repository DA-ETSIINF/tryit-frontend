import { Module, Mutation, VuexModule, getModule } from "vuex-module-decorators"
import { TicketResource } from "~/types"
import { FormType, Requirement } from "~/types/components"
import { ticketForm as tf } from "./template-forms"
import { store } from "~/store"

@Module({ dynamic: true, store, name: "ticket", stateFactory: true, namespaced: true })
export default class Ticket extends VuexModule {
	ticket!: TicketResource
	ticketForm: FormType = tf

	get getTitle(): string | undefined {
		return this.ticketForm.title
	}

	get getDescription(): string | undefined {
		return this.ticketForm.description
	}

	get getForm_(): FormType {
		return this.ticketForm
	}

	get getForm(): FormType {
		this.ticketForm.sections.forEach((section, sectionIndex) => {
			section.inputs.forEach((_, inputIndex) => {
				store.commit("ticket/updateIndexes", { sectionIndex, inputIndex })
			})
		})
		return this.ticketForm
	}

	@Mutation
	updateInput({
		key,
		value,
		sectionIndex,
		inputIndex
	}: {
		key: string
		value: string
		sectionIndex: number
		inputIndex: number
	}) {
		if (sectionIndex === undefined || inputIndex === undefined) {
			return
		}
		this.ticketForm.sections[sectionIndex].inputs[inputIndex][key] = value
	}

	@Mutation
	updateIndexes({ sectionIndex, inputIndex }: { sectionIndex: number; inputIndex: number }) {
		this.ticketForm.sections[sectionIndex].inputs[inputIndex].indexes = {
			section: sectionIndex,
			input: inputIndex
		}
	}

	@Mutation
	setName(name: string, id: string) {
		/*
		const { sectionIndex, indexInput } = this.findInputById(id)
		if (!sectionIndex || !indexInput) {
			return
		}
		const input = this.ticketForm.sections[sectionIndex].inputs[indexInput]
		if (!this.isStringCorrect(input.value)) {
			const inputWithError: TextInputType = {
				status: "error",
				helperText: "Sólo puede contener letras",
				...input.properties
			}
			this.ticketForm.sections[sectionIndex].inputs[indexInput].properties = inputWithError
		}
	*/
	}
}
export const TicketModule = getModule(Ticket)
