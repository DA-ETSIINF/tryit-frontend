import { ECTState } from "./index"
import { MutationTree } from "vuex"
import { ECTSResource } from "~/types"

export const mutations: MutationTree<ECTState> = {
	ECTSLoaded(state, payload: ECTSResource) {
		state.ECTS = payload
	},
	ECTSError(state) {
		state.ECTS = undefined
	}
}

export default mutations
