import {View} from '@tarojs/components'
import {goto, rStore} from '@inc/router'
import PropTypes from 'prop-types'
import './GoodsItem.less'

function GoodsItem({items}) {
    const child = items.map(item => {
        return (
            <View
              className='list-item flex-hide'
              onClick={() => goto(rStore.goodsDetail, {id: item.info_id || item.id})}
              key={item.id}
            >
                <View
                  className='logo bg-cov'
                  style={`background-image:url(${item.image})`}
                />
                <View className='title text-overflow'>
                    {item.title}
                </View>
            </View>
        )
    });
    return (
        <View className='dis-flex'>
            {child}
        </View>
    )
}

GoodsItem.options = {
    addGlobalClass: true
};

GoodsItem.propTypes = {
    items: PropTypes.array
};

GoodsItem.defaultProps = {
    items: []
}

export default GoodsItem
