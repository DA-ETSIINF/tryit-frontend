import { Module } from 'vuex';
import {RootState, VolunteerPeriodsResource} from '~/types'
import {actions} from './actions'
import {mutations} from './mutations'

export interface VolunteerState{
    volunteerPeriods?:VolunteerPeriodsResource,
    error:boolean
}
export const state:VolunteerState={
    volunteerPeriods: undefined,
    error:false

};
export const ticket: Module<VolunteerState, RootState> = {
    state,
    actions,
    mutations
    };
