import { Module, Mutation, VuexModule, getModule, Action } from "vuex-module-decorators"
import { VolunteerResource } from "~/types"
import { FormType, Indexes, StatusOnInput, DynamicFormModule } from "~/types/components"
import { volunteerForm as vf } from "./template-forms"
import { store } from "~/store"
import { post, get } from "./services"

@Module({ dynamic: true, store, name: "volunteer", stateFactory: true, namespaced: true })
export default class Volunteer extends VuexModule {
	volunteer!: VolunteerResource
	volunteerForm: FormType = this.getForm()

	get getTitle(): string | undefined {
		return this.volunteerForm.title
	}

	get getDescription(): string | undefined {
		return this.volunteerForm.description
	}

	get getFormModule(): DynamicFormModule {
		return this.volunteerForm.formModule
	}

	get getVolunteerForm(): FormType {
		return this.volunteerForm
	}

	getForm(): FormType {
		vf.sections.forEach((section, sectionIndex) => {
			section.inputs.forEach((_, inputIndex) => {
				vf.sections[sectionIndex].inputs[inputIndex].indexes = {
					section: sectionIndex,
					input: inputIndex
				}
			})
		})
		return vf
	}

	@Mutation
	updateInput({ key, value, indexes }: { key: string; value: string; indexes: Indexes }) {
		if (indexes.section === undefined || indexes.input === undefined) {
			return
		}
		this.volunteerForm.sections[indexes.section].inputs[indexes.input][key] = value
	}

	@Mutation
	updateProperty({ key, value, indexes }: { key: string; value: string; indexes: Indexes }) {
		if (indexes.section === undefined || indexes.input === undefined) {
			return
		}
		this.volunteerForm.sections[indexes.section].inputs[indexes.input].properties[key] = value
	}

	@Mutation
	updateIndexes({ sectionIndex, inputIndex }: { sectionIndex: number; inputIndex: number }) {
		this.volunteerForm.sections[sectionIndex].inputs[inputIndex].indexes = {
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
	getVolunteersTimePeriods() {
		const payload = get("/volunteers-time-periods")
	}
}
export const VolunteerModule = getModule(Volunteer)
