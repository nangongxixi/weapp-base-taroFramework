import {cacheGet, get, post} from '@inc/api'

// detail：1（传detail=1获取字段，不传就不获取）
export const marketStoreInfo = (data = {}) =>
    get('/store/info', data, true);

export const storeGoods = (data = {}) =>
    get('/store/goods', data, true);

export const goodsDetail = (data = {}) =>
    get('/goods/detail', data, true);

export const isFav = (data = {}) =>
    post('/user/fav/faved', data);

export const favAdd = (data = {}) =>
    post('/user/fav/add', data);

export const favDel = (data = {}) =>
    post('/user/fav/delete', data);

export const goodsDesigns = (data = {}) =>
    get('/goods/designs', data, true);

export const videoList = (data = {}) =>
    get('/agent/storeVideo/search', data, true);

export const videoInfo = (data = {}) =>
    get('/agent/storeVideo/info', data, true);

export const storeCertSearch = (data = {}) =>
    get('/agent/storeCert/search', data, true);

export const storeAlbumSearch = (data = {}) =>
    get('/agent/storeAlbum/search', data, true);

export const storeCasusSearch = (data = {}) =>
    get('/agent/storeCasus/search', data, true);

export const storeNewsSearch = (data = {}) =>
    get('/agent/storeNews/search', data, true);

export const accessAdd = (data = {}) =>
    post('/agent/access/add', data);

// type：推广类型（1.收藏数据，2.加盟数据，3.加盟提交，4.全部加盟提交，5.经纪人注册数）
export const joinCount = (data = {}, refresh) => {
    return cacheGet(
        `promotion${data.shop_id}_${data.type}`,
        '/agent/promotion/info',
        data,
        refresh
    );
};
