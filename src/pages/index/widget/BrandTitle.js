import {View} from "@tarojs/components";
import PropTypes from "prop-types";
import {useState} from "@tarojs/taro";
import {go} from "@inc/router";
import rStore from "@inc/router/url/store";
import {AgentRmds} from "@config/constants";
import {AtIcon} from "taro-ui";
import './BrandTitle.less';

function BrandTitle({active, onClick}) {
    const [activeIndex, setActive] = useState(active);
    return (
        <View className='b-title-warp at-row'>
            <View className='b-title-box at-col at-col-10'>
            {AgentRmds.map((item, index) =>
                <View
                  className={`b-title ${activeIndex === item.id ? 'b-active' : ''}`}
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    onClick(item, index)
                }}
                >
                    {item.name}
                </View>
            )}
            </View>
            <View className='more at-col at-col-2' onClick={go(rStore.find)}>
                更多
                <AtIcon size='15' value='iconfont iconjiantou' />
            </View>
        </View>
    )
}

BrandTitle.propTypes = {
    active: PropTypes.number,
    onClick: PropTypes.func,
};

BrandTitle.defaultProps = {
    active: 0,
    onClick: () => {},
};

BrandTitle.options = {
    addGlobalClass: true
};

export default BrandTitle
