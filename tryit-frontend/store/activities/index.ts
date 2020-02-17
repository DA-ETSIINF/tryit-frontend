import { Module } from "vuex"
import { RootState, ActivityResource } from "~/types"
import { actions } from "./action"
import { mutations } from "./mutations"
import { getters } from "./getters"

export interface ActivitiesState {
	activities?: ActivityResource[]
}
export const state = (): ActivitiesState => ({
	activities: undefined
})

export const activities: Module<ActivitiesState, RootState> = {
	state,
	actions,
	mutations
}
