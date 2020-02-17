import { GetterTree } from 'vuex';
import { ActivitiesState } from './index';
import { RootState, ActivityResource } from '~/types';

export const getters: GetterTree<ActivitiesState, RootState> = {
    getOrganizers(state): ActivityResource[] | undefined {
        let { activities } = state
        const dict : {[day:number] : ActivityResource} = {}
        if(activities != undefined){
            activities.forEach(activity => {
                if 
                
            });
        }
        return activities
    }
};