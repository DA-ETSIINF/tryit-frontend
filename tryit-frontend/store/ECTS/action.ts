import { ActionTree, ActionContext } from "vuex"
import { ECTState } from "./index"
import { RootState } from "~/types"
import { get } from "../services"

export const actions: ActionTree<ECTState, RootState> = {
	getEvents: ({ commit }): any => {
		get("/ects").then((res: any) => {
			if (res.status === 200) {
				commit("ECTSLoaded", res.data)
			} else {
				commit("ECTSError", res.data)
			}
		})
	}
}

export default actions
