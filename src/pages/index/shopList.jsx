import {BaseView, JScrollView, Joins} from '@com/index'
import {View} from '@tarojs/components'
import Taro, {useState} from '@tarojs/taro'

import {openShopSearch} from '@inc/service'

export default function ShopListPage() {
    const [items, setItems] = useState([]);
    Taro.setNavigationBarTitle({
        title: '开店捷报'
    });

    return (
        <BaseView>
            <View className='flex-c pd-15'>
                <JScrollView
                  service={openShopSearch}
                  onData={rs => setItems(rs)}
                >
                    <Joins items={items} />
                </JScrollView>
            </View>
        </BaseView>
    )
}
