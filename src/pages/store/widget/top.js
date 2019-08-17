import {View, Text, Button} from '@tarojs/components'
import {useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {useUserStore} from '@inc/store/user'
import {isH5} from '@config'
import PropTypes from 'prop-types'

import {isFav, favAdd, favDel, joinCount} from '@inc/service/shop'
import './top.less'

function StoreTop({detail}) {
    const {isGuest} = useUserStore();
    const [count, setCount] = useState(0);
    const [isCollect, setIsColl] = useState(false);
    useAsyncEffect(async () => {
        let id = detail.shop_id;
        setCount(await joinCount({shop_id: id, type: 1}));
        !isGuest && setIsColl(await isFav({type: 'store', info_id: id}))
    });
    const favOpe = async () => {
        let [fav, d, args] = [isCollect, detail, {type: 'store', info_id: detail.shop_id}];
        if (!fav) {
            args.title = d.title;
            args.image = d.logo
        }
        setIsColl(await (fav ? favDel(args) : favAdd(args)));
        setCount(fav ? count - 1 : count + 1)
    };
    return (
        <View className='store-top'>
            <View className='s-bg bg-cov' style={{backgroundImage: `url(${detail.store_image})`}} />
            <View className='bg-box'>
                <View className='dis-flex'>
                    <View className='s-logo bg-con' style={{backgroundImage: `url(${detail.logo})`}} />
                    <View className='s-info flex-hide'>
                        <View className='xl text-overflow'>{detail.title}</View>
                        <View className='xs text-overflow'>
                            {count || 0}人收藏
                            {!isGuest &&
                                <Text className='collect-btn' onClick={favOpe}>{isCollect ? '已' : '+'}收藏</Text>
                            }
                        </View>
                    </View>
                    {
                        !isH5() &&
                        <Button className='iconfont iconfenxiang share-btn' open-type='share' />
                    }
                </View>
                <View className='s-img text-center bg-cov' style={{backgroundImage: `url(${detail.banner})`}} />
            </View>
            <View className='s-jb' />
        </View>
    )
}

StoreTop.propTypes = {
    detail: PropTypes.object
};

StoreTop.defaultProps = {
    detail: {}
};

StoreTop.options = {
    addGlobalClass: true
};

export default StoreTop
