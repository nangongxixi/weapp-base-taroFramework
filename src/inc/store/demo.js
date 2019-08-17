import { Store } from 'laco'
import {makeStore} from "@util/index";

export const CountStore = new Store({
        count : 20
    },
    'CountStore'
);

export const addCount = () =>
    CountStore.set(
        ({count}) => ({
            count: ++count
        }),
        'Add count'
    );

export const minusCount = () =>
    CountStore.set(
        ({ count }) => ({
            count: --count
        }),
        'Minus count'
    );

export const setCount = (n) =>
    CountStore.set(
        () => ({
            count: n
        }),
        'Set count'
    );

export const useStore = makeStore(CountStore)
