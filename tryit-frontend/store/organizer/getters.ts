import { GetterTree } from "vuex"
import { OrganizerState } from "./index"
import { RootState, OrganizerResource } from "~/types"

export const getters: GetterTree<OrganizerState, RootState> = {
	organizers: ({ organizers }): OrganizerResource[] | undefined => organizers
}

export default getters
