import { TicketState} from './index';
import { MutationTree } from 'vuex';
import { TicketResource } from '~/types';

export const mutations: MutationTree<TicketState> = {
    UPMInfoLoaded(state, payload: TicketResource) {
        state.error = false;
        state.ticket = payload;
    },
    UPMInfoError(state) {
        state.error = true;
        state.ticket = undefined;
    }
};