import {View, Image, Text, Button} from '@tarojs/components'
import {AtModal} from 'taro-ui'
import PropTypes from 'prop-types'
import img from '@img/jiuzheng.png'
import {showMsg} from "@util/message";
import {authPhoneFail, authPhoneSuccess, disposeAuth, showAuthPhone} from "@inc/store/auth";
import './Phone.less'

function Phone({isOpened, onClose}) {
    const handlePhone = (e) => {
        console.log('auth: phone');
        disposeAuth(e, 'phone').then((data) => {
            authPhoneSuccess(data);
            showMsg('授权成功')
            showAuthPhone(false);
        }).catch((err) => {
            showMsg("授权失败");
            authPhoneFail();
            console.log('error:', err);
            showAuthPhone(false);
        })
    };
    return (
        <AtModal isOpened={isOpened} onClose={onClose} closeOnClickOverlay>
            <View className='phone-auth text-center'>
                <View className='top'>
                    <View className='t1'>
                        <Image className='logo' src={img} /> 九正招商宝
                    </View>
                    <View className='t2'>家居人最靠谱的招商赚钱神器</View>
                </View>
                <View className='t3'><Text className='text'>九正招商</Text> 申请获取以下权限</View>
                <View className='pdtb-15 c-33'>获取您微信绑定手机号</View>
                <Button className='btn zc-btn' open-type='getPhoneNumber' onGetPhoneNumber={handlePhone}>微信快捷注册</Button>
            </View>
        </AtModal>
    )
}

Phone.propTypes = {
    onClose: PropTypes.func,
    isOpened: PropTypes.bool,
};

Phone.defaultProps = {
    isOpened: false
};

Phone.options = {
    addGlobalClass: true
};

export default Phone
