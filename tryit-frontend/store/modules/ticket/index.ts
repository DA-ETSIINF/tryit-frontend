import { Module } from 'vuex';
import {RootState, TicketResource} from '~/types'
import {actions} from './action'
import {mutations} from './mutations'


export interface TicketState{
    ticket?:TicketResource,
    error:boolean
}
export const state:TicketState={
    ticket: undefined,
    error:false

};
export const ticket: Module<TicketState, RootState> = {
    state,
    actions,
    mutations
    };
