import {Image, Text, View} from "@tarojs/components";
import PropTypes from "prop-types";
import rStore from "@inc/router/url/store";
import {go} from "@inc/router";

import imgIconR from '@img/icon_R.png'
import imgIconY from '@img/icon_you.png'
import './AItem.less'

export default function AItem({type = 'comm', index = 0, info = {}}) {
    return (
        <View className='agent-item' onClick={go(rStore.join, {id: info.shop_id})}>
        <View className={`box ${index % 2 === 0 ? 'g1':'g2'}`}>
            {type === 'rmd' &&
            <View>
                <Image className='pic' src={info.haibao_image} />

                <View className='title dis-flex'>
                    <View className='title-txt text-overflow'>{info.title}</View>
                    {
                        info.type === '1' &&
                        <Image className='icon icon1' src={imgIconR} mode='widthFix' />
                    }
                </View>

                <View className='price'>
                    投资预算
                    <Text>{info.budget}</Text>
                </View>

                <View className='hot'>
                    <Text className='iconfont iconhuo' />
                    <Text>{info.read}人感兴趣</Text>
                </View>

                <View className='you you-t'>优选</View>
                <Image className='you' mode='widthFix' src={imgIconY} />
            </View>
            }

            {type === 'top' &&
            <View>
                <Image className='pic' src={info.haibao_image} />
            </View>
            }
        </View>
        </View>
    );
}

AItem.propTypes = {
    type: PropTypes.string,
    index: PropTypes.number,
    info: PropTypes.object,
};

AItem.options = {
    addGlobalClass: true
};
