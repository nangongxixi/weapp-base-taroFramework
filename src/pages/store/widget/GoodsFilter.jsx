import {View} from "@tarojs/components";
import PropTypes from "prop-types";
import user from "@inc/service/user";
import {useAsyncEffect} from "@util/index";
import {useContext, useEffect, useState} from "@tarojs/taro";
import {AgentCategoryAll, isDefAgentCategory} from "@config/constants";
import {useFilter, useFilterCategory} from "@com/filter";
import SearchBar from "@com/filter/SearchBar";
import {ShopIdContext} from "@inc/store/shop";
import {AtDrawer} from "taro-ui";
import '../../find/widget/FilterBar.less';

const DEF_FILTER = {
    search: '',
    cat: AgentCategoryAll
};

function GoodsFilter({apiArgs, onChange}) {
    console.log('render: GoodsFilter.start()');

    // test context
    const shopId = useContext(ShopIdContext)
    console.log('debug: sub com uid', shopId);

    // filter
    const itemAll = AgentCategoryAll;
    const [filters, changeFilter] = useFilter(DEF_FILTER, onChange, true);
    const [cats, setCats, items] = useFilterCategory(filters.cat, itemAll, 4);

    // init categories
    useAsyncEffect(async () => {
        setCats(
            [itemAll].concat(
                await user.storeGoodsCatTree(
                    {store_id: apiArgs.store_id}
                )
            )
        );
    });

    /**
     * clear items
     */
    // const [clearItems, setClearItems] = useState([]);
    // useEffect(() => {
    //     // make 清除项
    //     let tmp = [];
    //     if (!isDefAgentCategory(filters.cat)) {
    //         tmp.push({
    //             id: 1,
    //             name: filters.cat.name,
    //             onclick: () =>
    //                 changeFilter({cat: itemAll})
    //         });
    //     }
    //     if (filters.search && filters.search.length > 0) {
    //         tmp.push({
    //             id: 3,
    //             name: filters.search,
    //             onclick: () =>
    //                 changeFilter({search: ''})
    //         });
    //     }
    //     setClearItems(tmp);
    // }, [filters]);


    /**
     * items html
     */
    const [show, setShow] = useState(false);
    /**
     * pop html
     * @returns {*}
     */
    const renderPop = () => {
        return (
            <AtDrawer width='90%' show={show} onClose={() => setShow(false)}>
                <View className='pop-box flex-c pdb-50'>
                    <View className='flex-auto'>
                        <View className='n-title'>类别选择</View>
                        <View className='dis-flex industry nm'>
                            {cats.map(item => (
                                <View
                                  key={item.id}
                                  className={`flex-hide ${filters.cat.id === item.id ? 'c-33' : ''}`}
                                  onClick={() => {
                                        changeFilter({cat: item});
                                        setShow(false)
                                    }}
                                >
                                    <View className='text-overflow'>
                                        {item.name}
                                    </View>
                                </View>
                            ))
                            }
                        </View>
                    </View>
                    <View
                      className='close'
                      style='margin:50px 20%; border-radius:5px;'
                      onClick={() => setShow(false)}
                    >
                        完成
                    </View>
                </View>
            </AtDrawer>
        )
    };

    return (
        <View>
            <SearchBar
              searchKey={filters.sk}
              onConfirmSearch={(v) => changeFilter({'search': v})}
            />

            {items.length > 1 &&
                <View
                  className='default-tabs dis-flex m-bg'
                >
                    {items.map(item => (
                        <View
                          key={item.id}
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
            {renderPop()}
        </View>
    )
}

GoodsFilter.propTypes = {
    apiArgs: PropTypes.object,
    onChange: PropTypes.func,
};

GoodsFilter.defaultProps = {
    apiArgs: {},
    onChange: () => {
    },
};

GoodsFilter.options = {
    addGlobalClass: true
};

export default GoodsFilter
