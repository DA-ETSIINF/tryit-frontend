import { ActivitiesState} from './index';
import { MutationTree } from 'vuex';
import {  ActivityResource} from '~/types';

export const mutations: MutationTree<ActivitiesState> = {
    ActivityLoaded(state, payload: ActivityResource) {
        state.error = false;
        state.activities?.push(payload);
    },
    ActivityError(state) {
        state.error = true;
        state.activities = undefined;
    }
};