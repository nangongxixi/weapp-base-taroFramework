 import {BaseView, JScrollView, AItemComm} from '@com/index'
import {View} from '@tarojs/components'
import Taro, {useState} from '@tarojs/taro'
import {myBrand} from '@inc/service/mine'
import './hits.less'

export default function MineBrandPage() {
    const [items, setItems] = useState([]);
    Taro.setNavigationBarTitle({
        title: '意向品牌'
    });

    return (
        <BaseView>
            <View className='flex-c pd-15'>
                <JScrollView
                  service={myBrand}
                  onData={rs => setItems(rs)}
                >
                    {
                        items.map(item => <AItemComm info={item} key={item.id} />)
                    }
                </JScrollView>
            </View>
        </BaseView>
    )
}
