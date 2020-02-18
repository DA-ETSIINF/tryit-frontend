import { GetterTree } from 'vuex';
import { TicketState } from './index';
import { RootState, TicketResource } from '~/types';

export const getters: GetterTree<TicketState, RootState> = {
    getTicket(state): TicketResource | undefined {
        const { ticket } = state;
        return ticket
    }
};