import {View} from "@tarojs/components";
import {go, rIndex} from "@inc/router";
import PropTypes from 'prop-types';
import './FloatWindow.less';

function FloatWindow({navBar}) {
    return (
        <View>
            {
                !navBar &&
                <View className='float-window'>
                    <View
                      className='list iconfont iconshouye-off'
                      onClick={go(rIndex.index)}
                    />
                </View>
            }
        </View>
    )
}

FloatWindow.propTypes = {
    navBar: PropTypes.bool
};

FloatWindow.defaultProps = {
    navBar: false
};

FloatWindow.options = {
    addGlobalClass: true
};

export default FloatWindow
