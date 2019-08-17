import { Joins } from '@com/index'
import Title from '@com/Title'
import { View } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import { useAsyncEffect } from '@util/index'
import { rStore } from '@inc/router/url'
import { openShopSearch } from '@inc/service'

function Banner({ shopId }) {
    const [shop, setShop] = useState([]);

    useAsyncEffect(async () => {
        setShop(await openShopSearch({ shop_id: shopId, nums: 4 }))
    });

    return shop.length > 0 && (
        <View>
            <Title name='开店捷报' more='更多门店' autoMb path={rStore.shop} args={{ id: shopId }} pathWay='1' />
            <Joins items={shop} />
        </View>
    )
}

Banner.options = {
    addGlobalClass: true
};

export default Banner
