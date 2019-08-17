import {Image, Text, View} from "@tarojs/components";
import PropTypes from "prop-types";
import rStore from "@inc/router/url/store";
import {go} from "@inc/router";

import imgIconR from '@img/icon_R.png'
import './AItemComm.less'

export default function AItemComm({info}) {
    return (
        <View
          className='brand-list1 dis-flex'
          onClick={go(rStore.join, {id: info.shop_id || info.info_id})}
        >
            <View className='pic bg-cov' style={`background-image:url(${info.haibao_image || info.logo})`} />

            <View className='cnt-box flex-hide'>
                <View className='title dis-flex'>
                    <View className='title-txt text-overflow'>{info.title}</View>
                    {
                        info.type === '1' &&
                        <Image className='icon icon1' src={imgIconR} mode='widthFix' />
                    }
                </View>

                <View className='txt text-overflow'>
                    {info.desc}
                </View>

                <View className='price'>
                    投资预算
                    <Text className='span'>{info.budget}</Text>
                </View>

                <View className='hot'>
                    <Text className='iconfont iconhuo' />
                    <Text className='span'>{info.read}人感兴趣</Text>
                </View>
            </View>
        </View>
    );
}

AItemComm.propTypes = {
    info: PropTypes.object,
};

AItemComm.defaultProps = {
    info: {}
};

AItemComm.options = {
    addGlobalClass: true
};
