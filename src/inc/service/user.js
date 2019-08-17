import {post, get, cacheGet} from "@inc/api";

export const sendSmsCode = (data = {}) => {
  return get('/user/phonecode', data)
};

export const loginSubmit = (data = {}) => {
  return get('/user/login', data)
};

export const storeInfo = (data = {}) => {
  return get('/agent/shop/info', data)
};

export const clientVerifyReg = (data = {}) => {
  return get('/com/clientSecurity/reg', data)
};

export const authCode = (data = {}) => {
  return post('/uc/auth/code', data)
};

export const comFormid = (data = {}) => {
  return post('/com/formid', data)
};

export const comRegion = (data = {}, refresh) => {
  return cacheGet(
      `comregion${data.pid}`,
      '/com/region',
      data,
      refresh
  );
};

export default {
  decode(data = {}) {
    // 授权手机号码
    return post('/wxapp/decodePhone', data)
  },

  accredit(data = {}) {
    // 授权头像验证
    return post('/wxapp/bindBaseInfo', data)
  },

  storeApply(data = {}) {
    // 商家入驻
    return post('/store/apply', data)
  },

  marketStoreInfo(data = {}) {
    return get('/store/info', data)
  },

  userInfo(data = {}) {
    return get('/user/info', data, true)
  },

  goodsDetail(data = {}) {
    return get('/goods/detail', data)
  },

  userPhonecode(data = {}) {
    return post('/manage/agent/auth/phoneLogin', data)
  },

  phonecodeCheck(data = {}) {
    return post('/manage/agent/auth/phonecodeCheck', data)
  },

  brokerMyReg(data = {}) {
    return post('/agent/broker/my/reg', data)
  },

  authLogin(data = {}) {
    return post('/manage/agent/auth/login', data)
  },

  goodsDesigns(data = {}) {
    return get('/goods/designs', data)
  },

  storeGoods(data = {}) {
    return get('/store/goods', data)
  },

  storeGoodsCatTree(data = {}) {
    return get('/store/goods/catTree', data)
  },

  browseRecord(data = {}) {
    return get('/agent/browseRecord', data, true)
  },

  sendFormId(data = {}) {
    // 发送form id
    return post('/com/formid', data)
  }
}
