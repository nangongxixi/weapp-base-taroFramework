import {BaseView, JScrollView} from '@com/index'
import {View} from '@tarojs/components'
import Taro, {useRef, useState} from '@tarojs/taro'
import {storeNewsSearch} from '@inc/service/shop'
import {useDocumentTitle} from "@inc/use-dom";
import NewsItem from './widget/NewsItem'

export default function StoreDesignPage() {
    let {id} = this.$router.params;
    const arg = useRef({store_id: id});
    const [items, setItems] = useState([]);

    useDocumentTitle('品牌新闻');

    return (
        <BaseView>
            <View className='flex-c'>
                <JScrollView
                  service={storeNewsSearch}
                  args={arg.current}
                  onData={rs => setItems(rs)}
                >
                    <View className='pd-15'>
                        <NewsItem items={items} />
                    </View>
                </JScrollView>
            </View>
        </BaseView>
    )
}
