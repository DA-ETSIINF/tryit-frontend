import { GetterTree } from 'vuex';
import { ContactState } from './index';
import { RootState } from '~/types';

export const getters: GetterTree<ContactState, RootState> = {
    getContactInfo(state): string {
        const { contactInfo } = state;
        const description = (contactInfo && contactInfo.description) || '';
        const email = (contactInfo && contactInfo.email) || '';
        const photo = (contactInfo && contactInfo.photo) || '';
        const title = (contactInfo && contactInfo.title) || '';

        return `${description} ${email} ${photo} ${title}`;
    }
};