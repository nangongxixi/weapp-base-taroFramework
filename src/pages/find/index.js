import {useAgentFilterStore, setFilter} from "@inc/store/category";
import {AgentList, BaseView, JScrollView} from "@com/index";
import {isDefAgentCategory} from "@config/constants";
import {View} from "@tarojs/components";
import {useFilterNormalize} from "@com/filter";
import { useState } from '@tarojs/taro'
import {shopSearch} from "@inc/service";
import {log} from "@util/index";

import FilterBar from "./widget/FilterBar";

const genRequestArgs = (state) => {
    return {
        sk: state.search.length > 0 ? state.search : '',
        cid: isDefAgentCategory(state.cat) ? 0 : state.cat.id,
        price: state.price !== -1 ? state.price : 0,
    }
};

function IndexPage() {
    console.log('render: IndexPage');
    let {_index} = this.$router.params;
    const [items, setItems] = useState([]);

    const filterStore = useAgentFilterStore();
    // 格式化store数据用于请求api搜索
    const [params] = useFilterNormalize(filterStore, genRequestArgs, true);

    // 用户筛选项改变
    const onFilterChange = (values) => {
        log('event: findIndex.Filter.onChange()', values);
        // 设置store搜索全局状态
        setFilter(values);
    };

    const handleOnItems = (rs) => {
        setItems(rs);
    };

    return (
        <BaseView navBar>
            <View className='flex-c'>
                <FilterBar values={filterStore} onChange={onFilterChange}  urlIndex={_index} />
                {params &&
                    <JScrollView
                      service={shopSearch}
                      args={params}
                      onData={handleOnItems}
                    >
                        <View className='pd-15'>
                            <AgentList items={items} />
                        </View>
                    </JScrollView>
                }
            </View>
        </BaseView>
    );
}

IndexPage.options = {
    addGlobalClass: true
};

export default IndexPage;
