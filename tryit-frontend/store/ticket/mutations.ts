import { TicketState } from "./index"
import { MutationTree } from "vuex"
import { TicketResource } from "~/types"

export const mutations: MutationTree<TicketState> = {
	ticketLoaded: (state, payload: TicketResource) => (state.ticket = payload),
	ticketError: state => (state.ticket = undefined)
}

export default mutations
