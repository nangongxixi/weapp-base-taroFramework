import { View, Button } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import PropTypes from 'prop-types'
import {disposeAuth, showAuthInfo} from "@inc/store/auth";
import {showMsg} from "@util/message";
import './Avatar.less'

function Avatar({isOpened}) {
    const getInfo = (e) => {
        disposeAuth(e, 'userInfo').then(() => {
            showMsg('授权成功')
            showAuthInfo(false);
        }).catch(() => {
            showAuthInfo(false);
        })
    };

    console.log('render:Avatar', isOpened);

    return (
        <AtModal isOpened={isOpened} closeOnClickOverlay={false}>
            <View className='avatar-box'>
                <View className='title'>登录并授权</View>
                <View className='txt'>申请获取以下权限</View>
                <View className='txt'>获取你的公开信息（昵称、头像）</View>
                <Button className='btn' open-type='getUserInfo' onGetuserinfo={getInfo}>允许</Button>
            </View>
        </AtModal>
    )
}

Avatar.propTypes = {
    isOpened: PropTypes.bool,
};

Avatar.defaultProps = {
    isOpened: false,
};

Avatar.options = {
    addGlobalClass: true
};

export default Avatar
