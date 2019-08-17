import {View} from '@tarojs/components'
import {go, rStore} from '@inc/router'
import PropTypes from "prop-types";
import './NewsItem.less'

function NewsItem({items}) {
    const child = items.map(item => {
        return (
          <View
            className='news-item com-box dis-flex pd-15'
            onClick={go(rStore.newsDetail, {id: item.id})}
            key={item.id}
          >
                {item.image && <View className='logo bg-cov' style={`background-image:url(${item.image})`} />}
                <View className='flex-hide'>
                    <View className='title line2-overflow'>{item.title}</View>
                    <View className='date xs'>{item.pdate}</View>
                </View>
            </View>
        )
    });

    return (
        <View>
            {child}
        </View>
    )
}

NewsItem.options = {
    addGlobalClass: true
};

NewsItem.propTypes = {
    items: PropTypes.array
};

NewsItem.defaultProps = {
    items: []
};

export default NewsItem
