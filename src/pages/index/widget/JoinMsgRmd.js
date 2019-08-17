import {Image, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import {useState} from "@tarojs/taro";
import {useAsyncEffect, cacheAsyncData} from "@util/index";
import {go, rIndex} from "@inc/router";
import Title from "@com/Title";

import {joinSearch} from "@inc/service";
import './JoinMsgRmd.less';

function JoinMsgRmd() {
    const [ items, setItems ] = useState([])

    useAsyncEffect(async () => {
        setItems(await cacheAsyncData('indexJoinMsgRmd2', () => joinSearch()));
    });

    const child = items.map((item) => {
        return (
            <SwiperItem key={item.id}>
                <View className='at-row at-row--wrap joinMsg-list1'>
                    <View className='at-col at-col-2'>
                        <View className='pic-box'>
                            <Image className='pic' src={item.avatar} />
                        </View>
                    </View>
                    <View className='at-col at-col-10'>
                        <View className='cnt-box'>
                            <View className='name'>{item.nickname} <Text className='span'>{item.areaName}</Text></View>
                            <View className='txt'>{item.remark}</View>
                        </View>
                    </View>
                </View>
            </SwiperItem>
        )
    });

    return (
        <View className='index-joinMsg1'>
            <View
              className='dis-flex'
            >
                <View className='flex-hide'>
                    <Title title='最新加盟信息' hasMore={false} />
                </View>
                <View className='red-btn' onClick={go(rIndex.apply)}>我要招商</View>
            </View>
            <View style='position:relative; margin-top: 30px;'>
                <Swiper
                  autoplay circular vertical
                  interval={3000} duration={500}
                  displayMultipleItems={5}
                  style='height:580px;'
                >
                    {child}
                </Swiper>
                <View className='swi-bg' onClick={go(rIndex.login)} />
            </View>
        </View>
    )
}

JoinMsgRmd.options = {
    addGlobalClass: true
};

export default JoinMsgRmd
