import { Module } from 'vuex';
import {RootState, ECTSResource} from '~/types'
import {actions} from './action'
import {mutations} from './mutations'

export interface ECTState{
    ECTS?:ECTSResource,
    error:boolean
}
export const state:ECTState={
    ECTS: undefined,
    error:false

};
export const ects: Module<ECTState, RootState> = {
    state,
    actions,
    mutations
    };
