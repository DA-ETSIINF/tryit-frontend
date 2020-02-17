import { ECTState} from './index';
import { MutationTree } from 'vuex';
import { ECTSResource} from '~/types';

export const mutations: MutationTree<ECTState> = {
    ECTSLoaded(state, payload: ECTSResource) {
        state.error = false;
        state.ECTS = payload;
    },
    ECTSError(state) {
        state.error = true;
        state.ECTS = undefined;
    }
};