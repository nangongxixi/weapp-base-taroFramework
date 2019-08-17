import {View, Text, OpenData} from '@tarojs/components'
import {useState} from '@tarojs/taro'
import {goto} from '@inc/router'
import {rBroker} from '@inc/router/url'
import {useAsyncEffect} from '@util/index'
import {broker3, broker4, broker5, broker6} from '@img/images'
import avatar from '@img/user1.png'
import {showRegWin, useBroker} from "@inc/store/broker";
import {brokerInfo} from "@inc/service/broker";
import {isH5} from "@config/index";
import './Index.less'

export default function BrokerIndex() {
    const {isBroker, handleBrokerLink} = useBroker();
    const [info, setInfo] = useState({});

    useAsyncEffect(async () => {
        if (isBroker) {
            setInfo(await brokerInfo())
        }
    }, [isBroker]);

    const handleOpen = () => showRegWin();

    return (
        <View className='broker-top'>
            <View className='top-box bg-cov'
              style={`background-image:url(${broker6}); ${!isBroker ? '' : 'height: 26vh'}`}
            >
                <View className='iconfont icongonglve' onClick={handleBrokerLink(rBroker.makeMoney)}>赚钱攻略</View>
                <View className='head bg-cov' style={`background-image:url(${info.avatar || avatar})`}>
                    {
                        !isH5() && !info.avatar &&
                        <OpenData type='userAvatarUrl' />
                    }
                </View>
                {isBroker
                    ? info.id &&
                      <View>
                        <View className='username'>{info.nickname}</View>
                        <View
                          className='level'
                          onClick={() => goto(rBroker.level)}
                        >
                            <Text className='span'>{info.levelName}</Text>
                        </View>
                      </View>
                    :
                      <View className='login-btn' onClick={handleOpen}>注册成为经纪人</View>
                }
            </View>
            <View className='menu-box dis-flex'>
                <View className='flex-hide menu-left'>
                    <View
                      className='bg-cov b-btn1'
                      style={`background-image:url(${broker5})`}
                      onClick={handleBrokerLink(rBroker.friend)}
                    />
                    <View
                      className='bg-cov b-btn1 b-btn2'
                      style={`background-image:url(${broker4})`}
                      onClick={handleBrokerLink('goWeb')}
                    />
                </View>
                <View
                  className='flex-hide bg-cov b-btn3'
                  style={`background-image:url(${broker3})`}
                  onClick={handleBrokerLink(rBroker.recommend)}
                />
            </View>
        </View>
    )
}

BrokerIndex.propTypes = {
};

BrokerIndex.options = {
    addGlobalClass: true
};
