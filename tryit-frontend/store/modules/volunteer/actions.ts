import { ActionTree, ActionContext } from 'vuex';
import { Context as TicketContext } from "@nuxt/types"
import { VolunteerState} from './index';
import { RootState, VolunteerPeriodsResource } from '~/types';
import {post, get} from '../../services'



export const actions: ActionTree<VolunteerState, RootState> = {
    postVolunteer( data:any){
        post(data, '/volunteers')
    },
    getVolunteerPeriods({commit},path:string){
       const payload : VolunteerPeriodsResource= get(path)
       commit('VolunteerPeriodsLoaded', payload)
    }
}