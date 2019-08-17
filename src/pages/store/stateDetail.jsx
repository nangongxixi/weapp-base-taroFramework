import {BaseView, Rich} from '@com/index'
import {View, Image} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import Taro, {useState} from '@tarojs/taro'
import {rStore} from '@inc/router/url'
import {shareMessage} from "@inc/share";

import {storeCertInfo} from '@inc/service/com'
import '../com/editor.less'

export default function StateDetail() {
    const {id} = this.$router.params;
    const [detail, setDetail] = useState({});
    useAsyncEffect(async () => {
        let res = await storeCertInfo({id: id});
        Taro.setNavigationBarTitle({
            title: res.title
        });
        setDetail(res)
    });
    this.onShareAppMessage = () => {
        const share = shareMessage(detail.title, null, rStore.stateDetail, {id: id});
        return share;
    };
    return (
        <BaseView>
            <View className='editor-page'>
                <View className='title'>{detail.title}</View>
                <View className='at-row'>
                    <View className='at-col date'>
                        {detail.pdate}
                    </View>
                </View>
                {
                    detail.image &&
                    <Image
                      className='logo'
                      src={detail.image}
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
