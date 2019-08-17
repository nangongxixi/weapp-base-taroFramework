import { View, Image } from '@tarojs/components'
import img from '@img/bg_data_default.png'
import './index.less'

function NoData() {
    return (
        <View className='no-data'>
            <Image className='img' src={img} />
            <View>暂无数据</View>
        </View>
    )
}

NoData.options = {
    addGlobalClass: true
}

export default NoData
