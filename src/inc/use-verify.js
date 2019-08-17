import {isH5} from "@config/index";
import {useEffect, useRef, useState} from "@tarojs/taro";
import {clientVerifyReg} from "@inc/service/user";

const loadCache = [];
const isEnvH5 = isH5();

/**
 * 动态加载第三方js文件
 * @param url
 * @param onLoad
 * @param onError
 * @returns {{isLoadJsError: boolean, isLoadJs: boolean}}
 */
export function useScriptLoader(url, onLoad, onError) {
    //const [v, setV] = useState(0);
    const [isLoadJs, setLoad] = useState(false);
    const [isLoadJsError, setLoadError] = useState(false);

    useEffect(async () => {
        console.log('Debug: start loadJs', url);
        if(!isEnvH5){
            return;
        }

        if(loadCache.find((item) => item.url === url)){
            setLoad(true);
            onLoad && onLoad();
            return;
        }

        let script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            loadCache.push({url, status: true});
            setLoad(true);
            onLoad && onLoad();
        };
        script.onerror = () => {
            setLoadError(true);
            onError && onError()
        };

        document.body.appendChild(script);
    }, []);

    return {isLoadJs, isLoadJsError}
}

export function useAliAWAC() {
    const {isLoadJs} = useScriptLoader('//g.alicdn.com/AWSC/AWSC/awsc.js')
    const uabModule = useRef(null);
    const webUmidToken = useRef(null);

    useEffect(() => {
        if(!isLoadJs || !AWSC) {
            return
        }

        console.log('debug: load js', AWSC);
        AWSC.use("uab", function (state, uab) {
            if(state === "loaded") {
                uabModule.current = uab;
            }
        });

        AWSC.use("um", function (state, um) {
            if(state === "loaded") {
                um.init({
                    //appName请直接使用'saf-aliyun-com'
                    appName: 'saf-aliyun-com',
                }, function (initState, result) {
                    if(initState === 'success') {
                        webUmidToken.current = result.tn;
                    }
                });
            }
        });
    }, [isLoadJs]);

    return () => {
        return {
            "webUmidToken": webUmidToken.current,
            "uaToken": uabModule.current
                ? uabModule.current.getUA()
                : ''
        }
    };
}

export function useGeeVerify() {
    const {isLoadJs} = useScriptLoader('//static.geetest.com/static/tools/gt.js');
    const captchaObj = useRef(null);
    const onSuccess = useRef(null);

    useEffect(() => {
        if(!isLoadJs || !initGeetest || !isEnvH5) {
            return
        }

        clientVerifyReg().then((data) => {
            console.log('verify: init gee', data, data.token);
            initGeetest({
                // 以下 4 个配置参数为必须，不能缺少
                gt: data.token.gt,
                challenge: data.token.challenge,
                offline: !data.token.success, // 表示用户后台检测极验服务器是否宕机
                new_captcha: data.token.new_captcha, // 用于宕机时表示是新验证码的宕机
                timeout: '500',
                product: "bind", // 产品形式，包括：float，popup
                width: "300px"
                // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            }, function (co) {
                console.log('verify: init success');
                captchaObj.current = co;
                co.onReady(function () {
                    // do something
                }).onSuccess(function () {
                    const succ = onSuccess.current;
                    if(succ) {
                        succ({
                            status: data.status,
                            ...captchaObj.current.getValidate()
                        })
                    }
                });
            });
        })
    }, [isLoadJs]);

    return {
        verify : (onSucc) => {
            if(!isEnvH5 || !isLoadJs){
                onSucc({})
            } else {
                onSuccess.current = onSucc;
                captchaObj.current.verify()
            }
        }
    }
}
