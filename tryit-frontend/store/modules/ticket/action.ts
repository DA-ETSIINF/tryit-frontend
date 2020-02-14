import { ActionTree, ActionContext } from 'vuex';
import axios from 'axios';
import { Context as TicketContext } from "@nuxt/types"
import { TicketState} from './index';
import { RootState, TicketResource } from '~/types';
import { postResponse } from '~/types/postResponse';
import {post} from '../../services'

interface Actions<S, R> extends ActionTree<S, R> {
    nuxtServerInit (actionContext: ActionContext<S, R>, appContext: TicketContext): void
  }
  
export const actions: ActionTree<TicketState, RootState> = {
    postTicket({commit}): any{
        post({commit}, '/ticket')
    }
}