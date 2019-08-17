import {View} from '@tarojs/components'
import {useState} from '@tarojs/taro'
import Title from '@com/Title'
import {useAsyncEffect} from '@util/index'
import {rStore} from '@inc/router/url'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import {storeNewsSearch} from '@inc/service/shop'

function StoreNews({shopId}) {
    const [news, setNews] = useState([])
    useAsyncEffect(async () => {
        setNews(await storeNewsSearch({store_id: shopId, nums: 4}))
    })
    return news.length > 0 && (
        <View>
            <Title name='企业新闻' more='更多新闻' autoMb path={rStore.news} args={{id: shopId}} />
            <NewsItem items={news} />
        </View>
    )
}

StoreNews.propTypes = {
    shopId: PropTypes.string
}

StoreNews.options = {
    addGlobalClass: true
}

export default StoreNews
