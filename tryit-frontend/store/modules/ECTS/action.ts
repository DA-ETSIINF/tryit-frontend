import { ActionTree, ActionContext } from 'vuex';
import { Context as ECTSContext } from "@nuxt/types"
import { ECTState} from './index';
import { RootState } from '~/types';
import {post, get}from '../../services'
import {getter} from '../../index' 

  
export const actions: ActionTree<ECTState, RootState> = {
    getEvent({commit, appContext}:any): any{

        if (appContext.isStatic){
            get('/ects').then((res:any) =>{
                if (res.status === 200) {
                    commit('ectsLoaded', res.data)
                  }
            })
        }
    }
}