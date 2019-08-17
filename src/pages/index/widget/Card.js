import {View} from "@tarojs/components";
import {useAsyncEffect, cacheAsyncData} from "@util/index";
import {call} from '@util/tool'
import {useState} from "@tarojs/taro";
import {goto} from '@inc/router'
import {rIndex} from '@inc/router/url'
import {housekeeperSearch} from "@inc/service";
import Title from "@com/Title";
import JoinIcon from '../../store/widget/JoinIcon';
import './Card.less';

function Card() {
    //const [v, setV] = useState(0);
    const [info, setInfo] = useState({});

    useAsyncEffect(async () => {
        setInfo(await cacheAsyncData('indexHousekeeper2', () => housekeeperSearch()));
    });

    return (
        <View className='card-box'>
            <Title name='加盟管家 ' hasMore={false} />
            <View className='box'>
                <View className='head-box dis-flex'>
                    <View className='c-head bg-cov' style={`background-image:url(${info.avatar})`} />
                    <View className='r-box flex-hide'>
                        <View className='name'>
                            加盟管家-{info.name}
                        </View>
                        <View className='xs c-99'>
                            九正资深加盟管家，一对一加盟指导
                        </View>
                    </View>
                </View>

                <JoinIcon />

                <View className='c-btn-box dis-flex text-center'>
                    <View className='btn b1 flex-hide' onClick={() => goto(rIndex.joinAdd)}>
                        <View className='iconfont iconxiaoxi' />
                        加盟留言
                    </View>
                    <View className='btn b2 flex-hide' onClick={() => call(info.phone)}>
                        <View className='iconfont icondianhua' />
                        拨打热线
                    </View>
                </View>
            </View>
        </View>
    )
}

Card.options = {
    addGlobalClass: true
};

export default Card
