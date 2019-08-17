import {BaseView, AgentList} from '@com/index'
import {View, Image} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import Taro, {useState} from '@tarojs/taro'
import {shareMessage} from "@inc/share";
import {rCom} from "@inc/router/url";
import {leaderboardInfo} from '@inc/service/com'

export default function TopicPage() {
    const {id} = this.$router.params;
    const [info, setInfo] = useState({});

    useAsyncEffect(async () => {
        let res = await leaderboardInfo({id: id});
        Taro.setNavigationBarTitle({
            title: res.title
        });
        setInfo(res)
    });
    this.onShareAppMessage = () => {
        const share = shareMessage(info.title, null, rCom.topic, {id: id});
        return share;
    }
    return (
        <BaseView>
            <Image
              className='w100'
              src={info.logo}
              mode='widthFix'
            />
            <View className='pd-15'>
                <AgentList items={info.shopList} />
            </View>
        </BaseView>
    )
}
