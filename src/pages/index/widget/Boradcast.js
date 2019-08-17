import {Image, View, Text} from "@tarojs/components";
import {useAsyncEffect, cacheAsyncData} from "@util/index";
import {NoticeBar} from "@com/index";
import PropTypes from "prop-types";
import {useState} from "@tarojs/taro";
import icon from "@img/icon_notic.png"
import {broadcastSearch, shopJoin, happyNews} from "@inc/service";
import './Boradcast.less'

function Boradcast({type = 'comm', args = {}}) {
    const [notices, setNotices] = useState([])
    const broker = type === 'broker';

    useAsyncEffect(async () => {
        let api, cacheKey;
        if (type === 'shop') {
            args.type = type;
            api = shopJoin;
            cacheKey = 'bbsIndex1'
        } else if (broker) {
            api = happyNews;
            cacheKey = 'bbsIndex2'
        } else {
            args.type = 1;
            api = broadcastSearch;
            cacheKey = 'bbsIndex3'
        }
        setNotices(await cacheAsyncData(cacheKey, () => api(args)));
    }, [type]);

    return notices.length > 0 && (
        <View className='boradcast com-box'>
            <View className='dis-flex'>
                <View>
                    <Image className='icon' src={icon} mode='widthFix' />
                    {broker && <Text className='text'>喜报</Text>}
                </View>
                <View className='flex-hide t-box'>
                    <NoticeBar items={notices} />
                    <View className='zhe' ></View>
                </View>
            </View>
        </View>
    )
}

Boradcast.propTypes = {
    type: PropTypes.string,
    args: PropTypes.object,
};

Boradcast.defaultProps = {
    type: 'comm'
};

Boradcast.options = {
    addGlobalClass: true
};

export default Boradcast
