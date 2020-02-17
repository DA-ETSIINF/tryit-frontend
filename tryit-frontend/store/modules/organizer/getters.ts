import { GetterTree } from 'vuex';
import { OrganizerState } from './index';
import { RootState, OrganizerResource } from '~/types';

export const getters: GetterTree<OrganizerState, RootState> = {
    getOrganizers(state): OrganizerResource[] | undefined {
        const { organizers } = state;
        return organizers
    }
};