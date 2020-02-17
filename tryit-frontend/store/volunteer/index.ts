import { Module } from "vuex"
import { RootState, VolunteerPeriodsResource } from "~/types"
import { actions } from "./actions"
import { mutations } from "./mutations"
import { getters } from "./getters"

export interface VolunteerState {
	volunteerPeriods?: VolunteerPeriodsResource
}
export const state = (): VolunteerState => ({
	volunteerPeriods: undefined
})

export const ticket: Module<VolunteerState, RootState> = {
	state,
	actions,
	getters,
	mutations
}
