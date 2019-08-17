import {View} from '@tarojs/components'
import {useState} from '@tarojs/taro'
import Title from '@com/Title'
import {useAsyncEffect} from '@util/index'
import {rStore} from '@inc/router/url'
import {GoodsItem} from '@com/index'
import {storeGoods} from '@inc/service/shop'

function Goods({shopId}) {
    const [goods, setGoods] = useState([])
    useAsyncEffect(async () => {
        setGoods(await storeGoods({store_id: shopId}))
    })
    return goods.length > 0 && (
        <View>
            <Title name='产品展示'
              more='更多产品'
              autoMb
              path={rStore.goods}
              args={{id: shopId}}
              pathWay='1'
            />

            <GoodsItem items={goods} />
        </View>
    )
}

Goods.options = {
    addGlobalClass: true
}

export default Goods
