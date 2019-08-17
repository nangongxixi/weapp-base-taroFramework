import {BaseView, Rich} from '@com/index'
import {View, Text} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import Taro, {useState} from '@tarojs/taro'
import {rMine} from '@inc/router/url'
import {shareMessage} from "@inc/share";

import {helpInfo} from '@inc/service/com'
import '../com/editor.less'

export default function HelpDetail() {
    const {id} = this.$router.params;
    const [detail, setDetail] = useState({});
    useAsyncEffect(async () => {
        let res = await helpInfo({id: id});
        Taro.setNavigationBarTitle({
            title: res.title
        });
        setDetail(res)
    });
    this.onShareAppMessage = () => {
        const share = shareMessage(detail.title, null, rMine.helpDetail, {id: id});
        return share;
    };
    return (
        <BaseView>
            <View className='editor-page'>
                <View className='title'>{detail.title}</View>
                <View className='at-row'>
                    <View className='at-col date'>
                        {detail.cdate}
                    </View>
                    <View>
                        <Text className='iconfont iconyanjing' /> {detail.hits || 0}
                    </View>
                </View>
                <View className='cnt'>
                    <Rich content={detail.content} />
                </View>
            </View>
        </BaseView>
    )
}
