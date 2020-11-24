import {Menu, State} from '@/store/state';
import {MutationTree} from 'vuex';
import {USER} from '@/store/LocalStorageKeys';

enum MutationsTypes {
    SET_MENU = 'SET_MENU',
    SET_USER = 'SET_USER',
}

export type Mutations<S = State> = {
    [MutationsTypes.SET_MENU](state: S, payload: Menu[]): void
    [MutationsTypes.SET_USER](state: S, payload: string): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationsTypes.SET_MENU](state, payload: Menu[]) {
        state.menu = payload
    },
    [MutationsTypes.SET_USER](state, payload: string) {
        localStorage.setItem(USER, payload)
        state.user = payload
    },
}