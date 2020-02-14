import { Module } from 'vuex';
import {RootState, TicketResource} from '~/types'

export interface TicketState{
    ticket?:TicketResource,
    error:boolean
}
export const state:TicketState={
    ticket: undefined,
    error:false

};
export const ticket: Module<TicketState, RootState> = {
    state
    };
