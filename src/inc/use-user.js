import {isH5} from '@config'
import {goto} from '@inc/router'
import {rMine, rCom} from '@inc/router/url'
import {useUserStore} from "@inc/store/user";
import {authCode} from "@inc/service/user";
import {useEffect} from "@tarojs/taro";

export const goWeb = async type => {
    let rs = await authCode({type: type});
    goto(rCom.webView, {path: rs})
};

export const useUserLink = () => {
    const {isGuest} = useUserStore();
    return (link, arg) => {
        return () => {
            if (!isGuest) {
                link === 'goWeb' ? goWeb(arg = 'agent') : goto(link, arg)
                return
            }
            if (isH5()) {
                goto(rMine.login)
            } else {
                console.log('手机号授权')
            }
        }
    }
};

/**
 * 判断用户登录
 */
export const useCheckUserLogin = (jmp) => {
    const {isGuest} = useUserStore();

    useEffect(() => {
        if(jmp && isGuest && isH5()){
            goto(rMine.login)
        }
    }, [isGuest, jmp]);

    return isGuest
};
