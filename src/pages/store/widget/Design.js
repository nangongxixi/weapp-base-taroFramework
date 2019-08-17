import {View} from '@tarojs/components'
import {useState} from '@tarojs/taro'
import Title from '@com/Title'
import {useAsyncEffect} from '@util/index'
import {rStore} from '@inc/router/url'
import PropTypes from 'prop-types'
import DesignItem from './DesignItem'
import {storeCasusSearch} from '@inc/service/shop'

function Design({shopId}) {
    const [design, setDesign] = useState([])
    useAsyncEffect(async () => {
        setDesign(await storeCasusSearch({store_id: shopId}))
    })
    return design.length > 0 && (
        <View>
            <Title name='案例展示' more='更多案例' autoMb path={rStore.design} args={{id: shopId}} pathWay='1' />
            <DesignItem items={design} />
        </View>
    )
}

Design.propTypes = {
    shopId: PropTypes.string
}

Design.options = {
    addGlobalClass: true
}

export default Design
