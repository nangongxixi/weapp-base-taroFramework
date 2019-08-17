import {BaseView, Rich, JoinAdd} from '@com/index'
import {View, Text, ScrollView} from '@tarojs/components'
import Taro, {useRef, useState} from '@tarojs/taro'
import {goto} from '@inc/router'
import {rIndex, rBroker} from '@inc/router/url'
import {useAsyncEffect} from '@util/index'
import {useUserLink} from '@inc/use-user'
import { getScrllTop, parseReqId } from '@util/tool'
import {storeInfo} from '@inc/service/user'
import {pageShare} from "@inc/share";
import rStore from "@inc/router/url/store";
import {marketStoreInfo} from '@inc/service/shop'
import {useDocumentTitle} from "@inc/use-dom";

import Top from './widget/top'
import Msg from './widget/msg'
import Card from './widget/card'
import Foot from './widget/foot'

import './join.less'

export default function StoreJoinPage() {
    let id = parseReqId(this.$router.params,'id')
        || parseReqId(this.$router.params,'shop_id');
    const topS = useRef(false);
    const topE = useRef(false);
    const top1 = useRef(470);
    const top2 = useRef(1000);
    const [sct, setSct] = useState(null);
    const [isFix, setFix] = useState(0);
    const [detail, setDetail] = useState({});
    const [recom, setRecom] = useState({});

    useDocumentTitle('招商加盟');

    pageShare(this, () => ({title: detail.title  + '诚招全国代理'}), rStore.join, {id});
    useAsyncEffect(async () => {
        getInfo();
        setRecom(await marketStoreInfo({id: id, detail: 1}))
    }, [id]);
    const getInfo = async () => {
        let res = await storeInfo({shop_id: id});
        let agent = res.agent;
        res.content = agent.content + agent.policy + agent.superiority;
        setDetail(res);
        getScrllTop('.join-title', e => {
            top2.current = e;
        });
    };
    const scroll = (t, e) => {
        if (t) {
            setSct(t === 1 ? top1.current : top2.current);
            setFix(t === 1 ? 0 : 2);
            setTimeout(() => {
                setSct(null);
            }, 100);
            return
        }
        if (sct) {
            return;
        }
        const sct1 = e.detail.scrollTop > top1.current;
        if (sct1) {
            const sct2 = e.detail.scrollTop < top2.current;
            topE.current !== sct2 && setFix(sct2 ? 1 : 2);
            topE.current = sct2;
        } else {
            topS.current !== sct1 && setFix(0);
        }
        topS.current = sct1;
    };
    const handleUserLink = useUserLink();
    return detail.id && (
        <BaseView>
            <ScrollView className='store-join' scrollY onScroll={e => scroll(0, e)} scrollTop={sct}>
                <Top detail={detail} />
                <Msg detail={detail} />
                {
                    detail.province_amount > 0 &&
                    <View className='brokerage-box dis-flex' onClick={handleUserLink(rBroker.rule, {id: id})}>
                        <View className='b-title at-col at-col-6'>推荐客户, 赚取佣金</View>
                        <View className='price at-col at-col-5'>
                            ￥{detail.province_amount}
                            <Text className='span'>最高佣金</Text>
                        </View>
                        <View className='iconfont iconjiantou at-col at-col-1' />
                    </View>
                }
                <View className='s-j-nav'>
                    <View className={`s-nav-box ${isFix ? 's-nav-fixed' : ''}`}>
                        <View className='s-nav-txt' onClick={() => scroll(1)}>
                            <Text className={isFix !== 2 ? 's-active' : ''}>品牌介绍</Text>
                        </View>
                        <View className='s-nav-txt' onClick={() => scroll(2)}>
                            <Text className={isFix === 2 ? 's-active' : ''}>加盟信息</Text>
                        </View>
                        <View className='red-btn' onClick={() => goto(rIndex.joinAdd, {id: id})}>加盟咨询</View>
                    </View>
                </View>
                <View className='p-rich-warp' id='brand'>
                    <View className='r-title'>品牌介绍</View>
                    <Rich content={recom.content} />
                </View>
                <View className='card-warp'>
                    <Card detail={detail} />
                </View>
                <View className='p-rich-warp' id='join'>
                    <View className='r-title join-title'>加盟信息</View>
                    <Rich content={detail.content} />
                </View>
                <JoinAdd shopId={id} />
            </ScrollView>

            <Foot current={2} shopId={id} />
        </BaseView>
    )
}
