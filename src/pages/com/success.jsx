import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import router from '@inc/router'
import { rIndex, rStore, rBroker } from '@inc/router/url'

import './success.less'

export default function SuccessPage() {
    const { id, pn } = this.$router.params
    const tj = pn === 'tj'
    const link = () => {
        if (id) {
            router.ToRedirect(rStore.index, {id: id})
        } else {
            router.ToPage(tj ? rBroker.recommend : rIndex.index)
        }
    }
    return (
        <View className='success text-center'>
            <View className='iconfont iconchenggong'></View>
            <View className='result c-66 sm'>
                <View className='title c-33'>提交成功</View>
                {
                    !tj &&
                    <View>我们的项目经理会尽快与您联系，请保持电话畅通！</View>
                }
                <AtButton type='primary' onClick={link}>{tj ? '继续推荐' : '确定'}</AtButton>
            </View>
        </View>
    )
}
