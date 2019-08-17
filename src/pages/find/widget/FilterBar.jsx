import {View} from "@tarojs/components";
import PropTypes from "prop-types";
import {useEffect, useState} from "@tarojs/taro";
import {useAsyncEffect} from "@util/index";
import {AtDrawer} from "taro-ui";
import {AgentCategoryAll, isDefAgentCategory, usePrices} from "@config/constants";
import {DEF_FILTER} from "@inc/store/category";

import {useFilter, useFilterCategory, useHistory} from "@com/filter";
import SearchBar from "@com/filter/SearchBar";
import Clear from "@com/filter/Clear";
import {shopIndustry} from "@inc/service";
import './FilterBar.less';

/**
 * | items = [all, current, cat1, cat2] | more |
 * ----------------
 * | items |
 * | more  |
 *
 * 组件
 *  1. 内部状态变化的管理
 *  2. 用户操作, 触发on事件函数, 通知外部的变化
 *  3. 初始化状态
 *      1. 不触发on通知事件, 避免渲染循环, onChange引起父组件属性更新引起再次渲染组件
 *      2. 触发
 *
 * @returns {*}
 * @constructor
 */
function FilterBar({values, onChange, urlIndex}) {
    console.log('render: Filter');

    const itemAll = AgentCategoryAll;
    const prices = usePrices();

    const [filters, changeFilter] = useFilter(values, onChange, true);
    const [cats, setCats, items] = useFilterCategory(filters.cat, itemAll, 4);

    useAsyncEffect(async () => {
        const res = await shopIndustry();
        setCats([itemAll].concat(res));
        if (urlIndex) {
            changeFilter({cat: res[urlIndex]})
        }
    }, [urlIndex]);

    const [clearItems, setClearItems] = useState([]);
    useEffect(() => {
        // make 清除项
        let tmp = [];
        if (!isDefAgentCategory(filters.cat)) {
            tmp.push({
                id: 1,
                name: filters.cat.name,
                onclick: () =>
                    changeFilter({cat: itemAll})
            });
        }
        if (filters.price > -1) {
            console.log('filter', filters.price);
            tmp.push({
                id: 2,
                name: prices.getName(filters.price),
                onclick: () =>
                    changeFilter({price: -1})
            });
        }
        if (filters.search && filters.search.length > 0) {
            tmp.push({
                id: 3,
                name: filters.search,
                onclick: () =>
                    changeFilter({search: ''})
            });
        }
        setClearItems(tmp);
        console.log('hook: Filter-useEffect.setClearItems', tmp);
    }, [filters]);

    /**
     * itemsHtml
     */
    const [show, setShow] = useState(false);

    /**
     * pop html
     * @returns {*}
     */
     // eslint-disable-next-line react/no-multi-comp
    const renderPop = () => {
        const handlePrice = (item) => changeFilter({price: item.id});

        const pricesChild = prices.map((item) => {
          const className = `text-overflow ${filters.price === item.id
            ? 'current'
            : ''}`;
          return (
            <View key={item.id} className='at-col-3' onClick={() => handlePrice(item)}>
              <View className={className}>{item.name}</View>
            </View>
          )
        });

        return (
            <AtDrawer width='90%' show={show} onClose={() => setShow(false)}>
                <View className='pop-box flex-c'>
                    <View className='flex-auto'>
                        <View className='n-title'>行业选择</View>
                        <View className='dis-flex industry nm'>
                            {cats.map((item) => (
                                <View key={item.id}
                                  className={`flex-hide ${filters.cat.id === item.id ? 'c-33' : ''}`}
                                  onClick={() => changeFilter({cat: item})}
                                >
                                    <View className='text-overflow'>
                                        {item.name}
                                    </View>
                                </View>
                            ))}
                        </View>
                        <View className='n-title'>投资预算</View>
                        <View className='at-row budget at-row--wrap'>
                            {pricesChild}
                        </View>
                    </View>
                    <View
                      className='close'
                      onClick={() => setShow(false)}
                    >
                        完成
                    </View>
                </View>
            </AtDrawer>
        )
    };

    const {addHistory} = useHistory();
    const handleSearch = (v) => {
        addHistory(v);
        changeFilter({'search': v});
    };

    return (
        <View className='m-bg'>
            <SearchBar
              searchKey={filters.search}
              onConfirmSearch={handleSearch}
            />

            {items.length > 1 &&
            <View className='default-tabs dis-flex'>
                {items.map((item) => (
                    <View key={item.id}
                      className={`flex-hide ${filters.cat.id === item.id ? 'c-33' : ''}`}
                      onClick={() => changeFilter({cat: item})}
                    >
                        <View className='text-overflow'>
                            {item.name}
                        </View>
                    </View>
                ))}
                <View
                  className='iconfont iconicon_jiantoud'
                  onClick={() => setShow(true)}
                />
            </View>
            }

            <Clear
              clearItems={clearItems}
              onReset={() => changeFilter(DEF_FILTER)}
            />

            {renderPop()}
        </View>
    )
}

FilterBar.propTypes = {
    values: PropTypes.object,
    onChange: PropTypes.func,
    urlIndex: PropTypes.string
};

FilterBar.defaultProps = {
    values: DEF_FILTER,
    onChange: () => {
    },
};

FilterBar.options = {
    addGlobalClass: true
};

export default FilterBar
