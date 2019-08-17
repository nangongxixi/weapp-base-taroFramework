import { View } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import { useAsyncEffect } from '@util/index'
import { call } from '@util/tool'
import { goto } from '@inc/router'
import { rIndex, rStore } from '@inc/router/url'
import { useUserStore } from '@inc/store/user'
import { isFav, favAdd, favDel } from '@inc/service/shop'
import PropTypes from "prop-types";

import './goods-foot.less'

function GoodsFoot({ info, shop }) {
    const { isGuest } = useUserStore();
    const [isColl, setIsColl] = useState(false);
    useAsyncEffect(async () => {
        !isGuest && setIsColl(await isFav({ type: 'goods', info_id: info.id }))
    });
    const favOpe = async () => {
        let args = { type: 'goods', info_id: info.id };
        if (!isColl) {
            args.title = info.title;
            args.image = info.image
        }
        await (isColl ? favDel(args) : favAdd(args));
        setIsColl(!isColl)
    };
    return (
        <View className='goods-foot dis-flex'>
            <View className='iconfont iconai204' onClick={() => goto(rStore.index, { id: info.shop_id })}>店铺</View>
            {
                !isGuest &&
                <View className={`iconfont ${isColl ? 'iconshoucang2' : 'iconshoucang'}`} onClick={favOpe}>收藏</View>
            }
            <View className='flex-hide'>
                <View className='foot-btn' onClick={() => goto(rIndex.joinAdd, { id: info.shop_id })}>加盟咨询</View>
                <View className='foot-btn b1' onClick={() => call(shop.shop_phone)}>联系我们</View>
            </View>
        </View>
    )
}

GoodsFoot.propTypes = {
    info: PropTypes.object,
    shop: PropTypes.object,
};

GoodsFoot.options = {
    addGlobalClass: true
};

export default GoodsFoot
