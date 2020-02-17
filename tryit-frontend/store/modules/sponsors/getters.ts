import { GetterTree } from 'vuex';
import { SponsorState } from './index';
import { RootState, SponsorsResource } from '~/types';

export const getters: GetterTree<SponsorState, RootState> = {
    getOrganizers(state): SponsorsResource | undefined {
        const { sponsors } = state;
        return sponsors
    }
};