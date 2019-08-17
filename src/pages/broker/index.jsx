import {BaseView, JScrollView} from '@com/index'
import {View} from '@tarojs/components'
import Taro, {useRef, useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {getScrllTop} from "@util/tool";
import {isDefAgentCategory} from '@config/constants'
import BrokerReg from "@com/auth/BrokerReg";
import {shopSearch} from '@inc/service'

import Broker from './widget/Index'
import List from './widget/List'
import Boradcast from '../index/widget/Boradcast'
import FilterBar from './widget/FilterBar'
import './index.less'

const genRequestArgs = (state) => {
    return {
        cid: isDefAgentCategory(state.cat) ? 0 : state.cat.id,
    }
};

export default function BrokerPage() {
    const arg = useRef({broker: 1});
    const top0 = useRef(false);
    const top = useRef(340);
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState(arg.current);
    const [fixed, setFixed] = useState(false);

    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '经纪人'
        });

        getScrllTop('.goods-nav', e => {
            top.current = e;
        });
    });

    const onFilterChange = (values) => {
        console.log('event: Filter.onChange() ++');
        // 更新请求args, 重新刷新ScrollView
        setFilters({...genRequestArgs(values), ...arg.current});
    };

    const onScroll = e => {
        const sct = e.detail.scrollTop > top.current;
        top0.current !== sct && setFixed(sct);
        top0.current = sct;
    };

    return (
        <BaseView navBar>
            <View className='broker flex-c'>
                <JScrollView
                  service={shopSearch}
                  args={filters}
                  onData={rs => setItems(rs)}
                  onScroll={onScroll}
                >
                    <View>
                        <View className='m-bg'>
                            <Broker />
                            <Boradcast type='broker' />
                            <View className='goods-nav'>
                                <View className={fixed ? 'goods-fixed' : ''}>
                                    <FilterBar apiArgs={arg.current} onChange={onFilterChange} />
                                </View>
                            </View>
                        </View>
                        <List items={items} />
                    </View>
                </JScrollView>
              <BrokerReg autoCheck />
            </View>
        </BaseView>
    )
}
