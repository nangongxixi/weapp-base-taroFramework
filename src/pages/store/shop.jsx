import {BaseView, JScrollView, Joins} from '@com/index'
import {View} from '@tarojs/components'
import Taro, {useRef, useState} from '@tarojs/taro'
import Foot from './widget/foot'

import {openShopSearch} from '@inc/service'

export default function StoreShopPage() {
    let {id} = this.$router.params;
    const arg = useRef({shop_id: id});
    const [items, setItems] = useState([]);
    Taro.setNavigationBarTitle({
        title: '开店捷报'
    });

    return (
        <BaseView>
            <View className='flex-c pd-15 pdb-50'>
                <JScrollView
                  service={openShopSearch}
                  args={arg.current}
                  onData={rs => setItems(rs)}
                >
                    <Joins items={items} />
                </JScrollView>
                <Foot current={4} shopId={id} />
            </View>
        </BaseView>
    )
}
