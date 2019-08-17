import {BaseView} from '@com/index'
import {View, Image} from '@tarojs/components'
import Taro, {useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {commissionRule} from '@inc/service/broker'

export default function MakeMoneyPage() {
    const [info, setInfo] = useState({})

    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '赚钱攻略'
        })
        setInfo(await commissionRule())
    })

    return (
        <BaseView>
            <View>
                <Image className='w100' src={info.money_strategy} mode='widthFix' />
            </View>
        </BaseView>
    )
}
