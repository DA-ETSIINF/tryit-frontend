import { ActionTree, ActionContext } from 'vuex';
import { Context as ECTSContext } from "@nuxt/types"
import { SponsorState} from './index';
import { RootState } from '~/types';
import {get}from '../../services'

  
export const actions: ActionTree<SponsorState, RootState> = {
    getOrganizers({commit, appContext}:any): any{

        if (appContext.isStatic){
            get('/sponsors').then((res:any) =>{
                if (res.status === 200) {
                    commit('SponsorsLoaded', res.data)
                  }
                else{
                    commit('SponsorsError')
                }
            })
        }
    }
}