import {BaseView, Rich} from '@com/index'
import {View} from '@tarojs/components'
import Taro, {useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {goto} from '@inc/router'
import {rBroker} from '@inc/router/url'
import {commissionStandard, commissionRule} from '@inc/service/broker'

import './rule.less'

export default function BrokerRulePage() {
    let {id} = this.$router.params;
    const [rule, setRule] = useState({});
    const [standard, setStandard] = useState([]);

    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '悬赏招商'
        });
        setRule(await commissionRule({shop_id: id}));
        setStandard(await commissionStandard({shop_id: id}))
    });

    return (
        <BaseView>
            <View className='broker-rule xs'>
                <View className='lg pd-t0'>佣金标准</View>
                <View className='level dis-flex bg'>
                    <View className='flex-hide'>等级</View>
                    <View className='flex-hide'>省级</View>
                    <View className='flex-hide'>省会</View>
                    <View className='flex-hide'>市级</View>
                    <View className='flex-hide'>县级</View>
                    <View className='flex-hide'>代卖</View>
                </View>
                {
                    standard.map(item => {
                        return (
                            <View className='level dis-flex' key={item.id}>
                                <View className='flex-hide text-overflow'>{item.level_name}</View>
                                <View className='flex-hide text-overflow'>{item.province_amount}</View>
                                <View className='flex-hide text-overflow'>{item.province_center_amount}</View>
                                <View className='flex-hide text-overflow'>{item.city_amount}</View>
                                <View className='flex-hide text-overflow'>{item.count_amount}</View>
                                <View className='flex-hide text-overflow'>{item.proxy_amount}</View>
                            </View>
                        )
                    })
                }
                <View className='lg'>佣金规则</View>
                <View className='c-66'>
                    <Rich content={rule.content} />
                </View>
                <View className='red-btn' onClick={() => goto(rBroker.recommend, {id: id})}>立即推荐</View>
            </View>
        </BaseView>
    )
}
