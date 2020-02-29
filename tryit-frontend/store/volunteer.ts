import { Module, Mutation, VuexModule, getModule, Action } from "vuex-module-decorators"
import { VolunteerResource, VolunteerPeriodsResource } from "~/types/api"
import {
	FormType,
	Indexes,
	StatusOnInput,
	DynamicFormModule,
	InputValueType,
	AvailabilityInputType,
	TimePeriodsType,
	DayPeriodType
} from "~/types/components"
import { volunteerForm as vf } from "./template-forms"
import { store } from "./"
import axios from "axios"

@Module({ dynamic: true, store, name: "volunteer", stateFactory: true, namespaced: true })
export default class Volunteer extends VuexModule {
	volunteer: VolunteerResource = this.getVolunteer()
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
				const requires = vf.sections[sectionIndex].inputs[inputIndex].requires
				vf.sections[sectionIndex].inputs[inputIndex].show = !(requires && requires.length > 0)
			})
		})
		return vf
	}
	getVolunteer() {
		const ticket: VolunteerResource = {
			timePeriods: [],
			identity: "",
			commentary: "",
			shirt: "",
			android: false,
		}
		return ticket
	}

	@Mutation
	updateInput({ key, value, indexes }: { key: string; value: InputValueType; indexes: Indexes }) {
		if (indexes.section === undefined || indexes.input === undefined) {
			return
		}
		this.volunteerForm.sections[indexes.section].inputs[indexes.input][key] = value
	}

	@Mutation
	updateProperty({
		key,
		value,
		indexes
	}: {
		key: string
		value: InputValueType | TimePeriodsType[]
		indexes: Indexes
	}) {
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
	updateAreInputsOk({ value }: { value: boolean }) {
		this.volunteerForm.status.everythingOk = value
	}

	@Mutation
	updateStatusOnInput({ indexes, status }: { indexes: Indexes; status: StatusOnInput }) {
		console.log(")1", status)
		store.commit("volunteer/updateProperty", { key: "status", value: status, indexes })
		store.commit("volunteer/updateProperty", {
			key: "helperText",
			value: status.statusDetail.message,
			indexes
		})
	}

	@Action
	getVolunteersTimePeriods() {
		const config = {
			headers: { "Content-Type": "application/json" }
		}
		axios.get(`${process.env.api}/volunteers/volunteers-time-periods/`, config).then(response => {
			const timePeriods: TimePeriodsType[] = response.data.map(tp => getTimePeriod(tp))
			const indexes: Indexes = { section: 1, input: 0 }
			this.updateProperty({ key: "timePeriods", value: timePeriods, indexes })
		})
	}
	@Mutation
	setVolunteer() {
		console.log("SetVolunteer")
		this.volunteer.timePeriods = this.volunteerForm.sections[1].inputs[0]["value"]
		this.volunteer.identity = this.volunteerForm.sections[0].inputs[0]["value"]
		this.volunteer.commentary = this.volunteerForm.sections[0].inputs[1]["value"]
		this.volunteer.shirt = this.volunteerForm.sections[0].inputs[0]["value"]
		this.volunteer.android = this.volunteerForm.sections[2].inputs[0]["value"]
	}
	@Action
	postVolunteer() {
		store.commit("volunteer/setVolunteer")
		console.log("PostVolunteer: ", this.volunteer)
		const config = {
			headers: { "Content-Type": "application/json" }
		}
		axios
			.post(`${process.env.api}/volunteers/volunteers`, this.volunteer, config)
			.then(response => {
				console.log(response)
			})
			.catch(response => {
				console.log("response_error: ", response)
			})
	}
}
function getTimePeriod(timePeriod: VolunteerPeriodsResource): TimePeriodsType {
	const monthNames = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	]

	const ms = timePeriod.date
	const date: Date = new Date(ms)
	const dayMonth = `${date.getDate()} de ${monthNames[date.getMonth()]}`
	const dayWeek = date.toLocaleDateString(undefined, { weekday: "long" })

	const periods: DayPeriodType[] = [
		{
			period: timePeriod.period,
			checked: false,
			htmlId: timePeriod.id
		}
	]
	const res: TimePeriodsType = {
		ms: ms,
		dayWeek: dayWeek,
		dayMonth: String(dayMonth),
		dayPeriods: periods
	}
	return res
}

export const VolunteerModule = getModule(Volunteer)
