import { ActionTree, ActionContext } from 'vuex';
import { Context as ActivityContext } from "@nuxt/types"
import { ActivitiesState} from './index';
import { RootState } from '~/types';
import {post, get}from '../../services'
import {getter} from '../../index' 
  
export const actions: ActionTree<ActivitiesState, RootState> = {
    getEvent({commit, appContext}:any, path:string): any{
        if (appContext.isStatic){
            get(path).then((res:any) =>{
                if (res.status === 200) {
                    commit('ActivityLoaded', res.data)
                  }
            })
        }
    }
}