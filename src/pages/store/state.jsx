import {BaseView, Rich} from '@com/index'
import {AtTabs, AtTabsPane} from 'taro-ui'
import {View} from '@tarojs/components'
import Taro, {useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {go, rStore} from '@inc/router'

import {marketStoreInfo, storeCertSearch, storeAlbumSearch} from '@inc/service/shop'
import './state.less'

export default function StoreStatePage() {
    let {id} = this.$router.params;
    const tabList = [{title: '品牌介绍'}, {title: '荣誉证书'}, {title: '品牌相册'}];
    const [current, setCurrent] = useState(0);
    const [info, setInfo] = useState({});
    const [cert, setCert] = useState([]);
    const [imgs, setImgs] = useState([]);

    Taro.setNavigationBarTitle({
        title: '品牌介绍'
    });
    useAsyncEffect(async () => {
        setInfo(await marketStoreInfo({id: id, detail: 1}));
        setCert(await storeCertSearch({store_id: id}));
        getImgs()
    }, [id]);

    const getImgs = async () => {
        let res = await storeAlbumSearch({store_id: id});
        res = res.map(item => {
            return item.url
        });
        setImgs(res)
    };

    const imgView = item => {
        Taro.previewImage({
            current: item,
            urls: imgs
        })
    };

    return (
        <BaseView>
            <AtTabs current={current} tabList={tabList} onClick={setCurrent}>
                <AtTabsPane current={current} index={0}>
                    <View className='pd-15'>
                        <Rich content={info.content} />
                    </View>
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    <View className='state-box text-center at-row at-row--wrap'>
                        {
                            cert.map(item => {
                                return (
                                    <View className='state-item at-col at-col-6'
                                      key={item.id}
                                      onClick={go(rStore.stateDetail, {id: item.id})}
                                    >
                                        <View className='bg-cov'
                                          style={`background-image:url(${item.image})`}
                                        />
                                        <View className='text-overflow xs'>{item.title}</View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </AtTabsPane>
                <AtTabsPane current={current} index={2}>
                    <View className='state-box text-center at-row at-row--wrap'>
                        {
                            imgs.map(item => {
                                return (
                                    <View className='state-item at-col at-col-6' onClick={() => imgView(item)}
                                      key={item.id}
                                    >
                                        <View className='bg-cov' style={`background-image:url(${item})`} />
                                    </View>
                                )
                            })
                        }
                    </View>
                </AtTabsPane>
            </AtTabs>
        </BaseView>
    )
}
