import {BaseView} from '@com/index'
import {AtButton} from 'taro-ui'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {goto} from '@inc/router'
import {rIndex} from '@inc/router/url'
import {isH5} from '@config'

import img from '@img/mine2.png'
import './login.less'

export default function IndexLoginPage() {
    Taro.setNavigationBarTitle({
        title: '用户登录'
    });

    return (
        <BaseView>
            <View className='login-index'>
                <View className='head bg-cov' style={`background-image:url(${img})`} />
                <View className='txt'>请前往商家管理中心获取联系方式</View>
                {
                    !isH5() &&
                    <AtButton className='btn' onClick={() => goto('sgjLogin')}>立即登录</AtButton>
                }
                <AtButton className='btn btn2' onClick={() => goto(rIndex.apply)}>立即申请账号</AtButton>
            </View>
        </BaseView>
    )
}
