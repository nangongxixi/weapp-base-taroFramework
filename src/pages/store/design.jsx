import {BaseView, JScrollView} from '@com/index'
import {View} from '@tarojs/components'
import Taro, {useRef, useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'

import DesignItem from './widget/DesignItem'
import Foot from './widget/foot'
import {storeCasusSearch} from '@inc/service/shop'

export default function StoreDesignPage() {
    let {id} = this.$router.params;
    const arg = useRef({store_id: id});
    const [items, setItems] = useState([]);

    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '企业案例'
        })
    });

    return (
        <BaseView>
            <View className='flex-c pd-15 pdb-50'>
                <JScrollView
                  service={storeCasusSearch}
                  args={arg.current}
                  onData={rs => setItems(rs)}
                >
                    <DesignItem items={items} />
                </JScrollView>
                <Foot current={3} shopId={id} />
            </View>
        </BaseView>
    )
}
