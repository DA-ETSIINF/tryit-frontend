import { VolunteerState } from "./index"
import { MutationTree } from "vuex"
import { VolunteerPeriodsResource } from "~/types"

export const mutations: MutationTree<VolunteerState> = {
	volunteerPeriodsLoaded: (state, payload: VolunteerPeriodsResource) =>
		(state.volunteerPeriods = payload),
	VolunteerPeriodsError: state => (state.volunteerPeriods = undefined)
}
export default mutations
