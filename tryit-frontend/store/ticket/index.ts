import { Module } from "vuex"
import { RootState, TicketResource } from "~/types"
import { actions } from "./action"
import { mutations } from "./mutations"
import { FormType } from "~/types/components"
import { ticketForm as form } from "~/store/template-forms"

export interface TicketState {
	ticket: TicketResource | undefined
	form: FormType
}

export const state = (): TicketState => ({ ticket: undefined, form: form })

export const ticket: Module<TicketState, RootState> = {
	state,
	actions,
	mutations
}
