import {View, Text} from '@tarojs/components'
import {goto} from '@inc/router'
import {rStore} from '@inc/router/url'
import PropTypes from 'prop-types'

import './List.less'

export default function BrokerList({items}) {
    const lists = items.map(item => {
        return (
            <View
              className='shop-list dis-flex xs com-box'
              key={item.id}
              onClick={() => goto(rStore.join, {id: item.shop_id})}
            >
                <View
                  className='s-pic bg-cov'
                  style={`background-image:url(${item.haibao_image})`}
                />
                <View className='list-right flex-hide'>
                    <View className='fwb nm'>{item.title}</View>
                    <View className='s-txt text-overflow'>{item.desc}大胜靠德静安寺打了卡沙雕剧</View>
                    <View className='s-price'>￥{item.commission}<Text className='span xs'>最高金额</Text></View>
                    <View className='s-price-box dis-flex'>
                        <View className='num1'>
                            <Text className='iconfont iconzhaoshangjiameng'></Text>
                            {item.join_nums} 家
                        </View>
                        <View className='num1'>
                            <Text className='iconfont iconyanjing'></Text>
                            {item.read} 家
                        </View>
                    </View>
                </View>
            </View>
        )
    })
    return (
        <View>
            {lists}
        </View>
    )
}

BrokerList.propTypes = {
    items: PropTypes.array
}

BrokerList.defaultProps = {
    items: []
}

BrokerList.options = {
    addGlobalClass: true
}
