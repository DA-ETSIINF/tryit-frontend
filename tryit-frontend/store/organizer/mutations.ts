import { OrganizerState } from "./index"
import { MutationTree } from "vuex"
import { OrganizerResource } from "~/types"

export const mutations: MutationTree<OrganizerState> = {
	organizersLoaded(state, payload: OrganizerResource[]) {
		state.organizers = payload
	},
	organizersError(state) {
		state.organizers = undefined
	}
}

export default mutations
