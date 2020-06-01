import { Vue } from "nuxt-property-decorator"
import { Module, VuexModule, getModule, Action, Mutation } from "vuex-module-decorators"
import { store } from "~/store"
import { ActivitiesByDay, ApiStatus, ApiStatusError, ApiStatusStates } from "~/types/components"
import { TalkResource, WorkshopResource } from "~/types/api"

import { groupByDays, getPromises, getDataSection, countdown as cd } from "~/utils/api"

@Module({ dynamic: true, store, name: "schedule", stateFactory: true, namespaced: true })
export default class Schedule extends VuexModule {
	activitiesByDay: ActivitiesByDay[] = []
	apiStatus: ApiStatus = {
		page: "schedule",
		state: "not-initialized"
	}

	get getActivitiesByDay() {
		return this.activitiesByDay
	}

	@Mutation
	setActivitiesByDay(activities: (TalkResource | WorkshopResource)[]) {
		this.activitiesByDay = groupByDays(activities)
	}

	@Mutation
	retryCountdown() {
		const countdown = cd
		Vue.set(this.apiStatus, "countdown", countdown)
		const pid = setInterval(() => {
			;(this.apiStatus as ApiStatusError).countdown -= 1
			const currentCountdown = (this.apiStatus as ApiStatusError).countdown
			Vue.set(this.apiStatus, "countdown", currentCountdown)
		}, 1000)
		setTimeout(() => {
			clearInterval(pid)
		}, countdown * 1000)
		;(this.apiStatus as ApiStatusError).retry = () => this.getData("retrying")
	}

	@Action
	getData(state: ApiStatusStates = "loading") {
		console.log("Fetching schedule data. State:", state)
		this.apiStatus.state = state

		const promises = getPromises()
		Promise.all(promises)
			.then(data => {
				console.log("Data fetched successfully")
				console.log(data)

				const activities = data.map(s => s.data).flat()
				this.setActivitiesByDay(activities)

				this.apiStatus.state = "ok"
			})
			.catch(sectionError => {
				console.error(`Error trying to get ${sectionError.id}\n`)
				console.dir(sectionError.err)

				this.apiStatus.state = "error"
				;(this.apiStatus as ApiStatusError).error = sectionError.err
				this.retryCountdown()
			})
	}
}

export const ScheduleModule = getModule(Schedule)

// Test cases
// With no speakers
// With various speakers, some of them without picture
