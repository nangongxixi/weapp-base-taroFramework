import Taro, {useEffect, useState} from "@tarojs/taro";
import {uniq} from "@util/tool";

/**
 * 搜索历史
 * @returns {{history: *, addHistory: *}}
 */
export const useHistory = () => {
    const cacheKey = 'skHistory';
    const [history, setHistory] = useState([]);
    const maxLen = 8;

    useEffect(() => {
        const cache = Taro.getStorageSync(cacheKey);
        console.log('cache:History', cache);
        if (!cache) {
            return;
        }
        setHistory(cache)
    }, []);

    const addHistory = (keywords) => {
        let newHistory = uniq([keywords, ...history]).slice(0, maxLen);
        Taro.setStorageSync(cacheKey, newHistory);
        setHistory(newHistory);
    };

    return {history, addHistory}
};


/**
 * 筛选对象, 用户所有维度的筛选结果对象
 * @param initFilters
 * @param onChange
 * @param autoRefreshInit
 * @returns {any[]}
 */
export const useFilter = (initFilters, onChange, autoRefreshInit) => {
    const [ filters, setFilters] = useState(initFilters);

    const changeFilter = (value, reset) => {
        let newState = reset ? value : {...filters, ...value};
        setFilters(newState);
        onChange && onChange(newState)
    };

    useEffect(() => {
        if(autoRefreshInit){
            setFilters(initFilters);
        }
    }, [initFilters]);

    return [filters, changeFilter, setFilters]
};

/**
 * 类别筛选, 只显示指定数量的类别
 * @param active
 * @param defItemALl
 * @param max
 * @param initCats
 * @returns {*[]}
 */
export const useFilterCategory = (active, defItemALl, max, initCats = []) => {
    const [ cats, setCats ] = useState(initCats);
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        setItems(findActiveCats(cats, active, max, defItemALl));
        console.log('hook: useEffect.setFilterTabItems');
    }, [active, cats]);

    return [cats, setCats, items];
};

/**
 * 格式过滤请求参数
 * @param initParams
 * @param formatter
 * @param autoRefreshInit 初始化参数更新, 自动更新状态
 * @returns {any[]}
 */
export const useFilterNormalize = (initParams, formatter, autoRefreshInit) => {
    const [params, setParams] = useState(null);
    const changeParams = (args, raw = false) => {
        setParams(raw ? args : formatter(args))
    };

    useEffect(() => {
        if(autoRefreshInit){
            changeParams(initParams);
        }
    }, [initParams]);

    return [params, changeParams];
};

/**
 * 查找数组中相邻的元素数量
 * @param cats
 * @param active
 * @param max
 * @param defItem
 * @returns {*[]|Array|*}
 */
export const findActiveCats = (cats, active, max, defItem) => {
    if(cats.length <= 0){
        return [];
    }

    const index = cats.findIndex((v) => {
        return v.id == active.id
    });

    if(index < max || max > cats.length) {
        return cats.slice(0, max)
    } else {
        return [defItem, ...cats.slice(index - (max - 2), index + 1)]
    }
};
