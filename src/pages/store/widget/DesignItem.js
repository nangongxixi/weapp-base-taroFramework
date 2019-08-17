import {View} from '@tarojs/components'
import {go, rStore} from '@inc/router'
import PropTypes from "prop-types";
import '@com/store/GoodsItem.less'

function DesignItem({items}) {
    const child = items.map(item => {
        return (
            <View className='list-item flex-hide'
              onClick={go(rStore.designDetail, {id: item.id})}
              key={item.id}
            >
                <View
                  className='logo bg-cov'
                  style={`background-image:url(${item.image})`}
                />
                <View
                  className='title text-overflow'
                >{item.title}</View>
            </View>
        )
    });

    return (
        <View className='dis-flex'>
            {child}
        </View>
    )
}

DesignItem.options = {
    addGlobalClass: true
}

DesignItem.propTypes = {
    items: PropTypes.array
}

DesignItem.defaultProps = {
    items: []
}

export default DesignItem
