import { Module } from 'vuex';
import {RootState, ActivityResource} from '~/types'
import {actions} from './action'
import {mutations} from './mutations'

export interface ActivitiesState{
    activities?:ActivityResource[],
    error:boolean
}
export const state:ActivitiesState={
    activities: undefined,
    error:false

};
export const ticket: Module<ActivitiesState, RootState> = {
    state,
    actions,
    mutations
    };
