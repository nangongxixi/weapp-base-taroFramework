import {createContext} from "@tarojs/taro";

let shopId;

export const setStoreId = (init) => {
    shopId = init;
};

export const getStoreId = () => shopId;

export const ShopIdContext = createContext(0);
