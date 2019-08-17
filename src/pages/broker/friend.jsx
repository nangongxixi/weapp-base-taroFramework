import {BaseView, JScrollView} from '@com/index'
import {AtTabs, AtTabsPane} from 'taro-ui'
import {View, Picker, Text} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import {formatTime} from '@util/tool'
import Taro, {useRef, useState} from '@tarojs/taro'
import {friend3} from '@img/images';
import {shareMessage} from "@inc/share";
import {myFriend, myFanNum, brokerInfo} from '@inc/service/broker'
import {rBroker} from "@inc/router/url";

import Invite from './widget/Invite'
import './friend.less'
import { go } from '@inc/router'


export default function BrokerFriendPage() {
    const tabList = [{title: '邀请好友'}, {title: '我的好友'}];
    const [current, setCurrent] = useState(0);
    const info = useRef({});
    const [items, setItems] = useState([]);
    const [fan, setFan] = useState({});
    const [date, setDate] = useState(formatTime('', 'ny'));
    const arg = useRef({year_month: date});

    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '邀请好友'
        });
        info.current = await brokerInfo();
    });
    useAsyncEffect(async () => {
        arg.current = {year_month: date};
        setFan(await myFanNum({year_month: date}))
    }, [date]);
    const sDate = (e) => {
      setDate(e.detail.value)
    }
    this.onShareAppMessage = () => {
        const share = shareMessage(info.current.nickname + '邀请您来赚外快，每天花10分钟每年赚10万，立即注册', friend3, rBroker.login);
        return share;
    };
    return (
        <BaseView>
            <AtTabs current={current} tabList={tabList} onClick={setCurrent}>
                <AtTabsPane current={current} index={0}>
                    <Invite />
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    <View className='friend flex-c'>
                        <JScrollView
                          service={myFriend}
                          args={arg.current}
                          onData={rs => setItems(rs)}
                        >
                            <Picker mode="date" start="2019-05-01" end="2020-09-01" fields="month" onChange={sDate}>
                              <view class="month">{date} <span class="san"></span></view>
                              <view class="cnt-txt">直接粉丝 {fan.direct}，间接粉丝{fan.indirect}人</view>
                            </Picker>
                            {
                                items.map(item => (
                                    <View className='list pd-15 dis-flex' key={item.id} onClick={go(rBroker.friendChild, {id: item.uid})}>
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
                </AtTabsPane>
            </AtTabs>
        </BaseView>
    )
}
