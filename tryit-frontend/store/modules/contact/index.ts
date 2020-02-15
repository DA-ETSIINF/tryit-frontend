import { Module } from 'vuex';
import {RootState, ContactResource} from '~/types'
import {getters} from './getters'

export interface ContactState{
    contactInfo?:ContactResource,
    error:boolean
}
export const state:ContactState={
    contactInfo: undefined,
    error:false

};
export const ticket: Module<ContactState, RootState> = {
    state,
    getters
    };
