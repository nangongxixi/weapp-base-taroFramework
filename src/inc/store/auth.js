import { Store } from 'laco'
import {makeStore} from "@util/index";
import {getUserAsync} from "@inc/store/user";
import api from "@inc/service/user";
import {isWeApp} from "@config/index";
import {goto} from "@inc/router";

export const AuthStore = new Store({
    showPhone: false,
    showBaseInfo: false,
}, 'AuthStore');

export const useAuthStore = makeStore(AuthStore);

/**
 * @param isShow
 * @param onPhoneSuccess
 */
export const showAuthPhone = (isShow, onPhoneSuccess) => {
    if(!isWeApp()){
        return;
    }
    callback.onPhoneSuccess = onPhoneSuccess;
    // Phone 组件 authStore init, 得到初始化值
    // BaseView 组件 useEffect 执行, set authStore
    // Phone 组件 useEffect 执行, 订阅authStore变化
    AuthStore.set((state) => {
        return {...state, showPhone: isShow};
    }, 'AuthStore.set')
};

// eslint-disable-next-line no-unused-vars
let callback = {};

export const showAuthInfo = (isShow) => {
    if(!isWeApp()){
        return;
    }
    AuthStore.set((state) => {
        return {...state, showBaseInfo: isShow};
    })
};


export const authPhoneSuccess = (data) => {
    callback.complete && callback.complete();
    callback.onPhoneSuccess && callback.onPhoneSuccess(data);
    callback.success && callback.success(data);
    callback = {};
};

export const authPhoneFail = () => {
    callback.complete && callback.complete();
    callback.cancel && callback.cancel();
    callback = {};
};

export const disposeAuth = async function (e, type) {
    let params = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
    };

    let data;
    if (type === 'userInfo') {
        data = await api.accredit(params, 'post')
    } else {
        data = await api.decode(params, 'post')
    }

    getUserAsync(true);
    return data;
};

/**
 * 触发手机验证
 * @param complete
 * @param success
 * @param cancel
 */
export function checkAuthPhone(complete, success, cancel) {
    getUserAsync().then((u) => {
        if (!u.isBindPhone()) {
            callback = {
                complete, success, cancel
            };
            showAuthPhone(true);
        } else {
            success && success();
            complete && complete()
        }
    })
}

/**
 * 跳转到指定页面, 检测手机授权
 * @param page
 * @param args
 * @returns {Function}
 */
export function goChkPhone(page, args) {
    return () => {
        checkAuthPhone(null, () => {
            goto(page, args)
        })
    }
}
