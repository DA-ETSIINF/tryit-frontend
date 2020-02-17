import { ActionTree } from "vuex"
import { ActivitiesState } from "./index"
import { RootState } from "~/types"
import { get } from "../services"

export const actions: ActionTree<ActivitiesState, RootState> = {
	getActivities({ commit }, year: number): any {
		get(`/editions/talks/${year}`).then((res: any) => {
			if (res.status === 200) {
				commit("TalksLoaded", res.data)
			} else {
				commit("TalksError")
			}
		})
		get(`/editions/workshops/${year}`).then((res: any) => {
			if (res.status === 200) {
				commit("WorkshopsLoaded", res.data)
			} else {
				commit("WorkshopsError")
			}
		})
	}
}

export default actions
