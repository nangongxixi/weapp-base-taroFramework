import {BaseView, Rich} from '@com/index'
import {View, Text, Image} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import Taro, {useState} from '@tarojs/taro'
import {isH5} from "@config/index";
import {rStore} from '@inc/router/url'
import {shareMessage} from "@inc/share";
import {go} from "@inc/router";
import { parseReqId } from '@util/tool'

import {openShopInfo} from '@inc/service/com'
import '../com/editor.less'


export default function ShopDetail() {
    const id = parseReqId(this.$router.params,'id');
    const [detail, setDetail] = useState({});
    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '开店详情'
        });
        setDetail(await openShopInfo({id: id}));
    });
    this.onShareAppMessage = () => {
        const share = shareMessage(detail.title, null, rStore.shopDetail, {id: id});
        return share;
    };
    return (
        <BaseView>
            <View className='editor-page' style={isH5() ? '' : 'padding-bottom:60px'}>
                <View className='title'>{detail.title}</View>
                <View className='at-row'>
                    <View className='at-col date'>
                        {detail.cdate}
                    </View>
                    <View>
                        <Text className='iconfont iconyanjing' /> {detail.hits || 0}
                    </View>
                </View>
                {
                    detail.logo &&
                    <Image
                      className='logo'
                      src={detail.logo}
                      mode='widthFix'
                    />
                }
                <View className='cnt'>
                    <Rich content={detail.content} />
                </View>
                {
                    !isH5() && detail.shop_id &&
                    <View className='red-btn'
                      onClick={go('shopIndex', {shop_id: detail.shop_id})}
                    >了解加盟店详情</View>
                }
            </View>
        </BaseView>
    )
}
