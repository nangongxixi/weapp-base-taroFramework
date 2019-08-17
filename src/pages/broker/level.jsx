import {BaseView} from '@com/index'
import {View, Image} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import {level1, broker8} from '@img/images'
import Taro, {useState} from '@tarojs/taro'
import {brokerInfo, commissionRule} from '@inc/service/broker'

import './level.less'

export default function BrokerLevelPage() {
    const [info, setInfo] = useState({});
    const [rule, setRule] = useState({});

    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '信用等级'
        });
        setInfo(await brokerInfo());
        setRule(await commissionRule())
    });

    return (
        <BaseView>
            <View className='level-rule xs'>
                <View className='top-block text-center'
                  style={`background:url(${level1}) no-repeat; background-size:100%;`}
                >
                    <Image className='level-logo' src={broker8} />
                    <View className='level'>{info.levelName}</View>
                    <View className='date'>评估时间: {info.cdate ? info.cdate.split(' ')[0] : ''}</View>
                </View>
                <Image className='cnt' mode='widthFix' src={rule.img} />
            </View>
        </BaseView>
    )
}
