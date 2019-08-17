import {BaseView, Rich} from '@com/index'
import {View} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import Taro, {useState} from '@tarojs/taro'
import {rIndex} from '@inc/router/url'
import {shareMessage} from "@inc/share";

import {bannerInfo} from '@inc/service/com'
import '../com/editor.less'

export default function BannerDetail() {
    const {id} = this.$router.params;
    const [detail, setDetail] = useState({});
    useAsyncEffect(async () => {
        let res = await bannerInfo({id: id});
        Taro.setNavigationBarTitle({
            title: res.title
        });
        setDetail(res)
    });
    this.onShareAppMessage = () => {
        const share = shareMessage(detail.title, null, rIndex.bannerDetail, {id: id});
        return share;
    };
    return (
        <BaseView>
            <View className='editor-page'>
                <View className='cnt' style='padding:0;'>
                    <Rich content={detail.content} />
                </View>
            </View>
        </BaseView>
    )
}
