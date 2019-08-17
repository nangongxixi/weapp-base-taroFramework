import {BaseView, JScrollView} from '@com/index'
import {View, Picker, Text} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import {formatTime} from '@util/tool'
import Taro, {useState} from '@tarojs/taro'
import {myFriend, myFanNum} from '@inc/service/broker'
import {useDocumentTitle} from "@inc/index";
import './friend-child.less'

export default function BrokerFriendPage() {
  const uid = this.$router.params.id;
  const [items, setItems] = useState([]);
  const [fan, setFan] = useState({});
  const [date, setDate] = useState(formatTime('', 'ny'));
  const [arg, setArg] = useState({year_month: date, uid: this.$router.params.id});

  useDocumentTitle('好友');

  useAsyncEffect(async () => {
    setArg({year_month: date, uid: uid});
    setFan(await myFanNum({year_month: date, uid: uid}))
  }, [date, uid]);

  const sDate = (e) => {
    setDate(e.detail.value)
  };

  return (
    <BaseView>
        <View className='friend flex-c'>
          <JScrollView
            service={myFriend}
            args={arg}
            onData={rs => setItems(rs)}
          >
            <Picker mode='date' start='2019-05-01' end='2020-09-01' fields='month' onChange={sDate}>
              <View className='month'>{date} <Text className='san' /></View>
              <View className='cnt-txt'>直接粉丝 {fan.direct}，间接粉丝{fan.indirect}人</View>
            </Picker>

            { items.map(item => (
                <View className='list pd-15 dis-flex' key={item.id}>
                  <View className='l-head bg-cov'
                    style={`background-image:url(${item.avatar})`}
                  />
                  <View className='flex-hide c-66 xs'>
                    <View className='nm fwb c-33'>{item.nickname}</View>
                    <View>直接粉丝: {item.direct_fan_nums}人</View>
                    <View>加入时间:{item.cdate}</View>
                  </View>
                </View>
              ))
            }
          </JScrollView>
        </View>
    </BaseView>
  )
}
