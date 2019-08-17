import {BaseView} from '@com/index'
import SearchBar from "@com/filter/SearchBar";
import {View} from '@tarojs/components'
import {useAgentFilterStore, setFilter} from '@inc/store/category'
import {goto} from '@inc/router'
import {rStore} from '@inc/router/url'
import {useDocumentTitle} from "@inc/use-dom";
import {useHistory} from "@com/filter";

import Menu from './widget/Menu'
import FilterBar from './widget/FilterBar'
import './search.less'


export default function SearchPage() {
    const filters = useAgentFilterStore();
    const {history, addHistory} = useHistory();
    useDocumentTitle('品牌搜索');

    const onFilterChange = (values, clear) => {
        setFilter(values, true);
        addHistory(values.search);
        !clear && goto(rStore.find);
    };

    const historyItems = history && history.map((item, idx) => {
        return (
            <View className='at-col at-col-3'
              key={idx}
              onClick={() => onFilterChange({'search': item})}
            >
                <View className='history-item'>{item}</View>
            </View>
        )
    });

    return (
        <BaseView>
            <View className='search-index'>
                <View className='pd-15 search'>
                    <SearchBar
                      searchKey={filters.search}
                      onConfirmSearch={(v, clear) => onFilterChange({'search': v}, clear)}
                    />
                    {history.length > 0 && <View className='title'>搜索历史</View>}
                    {history.length > 0 && <View className='history-box at-row at-row--wrap'>{historyItems}</View>}
                    <View className='title'>快捷搜索</View>
                    <FilterBar />
                </View>
                <Menu showAll />
            </View>
        </BaseView>
    )
}
