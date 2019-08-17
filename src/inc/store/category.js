import {Store} from 'laco'
import {makeStore} from "@util/index";

export const DEF_FILTER = {
    cat: {
        id: 0,
        name: '全部',
        index: '-1'
    },
    price: -1,
    search: ''
};

const filterStore = new Store(DEF_FILTER, 'CategoryStore');

export const setFilter = (n, only = false) =>
    filterStore.set(
        (state) => (only ? {...DEF_FILTER, ...n} : {...state, ...n}),
        'Set all'
    );

export const setCategory = (n) =>
    filterStore.set(
        (state) => ({...state, cat: n}),
        'Set search type'
    );

export const setPrice = (n) =>
    filterStore.set(
        (state) => ({...state, price: n}),
        'Set price'
    );

export const setSearch = (n) =>
    filterStore.set(
        (state) => ({...state, search: n}),
        'Set search'
    );

export const reset = () =>
    filterStore.reset();

export const useAgentFilterStore = makeStore(filterStore);
