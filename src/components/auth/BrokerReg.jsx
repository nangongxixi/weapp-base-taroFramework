import {View, Image, Button} from '@tarojs/components'
import {AtModal} from 'taro-ui'
import PropTypes from 'prop-types'
import img from '@img/jiuzheng.png'
import {showMsg} from "@util/message";
import { authPhoneSuccess, disposeAuth } from '@inc/store/auth'
import {useUserStore} from "@inc/store/user";
import {hideRegWin, onBrokerSuccess, useBroker} from '@inc/store/broker'
import api from '@inc/service/user'
import {isWeApp} from "@config/index";
import {go, rMine} from "@inc/router";

import './BrokerReg.less'

function BrokerReg({autoCheck, onClose}) {
    const {isBindPhone} = useUserStore();
    const {isOpenRegWin, asyncInitBroker} = useBroker(autoCheck);

    const handlePhone = (e) => {
        disposeAuth(e, 'phone').then((data) => {
            authPhoneSuccess(data);
            showMsg('授权成功');
            regBroker();
            hideRegWin();
        }).catch((err) => {
            showMsg("授权失败");
            console.log('error:', err);
            hideRegWin();
        })
    };

    const regBroker = async () => {
      try {
        await api.brokerMyReg();
        await asyncInitBroker(true);
        onBrokerSuccess();
        hideRegWin();
      } catch (err) {
        console.log(err)
      }
    };

    return (
        <AtModal isOpened={isOpenRegWin} onClose={onClose} closeOnClickOverlay>
            <View className='b-login-auth text-center'>
                <View className='iconfont iconcuowu1' onClick={() => hideRegWin()} />
                <View className='top'>
                    <View className='t1'>
                        <Image className='logo' src={img} /> 九正招商宝
                    </View>
                    <View className='t2'>人脉变钱脉</View>
                    <View className='t2'>每天10分钟，年赚50万！</View>
                </View>
                {isBindPhone
                  ? <Button className='btn zc-btn' onClick={regBroker}>一键加入，开启躺赚模式</Button>
                  : (isWeApp()
                        ? <Button className='btn zc-btn' open-type='getPhoneNumber' onGetPhoneNumber={handlePhone}>一键加入，开启躺赚模式</Button>
                        : <Button className='btn zc-btn' onClick={go(rMine.login)}>一键加入，开启躺赚模式</Button>
                    )
                }
            </View>
        </AtModal>
    )
}

BrokerReg.propTypes = {
    onSuc: PropTypes.func,
    onClose: PropTypes.func,
    autoCheck: PropTypes.bool
};

BrokerReg.defaultProps = {
    autoCheck: false
};

BrokerReg.options = {
    addGlobalClass: true
};

export default BrokerReg
