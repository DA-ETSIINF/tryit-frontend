import { ActionTree, ActionContext } from 'vuex';
import { Context as ActivityContext } from "@nuxt/types"
import { ActivitiesState} from './index';
import { RootState } from '~/types';
import {post, get}from '../../services'
  
export const actions: ActionTree<ActivitiesState, RootState> = {
    getActivities({commit, appContext}:any, year:number): any{
        if (appContext.isStatic){
            get('/editions/talks/' + year).then((res:any) =>{
                if (res.status === 200) {
                    commit('TalksLoaded', res.data)
                }
                else{
                    commit('TalksError')                    
                }
            })
            get('/editions/workshops/' + year).then((res:any) =>{
                if (res.status === 200) {
                    commit('WorkshopsLoaded', res.data)
                }
                else{
                    commit('WorkshopsError')
                }
            })
            
        }
    }
}