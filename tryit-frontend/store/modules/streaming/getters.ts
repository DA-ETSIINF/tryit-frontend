import { GetterTree } from 'vuex';
import { StreamingState } from './index';
import { RootState, StreamingResource } from '~/types';

export const getters: GetterTree<StreamingState, RootState> = {
    getStreaming(state): StreamingResource | undefined {
        const { streaming } = state;
        return streaming
    }
};