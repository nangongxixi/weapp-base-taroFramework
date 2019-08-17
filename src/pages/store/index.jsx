import {BaseView, JoinAdd} from '@com/index'
import {View} from '@tarojs/components'
import {storeInfo} from '@inc/service/user'
import {rStore} from "@inc/router/url";
import { parseReqId } from '@util/tool'
import {useDocumentTitle, useStatAddShop, pageShare} from "@inc/index";
import {useApi} from "@util/use-reqeust";

import Top from './widget/top'
import Msg from './widget/msg'
import StoreBanner from './widget/Banner'
import Goods from './widget/Goods'
import Shop from './widget/Shop'
import Card from './widget/card'
import Design from './widget/Design'
import News from './widget/News'
import Foot from './widget/foot'
import Banner from '../index/widget/Banner'

import './index.less'

export default function StorePage() {
    useDocumentTitle('品牌首页');
    const id = parseReqId(this.$router.params, 'id')
        || parseReqId(this.$router.params,'shop_id');

    const detail = useApi(storeInfo, {shop_id: id}, [id]);

    pageShare(this, () => ({title: detail.title}), rStore.index, {id});
    useStatAddShop(detail);

    return detail.id && (
        <BaseView>
            <View className='store-index pdb-50'>
                <Top detail={detail} />
                <Msg detail={detail} hasBom />
                <View className='pdlr-15'>
                    <StoreBanner shopId={id} />
                    <Goods shopId={id} />
                    <Shop shopId={id} />
                    <View className='card-warp com-box mgtb-15'>
                        <Card detail={detail} />
                    </View>
                    <Banner height={174} />
                    <Design shopId={id} />
                    <News shopId={id} />
                </View>
                <JoinAdd shopId={id} />
                <Foot shopId={id} />
            </View>
        </BaseView>
    )
}
