import { useState, useEffect } from '@tarojs/taro'
import {isEnvProduct} from "@config/index";

export * from './use-reqeust'

export const makeStore = function(defStore) {
    return (store = defStore, normalizer) => {
        const [ state, setState ] = useState(store.get());

        function updateState () {
            setState(normalizer ? normalizer(store.get()) : store.get());
        }

        useEffect(() => {
            store.subscribe(updateState);
            return () => store.unsubscribe(updateState)
        });
        return state
    }
};

/**
 * catch api data
 * @type {{}}
 */
let cache = {};
let dataLoading = {};

export function cacheAsyncData(key, asyncCall, refresh) {
    if (!refresh && cache[key]) {
        console.log(`cache: hit async call '${key}'`);
        return wrapPromiseRs(cache[key]);
    }

    if(dataLoading[key] && cache[key]){
        console.log(`cache: is loading '${key}'`);
        return wrapPromiseRs(cache[key]);
    }

    console.log(`cache: gen data '${key}'`);
    dataLoading[key] = true;
    cache[key] = asyncCall().then(data => {
        cache[key] = data;
        dataLoading[key] = false;
        return data
    }).catch((err) => {
        console.log('error: asyncCall', err);
        dataLoading[key] = false;
        throw err;
    });

    return cache[key]
}

function wrapPromiseRs(rs){
    if (rs instanceof Promise) {
        return rs
    } else {
        return Promise.resolve(rs)
    }
}

export function log(...args) {
    if(!isEnvProduct()){
        console.log(...args);
    }
}
