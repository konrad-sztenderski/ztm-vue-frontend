import {CommitOptions, createStore, Store as VuexStore} from 'vuex';
import {State, state} from '@/store/state';
import {Mutations, mutations} from '@/store/mutations';

const store = createStore({
    state,
    mutations
});

export type Store = Omit<VuexStore<State>, 'commit'> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
}

export default store;