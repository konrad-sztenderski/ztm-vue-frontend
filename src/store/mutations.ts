import {Menu, State} from '@/store/state';
import {MutationTree} from 'vuex';
import {TOKEN, USER} from '@/store/LocalStorageKeys';

export enum MutationsTypes {
    SET_MENU = 'SET_MENU',
    SET_USER = 'SET_USER',
    SET_TOKEN = 'SET_TOKEN',
    REMOVE_USER = 'REMOVE_USER',
    REMOVE_TOKEN = 'REMOVE_TOKEN',
}

export type Mutations<S = State> = {
    [MutationsTypes.SET_MENU](state: S, payload: Menu[]): void
    [MutationsTypes.SET_USER](state: S, payload: string): void
    [MutationsTypes.SET_TOKEN](state: S, payload: string): void
    [MutationsTypes.REMOVE_USER](state: S): void
    [MutationsTypes.REMOVE_TOKEN](state: S): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationsTypes.SET_MENU](state, payload: Menu[]) {
        state.menu = payload;
    },
    [MutationsTypes.SET_USER](state, payload: string) {
        localStorage.setItem(USER, payload);
        state.user = payload;
    },
    [MutationsTypes.SET_TOKEN](state, payload: string) {
        localStorage.setItem(TOKEN, payload);
        state.token = payload;
    },
    [MutationsTypes.REMOVE_USER](state) {
        localStorage.removeItem(USER);
        state.user = '';
    },
    [MutationsTypes.REMOVE_TOKEN](state) {
        localStorage.removeItem(TOKEN);
        state.token = '';
    },
}