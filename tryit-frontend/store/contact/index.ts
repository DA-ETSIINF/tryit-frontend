import { Module } from "vuex"
import { RootState, ContactResource } from "~/types"
import { getters } from "./getters"

export interface ContactState {
	contactInfo?: ContactResource
}

export const state = (): ContactState => ({
	contactInfo: undefined
})

export const contact: Module<ContactState, RootState> = {
	state,
	getters
}
