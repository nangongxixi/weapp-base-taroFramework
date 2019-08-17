import {JScrollView, AItemComm} from '@com/index'
import {View} from '@tarojs/components'
import {useRef, useState} from '@tarojs/taro'
import user from '@inc/service/user'

function MineBrand() {
    const arg = useRef({info_type: 'shop'});
    const times = useRef([]);
    const [items, setItems] = useState([]);
    return (
        <View className='flex-c'>
        <JScrollView
          service={user.browseRecord}
          args={arg.current}
          onData={rs => setItems(rs)}
        >
            <View className='hits-list'>
                {
                    items.map((item, index) => {
                        let time = item.cdate.split(' ')[0];
                        let arr = times.current;
                        item.detail = {...item.detail, ...item.detail.data};
                        arr.push(arr.includes(time) ? '' : time);
                        return (
                            <View key={item.detail.id}>
                                {
                                    arr[index] &&
                                    <View className='hits-time'>{time}</View>
                                }
                                <AItemComm info={item.detail} />
                            </View>
                        )
                    })
                }
            </View>
        </JScrollView>
        </View>
    )
}

MineBrand.options = {
    addGlobalClass: true
};

export default MineBrand
