import { ActionTree, ActionContext } from 'vuex';
import { Context as ECTSContext } from "@nuxt/types"
import { OrganizerState} from './index';
import { RootState } from '~/types';
import {get}from '../../services'

  
export const actions: ActionTree<OrganizerState, RootState> = {
    getOrganizers({commit, appContext}:any, path:string): any{

        if (appContext.isStatic){
            get(path).then((res:any) =>{
                if (res.status === 200) {
                    commit('organizersLoaded', res.data)
                  }
                else{
                    commit('organizersError')
                }
            })
        }
    }
}