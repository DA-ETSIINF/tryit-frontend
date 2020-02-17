import { Module } from "vuex"
import { RootState, OrganizerResource } from "~/types"
import { actions } from "./action"
import { mutations } from "./mutations"
import { getters } from "./getters"

export interface OrganizerState {
	organizers?: OrganizerResource[]
}

export const state = (): OrganizerState => ({
	organizers: undefined
})

export const organizer: Module<OrganizerState, RootState> = {
	state,
	actions,
	mutations,
	getters
}
