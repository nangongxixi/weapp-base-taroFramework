import {Image, View, Text} from "@tarojs/components";
import imgWatch from '@img/icon_watch.png';
import {rIndex} from "@inc/router/url";
import PropTypes from "prop-types";
import {goto} from "@inc/router";

import './Lists.less'

function Lists({items = []}) {
    const go = (item) => {
        goto(rIndex.bookDetail, {id: item.id})
    };

    const child = items.map((item) => {
        return (
            <View className='at-row joinMsg-list2' onClick={() => go(item)} key={item.id}>
                <View className='at-col at-col-4'>
                    <View className='pic-box'>
                        <Image className='pic' src={item.logo} mode='aspectFill' />
                  </View>
                </View>
                <View className='at-col at-col-8 at-col--wrap'>
                    <View className='cnt-box'>
                        <View className='title text-overflow'>{item.title}</View>
                        <View className='remark line2-overflow text-overflow'>{item.remark}</View>
                        <View className='at-row date-box'>
                            <View className='at-col at-col-7'>
                                <Text className='d-btn'>加盟攻略</Text>
                            </View>
                            <View className='at-col at-col-5 hits'>
                                <Image className='watch' mode='widthFix' src={imgWatch} />
                                {item.hits}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    });

    return (
        <View>
            {child}
        </View>
    )
}

Lists.propTypes = {
    items: PropTypes.array,
    onClick: PropTypes.func
};

Lists.options = {
    addGlobalClass: true
};

export default Lists;
