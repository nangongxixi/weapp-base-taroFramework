import {View} from "@tarojs/components";
import PropTypes from "prop-types";
import {useEffect} from "@tarojs/taro";
import {isWeApp} from "@config/index";
import {showAuthInfo, showAuthPhone, useAuthStore} from "@inc/store/auth";
import {useUserStore} from "@inc/store/user";
import Phone from "@com/auth/Phone";
import Avatar from "@com/auth/Avatar";
//import {useState} from "@tarojs/taro";
// import './Auth.less';

function Auth({checkPhone, checkAvatar}) {
    //const [v, setV] = useState(0);
    const {isAuthBaseInfo, isBindPhone, isLoadedUser} = useUserStore();
    const {showBaseInfo, showPhone} = useAuthStore();

    useEffect(() => {
        if(!isLoadedUser || !isWeApp()){
            // 会员信息未加载
            // 非微信小程序不显示弹窗
            return;
        }
        // 授权弹窗
        //if(!isBindPhone && props.checkPhone) {
        if(!isBindPhone && checkPhone) { // for debug
            showAuthPhone(true, (phone) => {
                console.log('debug: auth phone', phone);
            });
        }
        if(!isAuthBaseInfo && checkAvatar) {
            showAuthInfo(true);
        }
    }, [isLoadedUser, isAuthBaseInfo, isBindPhone, checkAvatar, checkPhone]);

    return (
        <View>
            {isWeApp() && <Phone isOpened={showPhone} />}
            {isWeApp() && <Avatar isOpened={showBaseInfo} />}
        </View>
    )
}


Auth.propTypes = {
    checkPhone: PropTypes.bool,
    checkAvatar: PropTypes.bool,
};

Auth.defaultProps = {
    checkPhone: false,
    checkAvatar: true,
};

Auth.options = {
    addGlobalClass: true
};

export default Auth
