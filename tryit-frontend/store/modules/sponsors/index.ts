import { Module } from 'vuex';
import {RootState, SponsorsResource} from '~/types'
import {actions} from './action'
import {mutations} from './mutations'
import {getters} from './getters'

export interface SponsorState{
    sponsors?:SponsorsResource,
    error:boolean
}
export const state:SponsorState={
    sponsors: undefined,
    error:false

};
export const sponsors: Module<SponsorState, RootState> = {
    state,
    actions,
    mutations,
    getters
    };
