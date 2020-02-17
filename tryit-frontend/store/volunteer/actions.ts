import { ActionTree } from "vuex"
import { VolunteerState } from "./index"
import { RootState, VolunteerPeriodsResource } from "~/types"
import { post, get } from "../services"

export const actions: ActionTree<VolunteerState, RootState> = {
	postVolunteer: (data: any) => post(data, "/volunteers"),
	getVolunteerPeriods: ({ commit }, path: string) => {
		commit("VolunteerPeriodsLoaded", get(path) as VolunteerPeriodsResource)
	}
}

export default actions
