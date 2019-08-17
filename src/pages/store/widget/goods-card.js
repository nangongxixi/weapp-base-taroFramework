import {View} from '@tarojs/components'
import {goto} from '@inc/router'
import {rStore} from '@inc/router/url'
import PropTypes from "prop-types";

import './goods-card.less'

function GoodsCard({shop}) {
    return (
        <View className='goods-card nm'>
            <View className='top-box dis-flex'>
                <View className='logo bg-con' style={`background-image:url(${shop.logo})`}></View>
                <View className='flex-hide'>
                    <View className='shop_name'>{shop.title}</View>
                    <View className='place'>所在地: {shop.agent.actBrandArea}</View>
                </View>
            </View>
            <View className='at-row'>
                <View className='sub-title'>{shop.agent.labels.actCompactLimit}</View>
                <View className='at-col'>{shop.agent.actCompactLimit}</View>
            </View>
            <View className='at-row'>
                <View className='sub-title'>主营产品：</View>
                <View className='at-col'>{shop.keywords || ''}</View>
            </View>
            <View className='btn' onClick={() => goto(rStore.index, {id: shop.shop_id})}>进店逛逛</View>
        </View>
    )
}

GoodsCard.propTypes = {
    shop: PropTypes.object
};

GoodsCard.defaultProps = {
    shop: {}
};

GoodsCard.options = {
    addGlobalClass: true
};

export default GoodsCard
