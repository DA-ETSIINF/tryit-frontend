import { Module } from 'vuex';
import {RootState, StreamingResource} from '~/types'
import {actions} from './action'
import {mutations} from './mutations'
import {getters} from './getters'

export interface StreamingState{
    streaming?:StreamingResource,
    error:boolean
}
export const state:StreamingState={
    streaming: undefined,
    error:false

};
export const streaming: Module<StreamingState, RootState> = {
    state,
    actions,
    mutations,
    getters
    };
