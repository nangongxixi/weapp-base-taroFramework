import {BaseView, JScrollView} from '@com/index'
import Lists from '@com/news/Lists'
import Taro, {useState} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {newsSearch} from '@inc/service'


export default function IndexBookPage() {
    const [items, setItems] = useState([]);
    Taro.setNavigationBarTitle({
        title: '加盟宝典'
    });

    return (
        <BaseView>
            <View className='flex-c pd-15'>
                <JScrollView
                  service={newsSearch}
                  onData={(rs) => setItems(rs)}
                >
                    <Lists items={items} />
                </JScrollView>
            </View>
        </BaseView>
    )
}
