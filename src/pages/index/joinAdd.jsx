import {View} from '@tarojs/components';
import Taro from "@tarojs/taro";
import {BaseView, JoinAdd} from '@com/index';
import {joinAddBg} from '@img/images';

export default function JoinAddPage() {
    let {id} = this.$router.params;
    Taro.setNavigationBarTitle({
        title: '加盟咨询'
    });
    return (
            <View className='bg-cov flex-c' style={{overflow: 'scroll', minHeight: '100vh', backgroundImage: `url(${joinAddBg})`}}>
                <JoinAdd shopId={id} hasTxt />
            </View>
    )
}
