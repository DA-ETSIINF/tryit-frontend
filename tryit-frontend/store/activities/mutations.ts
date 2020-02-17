import { ActivitiesState } from "./index"
import { MutationTree } from "vuex"
import { ActivityResource } from "~/types"

export const mutations: MutationTree<ActivitiesState> = {
	TalksLoaded: (state, payload: ActivityResource) => state.activities?.push(payload),
	TalksError: state => (state.activities = undefined),
	WorkshopsLoaded: (state, payload: ActivityResource) => state.activities?.push(payload),
	WorkshopsError: state => (state.activities = undefined),
	EventsLoaded: (state, payload: ActivityResource) => state.activities?.push(payload),
	EventsError: state => (state.activities = undefined)
}

export default mutations
