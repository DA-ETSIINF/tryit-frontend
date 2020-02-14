import { TicketState} from './index';
import { MutationTree } from 'vuex';
import { TicketResource } from '~/types';

export const mutations: MutationTree<TicketState> = {
    ticketLoaded(state, payload: TicketResource) {
        state.error = false;
        state.ticket = payload;
    },
    ticketError(state) {
        state.error = true;
        state.ticket = undefined;
    }
};