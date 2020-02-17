import { Module } from 'vuex';
import {RootState, OrganizerResource} from '~/types'
import {actions} from './action'
import {mutations} from './mutations'
import {getters} from './getters'

export interface OrganizerState{
    organizers?:OrganizerResource[],
    error:boolean
}
export const state:OrganizerState={
    organizers: undefined,
    error:false

};
export const organizer: Module<OrganizerState, RootState> = {
    state,
    actions,
    mutations,
    getters
    };
