import {useEffect, useState} from '@tarojs/taro';
import {log} from "@util/index";

export function useAsyncEffect (effect, deps = []) {
    useEffect(() => {
        effect()
    }, deps)
}

const useAsyncState = () => {
    const [isStart, setStart] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    return {
        isStart,
        setStart,
        isLoading,
        setLoading,
        error,
        setError,
        result,
        setResult,
    }
};

/**
 * 会增加 4次更新?
 * @param service
 * @param args
 * @returns {{
 * isLoading: boolean,
 * result: any,
 * setLoading: Taro.Dispatch<Taro.SetStateAction<boolean>>,
 * setResult: Taro.Dispatch<Taro.SetStateAction<any>>,
 * setError: Taro.Dispatch<Taro.SetStateAction<any>>,
 * error: any
 * }}
 */
export const useService = (service, args) => {
    const asyncState = useAsyncState();
    useEffect(() => {
        console.log("fetch: useService", args);
        asyncState.setStart(false);
        asyncState.setLoading(true);
        service(args).then(
            rs => {
                asyncState.setResult(rs);
                asyncState.setStart(true);
                asyncState.setLoading(false)
            },
            error => {
                asyncState.setError(error);
                asyncState.setStart(true);
                asyncState.setLoading(false)
            }
        )
    }, [args]);
    return asyncState;
};

/**
 * use api
 * @param service
 * @param args
 * @param deps
 * @param normalizer
 * @param checker
 * @param initValue
 * @returns {{}}
 */
export const useApi = (service, args, deps = [], checker, normalizer, initValue = {}) => {
    const [data, setData] = useState(initValue);
    useEffect(() => {
        if(checker && !checker()){
            return;
        }
        log('api:useEffect', args);
        service(args).then((rs) => {
            setData(normalizer ? normalizer(rs) : rs);
        })
    }, deps);
    return data;
};

/**
 *
 * @param service
 * @param params
 * @returns {{page: number, items: Array, setPage: Taro.Dispatch<Taro.SetStateAction<number>>}}
 */
export const useScrollData = (service, params) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [notFound, setNotFound] = useState(false);
    const fetchRs = useService(service, params);

    useEffect(() => {
        const rsIsArray = fetchRs.result instanceof Array;
        if( !fetchRs.result
            || !rsIsArray
            || rsIsArray && fetchRs.result.length === 0
        ) {
            if(fetchRs.isStart && page === 1){
                setNotFound(true);
            }
        } else {
            setNotFound(false);
            if(page === 1){
                setItems(fetchRs.result);
            } else {
                setItems([...items, ...fetchRs.result]);
            }
        }
    }, [fetchRs.result, page]);

    return {
        page,
        setPage,
        items,
        fetchRs,
        notFound,
    }
};

