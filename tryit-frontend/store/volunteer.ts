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
				const requires = vf.sections[sectionIndex].inputs[inputIndex].requires
				if (requires && requires.length > 0) {
					vf.sections[sectionIndex].inputs[inputIndex].show = false
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
	updateProperty({
		key,
		value,
		indexes
	}: {
		key: string
		value: InputValueType
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
		const payload: VolunteerPeriodsResource[] = [] // TODO
		payload.forEach((timePeriod: VolunteerPeriodsResource, _) => {
			const time: TimePeriodsType = this.getTimePeriod(timePeriod)
			;(this.volunteerForm.sections[2].inputs[0]
				.properties as AvailabilityInputType).timePeriods.push(time)
		})
	}

	getTimePeriod(timePeriod: VolunteerPeriodsResource): TimePeriodsType {
		const ms = timePeriod.date // Subnormal
		const date: Date = new Date(ms)
		const dayMonth = date.getDate()
		const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
		const dayWeek = date.toLocaleDateString(undefined, options)
		// const dayWeekString: string = dayWeekSwitch[dayWeek]
		//TODO: Change the dayPeriodTypeArray
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
}
export const VolunteerModule = getModule(Volunteer)
