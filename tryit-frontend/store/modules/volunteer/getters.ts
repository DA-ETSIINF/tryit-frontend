import { GetterTree } from 'vuex';
import { VolunteerState } from './index';
import { RootState, VolunteerPeriodsResource } from '~/types';

export const getters: GetterTree<VolunteerState, RootState> = {
    getvolunteerPeriods(state): VolunteerPeriodsResource | undefined{
        const { volunteerPeriods } = state;
        return volunteerPeriods
    }
};