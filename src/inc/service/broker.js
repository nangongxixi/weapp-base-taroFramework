import { post, get } from '@inc/api'

export const brokerInfo = (data = {}) =>
    get('/agent/broker/info', data, true);

export const brokerQrcode = (data = {}) =>
    get('/agent/broker/qrcode', data, true);

export const brokerMyCheck = (data = {}) =>
  get('/agent/broker/my/check', data, true);

export const myFanNum = (data = {}) =>
    get('/agent/broker/my/fanNum', data, true);

export const searchBudgets = (data = {}) =>
  get('/agent/shop/search/budgets', data);

export const myFriend = (data = {}) =>
    get('/agent/broker/my/friend', data, true);

export const rewardRules = (data = {}) =>
    get('/agent/broker/search/rewardRules', data, true);

export const searchClientType = (data = {}) =>
    get('/agent/search/clientType', data);

export const updateAdd = (data = {}) =>
    post('/agent/update/add', data);

export const commissionStandard = (data = {}) =>
    get('/agent/broker/commission/standard', data, true);

export const commissionRule = (data = {}) =>
    get('/agent/broker/commission/rule', data, true);
