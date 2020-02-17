import { StreamingState} from './index';
import { MutationTree } from 'vuex';
import { StreamingResource} from '~/types';

export const mutations: MutationTree<StreamingState> = {
    StreamingLoaded(state, payload: StreamingResource) {
        state.error = false;
        state.streaming = payload;
    },
    StreamingError(state) {
        state.error = true;
        state.streaming = undefined;
    }
};