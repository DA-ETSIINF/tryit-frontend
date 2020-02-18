import { Module, Mutation, VuexModule } from "vuex-module-decorators"
import { TicketResource } from "~/types"
import { FormType, TextInputType } from "~/types/components"
import { ticketForm as tf } from "./template-forms"

@Module
export default class Ticket extends VuexModule {
	ticket!: TicketResource
	ticketForm: FormType = tf

	get title(): string | undefined {
		return this.ticketForm.title
	}

	get description(): string | undefined {
		return this.ticketForm.description
	}

	@Mutation
	form(): FormType {
		this.ticketForm.sections.forEach((section, sectionIndex) => {
			section.inputs.forEach((input, inputIndex) => {
				input.requirements.forEach((r, rIndex) => {
					switch (r.type) {
						case "only-letters":
							this.addValidationFunctionInput(sectionIndex, inputIndex, rIndex, (v: string) =>
								this.isOnlyLetters(v)
							)
							break
					}
				})
			})
		})
		return this.ticketForm
	}

	@Mutation
	addValidationFunctionInput(
		sectionIndex: number,
		inputIndex: number,
		requirementIndex: number,
		fn: Function
	) {
		this.ticketForm.sections[sectionIndex].inputs[inputIndex].requirements[
			requirementIndex
		].validate = fn()
	}

	private isOnlyLetters(str: string): boolean {
		const letters = /^[A-Za-z]+$/
		return str.match(letters) !== null
	}

	private findInputById(
		id: string
	): { sectionIndex: undefined | number; indexInput: undefined | number } {
		let sectionIndex: undefined | number = undefined
		let indexInput: undefined | number = undefined
		this.ticketForm.sections.forEach((s, _sectionIndex) => {
			s.inputs.forEach((input, _indexInput) => {
				if (input.id === id) {
					sectionIndex = _sectionIndex
					indexInput = _indexInput
				}
			})
		})
		return { sectionIndex, indexInput }
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
