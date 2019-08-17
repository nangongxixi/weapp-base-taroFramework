import { get, post } from '@inc/api'

export const getStat = (data = {}) =>
    get('/agent/my/stat', data, true);

export const getHelp = (data = {}) =>
    get('/agent/help/search', data);

export const favList = (data = {}) =>
    get('/agent/fav/search', data, true);

export const myBrand = (data = {}) =>
    get('/agent/my/brandSearch', data, true);

export const brandJoin = (data = {}) =>
    post('/agent/brandEntry/add', data);

export const commissionTotal = (data = {}) =>
    get('/agent/broker/search/commissionTotal', data, true);

export const bankLogo = (data = {}) =>
    get('/agent/broker/bank/logo', data, true);

export const myRealName = (data = {}) =>
    get('/agent/broker/my/realName', data, true);

export const bankAddAccount = (data = {}) =>
    get('/agent/broker/bank/addAccount', data, true);
