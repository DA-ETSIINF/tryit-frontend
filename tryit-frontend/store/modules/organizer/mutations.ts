import { OrganizerState} from './index';
import { MutationTree } from 'vuex';
import { OrganizerResource} from '~/types';

export const mutations: MutationTree<OrganizerState> = {
    OrganizersLoaded(state, payload: OrganizerResource[]) {
        state.error = false;
        state.organizers = payload;
    },
    OrganizersError(state) {
        state.error = true;
        state.organizers = undefined;
    }
};