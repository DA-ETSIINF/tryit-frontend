import { GetterTree } from 'vuex';
import { VolunteerState } from './index';
import { RootState } from '~/types';

export const getters: GetterTree<VolunteerState, RootState> = {
    getvolunteerPeriods(state): string {
        const { volunteerPeriods } = state;
        const date = (volunteerPeriods && volunteerPeriods.date) || '';
        const id = (volunteerPeriods && volunteerPeriods.id) || '';
        const period = (volunteerPeriods && volunteerPeriods.period) || '';

        return `${date} ${id} ${period} `;
    }
};