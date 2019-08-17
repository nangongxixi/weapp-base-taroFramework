import {get, cacheGet} from "@inc/api";

export const getBanners = (data = {}, refresh = false) =>
    cacheGet('banner', '/agent/banner/search', data, refresh)

export const getBannerInfo = (data = {}, refresh = false) =>
    cacheGet(
        `banner${data.id}`,
        '/agent/banner/info',
        data,
        refresh
    );

export const shopIndustry = (data = {}, refresh = false) =>
    cacheGet(
        `industry${data.broker}`,
        '/agent/shop/industry',
        data,
        refresh
    );

export const broadcastSearch = (data = {}, refresh = false) => {
    return cacheGet(
        `broadcastSearch${data.type}`,
        '/agent/broadcast/search',
        data,
        refresh
    )
};

export const shopSearch = (data = {}) => {
    return get('/agent/shop/search', data)
};

export const shopJoin = (data = {}, refresh) => {
    return cacheGet(
        `shop_join${data.shop_id}`,
        '/agent/shop/join',
        data,
        refresh
    );
};

export const housekeeperSearch = (data = {}) => {
    return get('/agent/housekeeper/search', data)
};

export const joinSearch = (data = {}) => {
    return get('/agent/join/search', data)
};

export const newsSearch = (data = {}) => {
    return get('/agent/news/search', data)
};

export const openShopSearch = (data = {}) => {
    return get('/agent/openShop/search', data)
};

export const happyNews = (data = {}) => {
    return get('/agent/broker/happyNews', data, true)
};
