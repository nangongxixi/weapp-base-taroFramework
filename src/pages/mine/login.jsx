import { BaseView } from '@com/index'
import { AtButton } from 'taro-ui'
import Taro, {useState} from '@tarojs/taro'
import {View, Image, Form, Input, Button, Text} from '@tarojs/components'
import { vailPhone } from '@util/tool'
import {useInputValue} from "@inc/use-form";
import {showMsg} from "@util/message";
import {loginSubmit, sendSmsCode} from "@inc/service/user";
import {saveUser, useUserStore} from "@inc/store/user";
import {isH5} from "@config/index";
import img from '@img/mine2.png'
import {useGeeVerify} from "@inc/use-verify";

import Counter from "./widget/Counter";
import './login.less'

const isEnvH5 = isH5();

export default function LoginPage() {
    console.log('render: LoginPage');
    const phone = useInputValue('');
    const code = useInputValue('');
    const [inputPhoneDisabled, setDisabled] = useState(false)
    const [start, setStart] = useState(false);

    useUserStore(); // 不能删除

    Taro.setNavigationBarTitle({
        title: '用户登录'
    });

    /**
     * 防刷新安全验证
     * @type {Function}
     */
    const {verify} = useGeeVerify();

    /**
     * 发送验证码
     */
    const sendCode = () => {
        if (vailPhone(phone.value)) {
            verify((geeParams) => {
                sendSmsCode({
                    ...geeParams,
                    phone: phone.value
                }).then(() => {
                    showMsg('验证码发送成功, 请注意查收！')
                    setDisabled(true);
                    setStart(true);
                }).catch((e) => {
                    showMsg(e.message);
                    setDisabled(false);
                })
            })
        } else {
            phone.setFocus(true);
            showMsg('请输入正确手机号！')
        }
    };


    /**
     * 登录
     * @param e
     */
    const goLogin = e => {
        const form = e.detail.value;
        if (form.phone && form.code) {
            loginSubmit({
                phone: phone.value,
                phone_code: code.value
            }).then((rs) => {
                saveUser(rs);
                showMsg('登录成功')
                Taro.navigateBack({
                    delta: 1
                })
            }).catch((error) => {
                showMsg(error.message);
                setDisabled(true);
            })
        } else {
            showMsg('请输入正确的手机号和验证码！')
        }
    };

    return (
        <BaseView>
            <View className='login nm'>
                <Form onSubmit={goLogin}>
                    <Image className='logo' src={img} />
                    <View className='title fwb text-center'>用户登录</View>
                    <View className='m-input dis-flex'>
                        <View className='iconfont iconshouji c-99' />
                        <View className='flex-hide'>
                            <Input
                              name='phone'
                              type='number'
                              placeholder='请输入手机号'
                              value={phone.value}
                              onchange={phone.onChange}
                              focus={phone.focus}
                            />
                        </View>
                    </View>
                    <View className='m-input dis-flex'>
                        <View className='iconfont iconyanzhengma c-99' />
                        <View className='flex-hide'>
                            <Input
                              name='code'
                              placeholder='请输入验证码'
                              value={code.value}
                              onchange={code.onChange}
                            />
                        </View>
                        <AtButton
                          className='code-btn'
                          type='primary'
                          size='small'
                          disabled={inputPhoneDisabled}
                          onClick={sendCode}
                        >
                            {!start
                                ? '发送验证码'
                                : <Text>
                                    <Counter
                                      start={start}
                                      onFinish={() => {
                                        setStart(false)
                                        setDisabled(false)
                                    }}
                                    />
                                    秒后重发
                                </Text>
                            }
                        </AtButton>
                    </View>
                    <Button className='login-btn' form-type='submit'>登录</Button>
                </Form>
                {!isEnvH5 && <Button className='wxLogin'>微信快捷登录</Button>}
            </View>
        </BaseView>
    )
}
