import { Module } from 'vuex';
import {RootState, TicketResource} from '~/types'
import {actions} from './action'
import {mutations} from './mutations'
import {ticketForm} from '../../templates_forms/ticket'


export interface TicketState{
    ticket?:TicketResource,
    form:any,
    error:boolean
}
export const state:TicketState={
    ticket: undefined,
    form: ticketForm(),
    error:false

};
export const ticket: Module<TicketState, RootState> = {
    state,
    actions,
    mutations
    };
