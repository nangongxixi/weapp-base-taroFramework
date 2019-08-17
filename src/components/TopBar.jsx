import {Image, View} from "@tarojs/components";
import {AtNavBar} from "taro-ui";
import home from "@img/foot/f-home.png";
import {go, goto, rIndex} from "@inc/router";
import Taro from "@tarojs/taro";
import jzLogo from '@img/jz-logo.png';
import PropTypes from 'prop-types';
import './TopBar.less';

function TopBar({navBar}) {
    const back = () => {
        if (Taro.getCurrentPages().length === 1) {
            goto(rIndex.index);
        } else {
            Taro.navigateBack({
                delta: 1
            });
        }
    };

    const goHome = () => {
        window.location = 'http://m.jc001.cn';
    };

    return (
        <View>
            {navBar
                ? <View className='jz-top dis-flex'>
                    <View className='dis-flex flex-hide'>
                        <Image onClick={() => goHome()} className='logo' src={jzLogo} mode='widthFix' />
                        <View className='btn fwb nm' onClick={go(rIndex.index)}>招商宝</View>
                    </View>
                    <View className='iconfont iconshouye-off' onClick={() => goHome()} />
                  </View>

                : <View>
                    <AtNavBar
                      color='#000'
                      leftText='返回'
                      border
                      leftIconType='chevron-left'
                      onClickLeftIcon={back}
                    />
                    <Image
                      className='go-index'
                      src={home}
                      onClick={go(rIndex.index)}
                    />
                </View>
            }
        </View>
    )
}

TopBar.propTypes = {
    navBar: PropTypes.bool
};

TopBar.defaultProps = {
    navBar: false
};

TopBar.options = {
    addGlobalClass: true
};

export default TopBar
