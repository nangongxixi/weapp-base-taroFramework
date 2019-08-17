import {Button, Form, View} from '@tarojs/components'
import {useEffect} from "@tarojs/taro";
import {getUserAsync} from "@inc/store/user";
import {useCheckUserLogin} from "@inc/use-user";
import {isH5, isWeApp} from '@config'
import TopBar from "@com/TopBar";
import FloatWindow from '@com/FloatWindow';
import PropTypes from "prop-types";
import Auth from "@com/auth/Auth";
import {comFormid} from '@inc/service/user'
import './BaseView.less'

function BaseView(props) {
    console.log('render:com.BaseView');
    useCheckUserLogin(props.chkUser); // h5会员验证

    useEffect(() => {
        // 初始化会员信息
        getUserAsync();
    }, []);

    const sendFormId = async (e) => {
        await comFormid({formid: e.detail.formId})
    };

    return (
        <View className='main-box' style={isH5() && props.navBar ? 'height:calc(100vh - 53px)' : ''}>
            {isH5()
                ? <TopBar navBar={props.navBar} />
                : <FloatWindow navBar={props.navBar} />
            }

            {isWeApp()
                ? <Form onSubmit={sendFormId} report-submit='true' className='catchForm'>
                    <Button className='catchBtn' capture-bind='' formType='submit'>
                        <View className='form-sub-box'>
                            {props.children}
                        </View>
                    </Button>
                  </Form>
                : <View className='flex-auto'>{props.children}</View>
            }
            <Auth checkPhone={props.checkPhone} checkAvatar={props.checkAvatar} />
        </View>
    )
}

BaseView.propTypes = {
    chkUser: PropTypes.bool,
    navBar: PropTypes.bool,
    children: PropTypes.object,
    isOpened: PropTypes.bool,
    checkPhone: PropTypes.bool,
    checkAvatar: PropTypes.bool,
};

BaseView.defaultProps = {
    chkUser: false, // h5端检测
    checkPhone: false,
    checkAvatar: true,
};

BaseView.options = {
    addGlobalClass: true
};

export default BaseView;
