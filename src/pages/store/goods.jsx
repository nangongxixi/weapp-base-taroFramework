import {BaseView, JScrollView, GoodsItem} from '@com/index'
import Taro, {useRef, useState} from '@tarojs/taro'

import {View} from "@tarojs/components";
import {isDefAgentCategory} from "@config/constants";
import user from "@inc/service/user";
import {ShopIdContext} from "@inc/store/shop"
import {useDocumentTitle} from "@inc/use-dom";
import GoodsFilter from "./widget/GoodsFilter";

import Foot from './widget/foot'

const genRequestArgs = (state) => {
    return {
        sk: state.search.length > 0 ? state.search : '',
        cid: isDefAgentCategory(state.cat) ? 0 : state.cat.id,
    }
};

export default function StoreGoodsPage() {
    console.log('render: StoreGoodsPage');
    let { id } = this.$router.params;

    const arg = useRef({ store_id: id });
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState(arg.current);

   useDocumentTitle('产品列表');

    // 用户筛选项改变
    const onFilterChange = (values) => {
        console.log('event: Filter.onChange() ++');
        // 更新请求args, 重新刷新ScrollView
        setFilters({...genRequestArgs(values), ...arg.current});
    };

    return (
        <ShopIdContext.Provider value={id}>
            <BaseView>
                <View className='flex-c pdb-50'>
                    <GoodsFilter apiArgs={arg.current} onChange={onFilterChange} />
                    <JScrollView
                      service={user.storeGoods}
                      args={filters}
                      onData={rs => setItems(rs)}
                    >
                        <View className='box-m' style='padding-top:20px'>
                            <GoodsItem items={items} />
                        </View>
                    </JScrollView>
                    <Foot current={1} shopId={id} />
                </View>
            </BaseView>
        </ShopIdContext.Provider>
    )
}
