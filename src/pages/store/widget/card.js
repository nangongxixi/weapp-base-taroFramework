import {View, Text} from '@tarojs/components'
import {useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {goto} from '@inc/router'
import {rIndex} from '@inc/router/url'
import PropTypes from 'prop-types'

import {housekeeperSearch} from '@inc/service'
import JoinIcon from './JoinIcon'
import './card.less'

function StoreCard({detail}) {
    const [steward, setSteward] = useState({});
    useAsyncEffect(async () => {
        setSteward(await housekeeperSearch())
    });

    return (
        <View className='store-guide'>
            <View className='t-warp at-row'>
                <View className='t-right at-col at-col-5'>
                    <View className='bg-con' style={`background-image: url(${detail.logo})`} />
                    <View className='s-num xs'>
                        <View>投资金额 <Text>{detail.agent.actMomey || 0}</Text></View>
                        <View>门店数量 <Text>{detail.store_num || 0}</Text></View>
                    </View>
                </View>
                <View className='s-desc-warp at-col at-col-7'>
                    <View className='s-desc dis-flex'>
                        <View className='bg-cov' style={`background-image: url(${steward.avatar})`} />
                        <View className='flex-hide'>
                            <View className='xs'>一对一加盟指导</View>
                            <View className='xs'>为加盟保驾护航</View>
                        </View>
                    </View>
                    <View className='red-btn' onClick={() => goto(rIndex.joinAdd, {id: detail.shop_id})}>获取加盟指导</View>
                </View>
            </View>
            <JoinIcon />
        </View>
    )
}

StoreCard.propTypes = {
    detail: PropTypes.object
};

StoreCard.defaultProps = {
    detail: {}
};

StoreCard.options = {
    addGlobalClass: true
};

export default StoreCard
