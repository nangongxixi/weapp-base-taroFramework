import {BaseView, Rich} from '@com/index'
import {View, Image} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import Taro, {useState} from '@tarojs/taro'
import {rCom, rStore} from '@inc/router/url'
import {shareMessage} from "@inc/share";
import {go} from "@inc/router";
import { parseReqId } from '@util/tool'

import {storeCasusInfo} from '@inc/service/com'
import '../com/editor.less'


export default function DesignDetail() {
    const id = parseReqId(this.$router.params,'id');
    const [detail, setDetail] = useState({});
    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '案例详情'
        });
        setDetail(await storeCasusInfo({id: id}));
    });
    this.onShareAppMessage = () => {
        const share = shareMessage(detail.title, null, rStore.designDetail, {id: id});
        return share;
    };
    return (
        <BaseView>
            <View className='editor-page'>
                {
                    detail.image &&
                    <Image
                      className='logo'
                      src={detail.image}
                      mode='widthFix'
                      style='margin:0;'
                      onClick={go(rCom.webView, {path: detail.vr})}
                    />
                }
                <View className='cnt'>
                    <Rich content={detail.content} />
                </View>
            </View>
        </BaseView>
    )
}
