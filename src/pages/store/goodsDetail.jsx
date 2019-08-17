import {BaseView, JSlider, Rich} from '@com/index'
import {View, Text, Button} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {storeInfo} from '@inc/service/user'
import {isH5} from '@config'
import {rStore} from "@inc/router/url";
import {goodsDetail} from '@inc/service/shop'
import { parseReqId } from '@util/tool'
import {pageShare, useDocumentTitle, useStatAddGoods} from "@inc/index";
import {useApi} from "@util/use-reqeust";

import GoodsCard from './widget/goods-card'
import GoodsDesign from './widget/goods-design'
import GoodsFoot from './widget/goods-foot'

import './goodsDetail.less'

export default function GoodsDetailPage() {
    const id = parseReqId(this.$router.params, 'id');
    const info = useApi(goodsDetail, {id: id}, [id], null, (res) => {
        res.images = res.images || [];
        res.banner = res.images.map(item => item.image);
        return res;
        });
    const shop = useApi(storeInfo, {shop_id: info.shop_id}, [info], () => info.shop_id);

    pageShare(this, () => ({title: info.title}), rStore.goodsDetail, {id});
    useDocumentTitle('产品详情');
    useStatAddGoods(info); // 增加统计

    const imgView = item => {
        Taro.previewImage({
            current: item,
            urls: info.banner
        })
    };

    return info.id && (
        <BaseView>
            <View className='goods-detail flex-c'>
                <View className='flex-auto'>
                    {
                        info.images.length > 0
                            ? <JSlider items={info.images} onClick={(item) => imgView(item)} height={375} />
                            : <View className='bg-cov'
                              style={`background-image:url(${info.image}); height:375px;`}
                            />
                    }
                    <View className='price-box'>
                        <View className='title'>{info.title}</View>
                        <View className='dis-flex'>
                            <View className='flex-hide'>
                                <Text className='price'>{info.price}</Text>
                                <Text className='price-txt'>建议零售价</Text>
                            </View>
                            {
                                !isH5() &&
                                <Button className='iconfont iconfenxiang1' open-type='share' />
                            }
                        </View>
                    </View>
                    {shop.id &&
                        <GoodsCard shop={shop} />
                    }
                    <GoodsDesign goodsId={id} />
                    <View className='block-box'>
                        <View className='title'>图文详情</View>
                        <Rich content={info.content} />
                    </View>
                </View>
                <GoodsFoot info={info} shop={shop} />
            </View>
        </BaseView>
    )
}
