import { VolunteerState} from './index';
import { MutationTree } from 'vuex';
import { VolunteerPeriodsResource } from '~/types';

export const mutations: MutationTree<VolunteerState> = {
    VolunteerPeriodsLoaded(state, payload: VolunteerPeriodsResource) {
        state.error = false;
        state.volunteerPeriods = payload;
    },
    VolunteerPeriodsError(state) {
        state.error = true;
        state.volunteerPeriods = undefined;
    }
};