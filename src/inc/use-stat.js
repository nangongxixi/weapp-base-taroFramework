import Taro, {useEffect} from "@tarojs/taro";
import router, {rIndex, rStore} from "@inc/router";
import {getGlobal, getShareUid} from "@config/global";
import {isH5} from "@config/index";
import {accessAdd} from "@inc/service/shop";

export function useStatAddIndex() {
    useEffect(() => {
        addIndex();
    }, []);
}

export function useStatAddGoods(data) {
    useEffect(() => {
        if(data.id)
            addGoods(data);
    }, [data]);
}

export function useStatAddShop(data) {
    useEffect(() => {
        if(data.shop_id)
            addShop(data);
    }, [data]);
}

const addAccess = (data) => {
    if (isH5()) {
        return;
    }

    data.share_id = getShareUid();

    const opts = Taro.getLaunchOptionsSync();
    if(opts && opts.scene){
        data.from_scene = Taro.getLaunchOptionsSync().scene;
    }

    return accessAdd(data)
};

// 展商访问记录
export const addShop = (shop) => {
    addAccess({
        path: router.genUrl(rStore.index, {id: shop.shop_id}),
        info_id: shop.shop_id,
        info_type: 'shop',
        shop_id: shop.shop_id,
        detail: {
            title: shop.title,
            logo: shop.logo,
            desc: shop.desc,
            budget: shop.budget,
            read: shop.read,
            level: shop.level,
            type: shop.type
        }
    })
};

// 产品访问记录
export const addGoods = (data) => {
    let id = data.id;
    addAccess({
        path: router.genUrl(rStore.goodsDetail, {id: id}),
        info_id: id,
        info_type: 'goods',
        shop_id: data.shop_id,
        detail: {
            title: data.title,
            logo: data.image,
            price: data.price
        }
    })
};

export function addIndex() {
    addAccess({
        path: rIndex.index,
        info_id: 0,
        chnl_id: getGlobal('scene') || 0,
        info_type: 'agent_index'
    })
}
