import { Module, Mutation, VuexModule, getModule, Action } from "vuex-module-decorators"
import { VolunteerResource, VolunteerPeriodsResource } from "~/types"
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
import { store } from "~/store"
import { get } from "./services"

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
	updateInput({ key, value, indexes }: { key: string; value: InputValueType; indexes: Indexes }) {
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
		const payload: VolunteerPeriodsResource[] = get("/volunteers-time-periods")
		payload.forEach((timePeriod: VolunteerPeriodsResource, _) => {
			const time: TimePeriodsType = this.getTimePeriod(timePeriod)
			;(this.volunteerForm.sections[2].inputs[0]
				.properties as AvailabilityInputType).timePeriods.push(time)
		})
	}

	getTimePeriod(timePeriod: VolunteerPeriodsResource): TimePeriodsType {
		const mils = timePeriod.date // TODO I am really picky, but I think is better ms, BUENOS DíAS
		const date: Date = new Date(mils)
		const dayMonth = date.getDate()
		const dayWeek = date.getDay()
		const dayWeekString: string = dayWeekSwitch[dayWeek]
		//TODO: Change the dayPeriodTypeArray
		const periods: DayPeriodType[] = [
			{
				period: timePeriod.period,
				checked: false,
				htmlId: timePeriod.id
			}
		]
		const res: TimePeriodsType = {
			ms: mils,
			dayWeek: dayWeekString,
			dayMonth: String(dayMonth),
			dayPeriods: periods
		}
		return res
	}
}
const dayWeekSwitch = {
	0: "Lunes",
	1: "Martes",
	2: "Miércoles",
	3: "Jueves",
	4: "Viernes"
}
export const VolunteerModule = getModule(Volunteer)
