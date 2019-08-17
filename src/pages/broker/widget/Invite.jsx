import {View, Image, Button} from '@tarojs/components'
import {useAsyncEffect} from '@util/index'
import {friend2, broker9} from '@img/images'
import Taro, {useState} from '@tarojs/taro'
import {brokerQrcode} from '@inc/service/broker'

import './Invite.less'

export default function BrokerInvite() {
    const [info, setInfo] = useState({});
    useAsyncEffect(async () => {
        Taro.setNavigationBarTitle({
            title: '邀请好友'
        });
        setInfo(await brokerQrcode())
    });

    return (
        <View className='invite-box' style={`background:url(${friend2}) no-repeat #6387E3; background-size:100%;`}>
            <View className='t1'>邀请好友注册</View>
            <View className='t2'>送20元现金</View>
            <View className='t3'>邀请越多, 奖励越多</View>
            <View className='line'></View>
            <Image className='qrcode' src={info.qrcode} />
            <Image className='pic1' src={broker9} />
            <View className='role-title'>邀请规则&奖励：</View>
            <View className='role-txt'>1.好友成功通过邀请链接注册！</View>
            <View className='role-txt'>2.好友注册后，成功完成一次有效客户报备(需要通过客服审核)</View>
            <View className='role-txt'>3.被邀请的好友将获得20元现金红包奖励！</View>
            <View className='role-txt'>4.每成功邀请一名好友，您将获得20元现金红包！</View>
            <Button className='red-btn' open-type='share'>分享</Button>
        </View>
    )
}

BrokerInvite.options = {
    addGlobalClass: true
};
