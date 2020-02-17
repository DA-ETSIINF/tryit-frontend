import { SponsorState} from './index';
import { MutationTree } from 'vuex';
import { SponsorsResource} from '~/types';

export const mutations: MutationTree<SponsorState> = {
    SponsorsLoaded(state, payload: SponsorsResource) {
        state.error = false;
        state.sponsors = payload;
    },
    SponsorsError(state) {
        state.error = true;
        state.sponsors = undefined;
    }
};