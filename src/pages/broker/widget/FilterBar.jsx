import {View} from "@tarojs/components";
import PropTypes from "prop-types";
import {useAsyncEffect} from "@util/index";
import {useContext, useState} from "@tarojs/taro";
import {AgentCategoryAll} from "@config/constants";
import {useFilter, useFilterCategory} from "@com/filter";
import {ShopIdContext} from "@inc/store/shop";
import {shopIndustry} from "@inc/service";
import {AtDrawer} from "taro-ui";
import '../../find/widget/FilterBar.less';

const DEF_FILTER = {
    search: '',
    cat: AgentCategoryAll
};

function BrokerFilter({onChange}) {
    console.log('render: BrokerFilter.start()');

    // test context
    const shopId = useContext(ShopIdContext);
    console.log('debug: sub com uid', shopId);

    // filter
    const itemAll = AgentCategoryAll;
    const [filters, changeFilter] = useFilter(DEF_FILTER, onChange, true);
    const [cats, setCats, items] = useFilterCategory(filters.cat, itemAll, 4);

    // init categories
    useAsyncEffect(async () => {
        setCats([itemAll].concat(await shopIndustry()));
        console.log('hook: Filter-useAsyncEffect.setCats');
    });

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
                <View className='pop-box flex-c'>
                    <View className='flex-auto'>
                        <View className='n-title'>类别选择</View>
                        <View className='dis-flex industry nm'>
                            {
                                cats.map(item => (
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
            {items.length > 1 &&
            <View className='default-tabs dis-flex m-bg'>
                {
                    items.map(item => (
                        <View
                          key={item.id}
                          className={`flex-hide ${filters.cat.id === item.id ? 'c-33' : ''}`}
                          onClick={() => changeFilter({cat: item})}
                        >
                            <View className='text-overflow'>
                                {item.name}
                            </View>
                        </View>
                    ))
                }
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

BrokerFilter.propTypes = {
    apiArgs: PropTypes.object,
    onChange: PropTypes.func,
};

BrokerFilter.defaultProps = {
    apiArgs: {},
    onChange: () => {
    },
};

BrokerFilter.options = {
    addGlobalClass: true
};

export default BrokerFilter
