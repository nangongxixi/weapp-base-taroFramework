import { Store } from 'laco'
import Taro from "@tarojs/taro";
import {makeStore, cacheAsyncData} from "@util/index";
import {isH5} from "@config/index";
import {request} from "@util/request";
import {getShareUid} from "@config/global";

import UserModel from "./userModel";

/**
 * 默认会员信息
 */
const cache = {
    info: null,
    guestInfo: {
        token: "demo",
        uid: 0,
        nickname: '游客',
        isAuthBaseInfo: false,
        isBindPhone: false,
        isHasCard: false,
        isShopUser: false,
        isGuest: true,
        isBroker: false,
        isLoadedUser: false,
    },
    cacheKey: 'g_user_info',
    maxLife : 7200,

    getUserInfo() {
        if(this.info) {
            return this.info
        }

        const cacheInfo = Taro.getStorageSync(this.cacheKey);
        if(!cacheInfo
            || !cacheInfo.info
            || (cacheInfo.info && !cacheInfo.info.token)
            || cacheInfo.expire < (new Date()).getTime()
        ){
            this.info = this.guestInfo;
        } else {
            this.info = cacheInfo.info;
        }

        return this.info;
    },

    clear() {
        this.info = null;
        Taro.removeStorageSync(this.cacheKey);
    },

    setUserInfo(info) {
        Taro.setStorage({
            key : this.cacheKey,
            data: {
                info,
                expire: (new Date()).getTime() + (this.maxLife * 1000)
            }
        })
    }
};

const UserStore = new Store(cache.getUserInfo(), 'UserStore');

/**
 * UserStore
 * @type {function(*=, *=): unknown}
 */
export const useUserStore = makeStore(UserStore);

/**
 * user UserModel
 */
let user;

/**
 * gen user info
 * @param refresh
 * @returns {*|Promise<any>|Promise<any>}
 */
export function getUserAsync(refresh) {
    if (!refresh && user) {
       return Promise.resolve(user);
    }

    return cacheAsyncData('user', function() {
        return requestUserData().then(function(info){
            return saveUser(info);
        })
    }, refresh)
}

export function getUserSync() {
    return user;
}

/**
 * 退出登录
 */
export function logout() {
    user = null;
    cache.clear();
    getUserAsync(true)
}

async function requestUserData() {
    console.log('user: gen code');
    if(isH5()){
        return Promise.resolve(cache.getUserInfo())
    }

    let code = await Taro.login();
    console.log(`user.code:`, code);

    return request('/wxapp/code', {
        code: code.code,
        fromUid: getShareUid()
    }, 'get').then((data) => {
        data.isLoadedUser = true;
        return data
    });
}

export const saveUser = (data) => {
    UserStore.set(
        ({state}) => {
            const info = {...state, ...data};
            normalizeUserInfo(info);
            makeUserModel(info);
            cache.setUserInfo(info);
            return info;
        },
        'Save user'
    );
    return makeUserModel(normalizeUserInfo({...UserStore.get(), ...data}));
};

const normalizeUserInfo = (info) => {
    info.isGuest = parseInt(info.uid) === 0;
    if(info.isGuest) {
        info.nickname = '匿名用户';
    }
    return info;
};

const makeUserModel = (info) => {
    if(!user){
        user = new UserModel(info);
    } else {
        user.set(info)
    }
    return user;
};
