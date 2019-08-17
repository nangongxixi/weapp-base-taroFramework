import { post, get } from '@inc/api'

export const helpInfo = (data = {}) =>
    get('/agent/help/info', data)

export const storeCertInfo = (data = {}) =>
    get('/agent/storeCert/info', data)

export const bannerInfo = (data = {}) =>
    get('/agent/banner/info', data)

export const storeCasusInfo = (data = {}) =>
    get('/agent/storeCasus/info', data)

export const openShopInfo = (data = {}) =>
    get('/agent/openShop/info', data, true)

export const storeNewsInfo = (data = {}) =>
    get('/agent/storeNews/info', data, true)

export const leaderboardInfo = (data = {}) =>
    get('/agent/leaderboard/info', data, true)

export const newsSearchInfo = (data = {}) =>
    get('/agent/news/info', data)
