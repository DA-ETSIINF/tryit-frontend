import { ActionTree, ActionContext } from 'vuex';
import { Context as TicketContext } from "@nuxt/types"
import { TicketState} from './index';
import { RootState, TicketResource } from '~/types';
import {post,get} from '../../services'

  
export const actions: ActionTree<TicketState, RootState> = {
    getUPMInfo({commit}):any{
        commit('UPMInfoLoaded',get('https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/centro.json'))
 
    },
    postTicket({state}){
        post(state.ticket, '/tickets')
    }
}