import { ActionTree, ActionContext } from 'vuex';
import { Context as ECTSContext } from "@nuxt/types"
import { StreamingState} from './index';
import { RootState } from '~/types';
import {get}from '../../services'

  
export const actions: ActionTree<StreamingState, RootState> = {
    getStreaming({commit, appContext}:any): any{
        if (appContext.isStatic){
            get('/streaming').then((res:any) =>{
                if (res.status === 200) {
                    commit('StreamingLoaded', res.data)
                  }
                else{
                    commit('StreamingError')
                }
            })
        }
    }
}