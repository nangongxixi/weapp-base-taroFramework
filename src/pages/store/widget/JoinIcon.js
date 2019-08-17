import {View, Text} from '@tarojs/components'

import './JoinIcon.less'

function JoinIcon() {
    return (
        <View className='join-icon nm dis-flex text-center'>
            <View className='flex-hide'>
                <Text className='iconfont iconyuyue' /> 预约考察
            </View>
            <View className='flex-hide'>
                <Text className='iconfont iconfeiyong' /> 咨询费用
            </View>
            <View className='flex-hide'>
                <Text className='iconfont iconliaojie' /> 了解区域
            </View>
            <View className='flex-hide'>
                <Text className='iconfont icondizhi' /> 开店选址
            </View>
        </View>
    )
}

JoinIcon.options = {
    addGlobalClass: true
};

export default JoinIcon
