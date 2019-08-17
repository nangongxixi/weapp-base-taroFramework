import {JScrollView} from '@com/index'
import {View} from '@tarojs/components'
import {useRef, useState} from '@tarojs/taro'
import {goto, rStore} from '@inc/router'
import user from '@inc/service/user'
import '@com/store/GoodsItem.less'
import './Goods.less'

function MineGoods() {
    const arg = useRef({info_type: 'goods'});
    const times = useRef([]);
    const [items, setItems] = useState([]);
    return (
        <View className='flex-c'>
        <JScrollView
          service={user.browseRecord}
          args={arg.current}
          onData={rs => setItems(rs)}
        >
            <View className='hits-list clear'>
                {
                    items.map((item, index) => {
                        let arr = times.current;
                        const time = item.cdate.split(' ')[0];
                        const info = {...item.detail, ...item.detail.data};
                        arr.push(arr.includes(time) ? '' : time);
                        return (
                            <View
                              key={item.detail.id}
                              onClick={() => goto(rStore.goodsDetail, {id: info.info_id})}
                            >
                                {
                                    arr[index] &&
                                    <View className='hits-time float-left w100'
                                      style='padding-left:5px'
                                    >{time}</View>
                                }
                                <View
                                  className='list-item float-left'
                                >
                                    <View
                                      className='logo bg-cov'
                                      style={`background-image:url(${info.logo})`}
                                    />
                                    <View className='title line2-overflow'>
                                        {info.title}
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </JScrollView>
        </View>
    )
}

MineGoods.options = {
    addGlobalClass: true
};

export default MineGoods
