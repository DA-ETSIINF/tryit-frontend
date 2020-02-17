import { ActionTree, ActionContext } from 'vuex';
import { Context as TicketContext } from "@nuxt/types"
import { TicketState} from './index';
import { RootState, TicketResource } from '~/types';
import {post} from '../../services'
import {getter} from '../../index' 

interface Actions<S, R> extends ActionTree<S, R> {
    nuxtServerInit (actionContext: ActionContext<S, R>, appContext: TicketContext): void
  }
  
export const actions: ActionTree<TicketState, RootState> = {
    postTicket(data:any): any{
        post(data, '/tickets')
    }
}