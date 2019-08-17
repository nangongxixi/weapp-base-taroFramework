import {BaseView, Rich} from '@com/index'
import {View, Text, Image} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import Taro, {useState} from '@tarojs/taro'
import {rIndex} from '@inc/router/url'
import {shareMessage} from "@inc/share";
import { parseReqId } from '@util/tool'

import {newsSearchInfo} from '@inc/service/com'
import '../com/editor.less'


export default function BookDetail() {
    const id = parseReqId(this.$router.params,'id')
    const [detail, setDetail] = useState({});
    useAsyncEffect(async () => {
        let res = await newsSearchInfo({id: id});
        Taro.setNavigationBarTitle({
            title: res.title
        });
        setDetail(res)
    });
    this.onShareAppMessage = () => {
        const share = shareMessage(detail.title, null, rIndex.bookDetail, {id: id});
        return share;
    };
    return (
        <BaseView>
            <View className='editor-page'>
                <View className='title'>{detail.title}</View>
                <View className='at-row'>
                    <View className='at-col date'>
                        {detail.created_time}
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
            </View>
        </BaseView>
    )
}
