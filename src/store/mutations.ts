import {Menu, State} from '@/store/state';
import {MutationTree} from 'vuex';

enum MutationsTypes {
    SET_MENU = 'SET_MENU'
}

type Mutations<S = State> = {
    [MutationsTypes.SET_MENU](state: S, payload: Menu[]): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationsTypes.SET_MENU](state, payload: Menu[]) {
        state.menu = payload
    },
}