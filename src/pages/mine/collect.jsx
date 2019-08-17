import {BaseView, JScrollView, AItemComm, GoodsItem} from '@com/index'
import {AtTabs, AtTabsPane} from 'taro-ui'
import {View} from '@tarojs/components'
import Taro, {useRef, useState} from '@tarojs/taro'
import {favList} from '@inc/service/mine'
import './hits.less'

export default function MineCollectPage() {
    const tabList = [{title: '招商项目'}, {title: '产品信息'}];
    const [current, setCurrent] = useState(0);
    const arg1 = useRef({type: 'store'});
    const arg2 = useRef({type: 'goods'});
    const [items1, setItems1] = useState([]);
    const [items2, setItems2] = useState([]);
    Taro.setNavigationBarTitle({
        title: '我的收藏'
    });

    return (
        <BaseView>
            <AtTabs current={current} tabList={tabList} onClick={setCurrent}>
                <AtTabsPane current={current} index={0}>
                    <View className='flex-c'>
                    <JScrollView
                      service={favList}
                      args={arg1.current}
                      onData={rs => setItems1(rs)}
                    >
                        <View className='pd-15'>
                            {
                                items1.map(item => {
                                    item.logo = item.image;
                                    return (
                                        <AItemComm info={item} key={item.id} />
                                    )
                                })
                            }
                        </View>
                    </JScrollView>
                    </View>
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    <View className='flex-c'>
                    <JScrollView
                      service={favList}
                      args={arg2.current}
                      onData={rs => setItems2(rs)}
                    >
                        <View className='pd-15'>
                            {<GoodsItem items={items2} />}
                        </View>
                    </JScrollView>
                    </View>
                </AtTabsPane>
            </AtTabs>
        </BaseView>
    )
}
