import { writable } from 'svelte/store';

export interface SessionStatusInterface {
    loginStatus: boolean;
    showPopUp: boolean;
}

const sessionStatus: SessionStatusInterface = {
    loginStatus: false,
    showPopUp: false
}

const sessionStatusStore = writable<SessionStatusInterface>(sessionStatus);

const { update } = sessionStatusStore;

const login = () => {
    update((currentSession: SessionStatusInterface) => {
        return { ...currentSession, loginStatus: true };
    });
};

const logout = () => {
    update((currentSession: SessionStatusInterface) => {
        return { ...currentSession, loginStatus: false };
    });
};

const showLoginPopUp = () => {
    update((currentSession: SessionStatusInterface) => {
        return {...currentSession, showPopUp: true};
    });
};

const hideLoginPopUp = () => {
    update((currentSession: SessionStatusInterface) => {
        return {...currentSession, showPopUp: false};
    });
};

export {
    sessionStatusStore,
    login,
    logout,
    showLoginPopUp,
    hideLoginPopUp,
};