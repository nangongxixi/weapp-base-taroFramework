import {Button, Form, Input, View} from "@tarojs/components";
import Taro, {useState} from "@tarojs/taro";
import {useInputValue} from "@inc/use-form";
import {useGeeVerify} from "@inc/use-verify";
import {vailPhone} from "@util/tool";
import {showMsg} from "@util/message";
import {sendSmsCode} from "@inc/service/user";
import PropTypes from "prop-types";
import Counter from "./Counter";
import './BankForm2.less';

function BankForm2({onSend}) {
    const phone = useInputValue('');
    const code = useInputValue('');
    const [inputPhoneDisabled, setDisabled] = useState(false);
    const [start, setStart] = useState(false);

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
                    showMsg('验证码发送成功, 请注意查收！');
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
    const sendPhone = e => {
        const f = e.detail.value;
        const tel = vailPhone(f.phone);
        if (tel && f.code) {
            onSend(f);
        } else {
            showMsg(`请输入${tel ? '验证码' : '正确手机号'}！`);
            tel ? code.setFocus(true) : phone.setFocus(true);
        }
    }

    return (
        <Form className='verify' onSubmit={sendPhone}>
            <View className='form-box'>
                <View className='dis-flex'>
                    <View className='label'>手机号</View>
                    <Input name='phone' className='f-text flex-hide' placeholder='请输入手机号' type='text'
                      value={phone.value} maxLength={18}
                      onchange={e => phone.onChange(e)}
                      focus={phone.focus}
                    />
                </View>
                <View className='dis-flex'>
                    <View className='label'>验证码</View>
                    <Input name='code' className='f-text flex-hide' type='text' placeholder='请输入验证码'
                      value={code.value}
                      onchange={e => code.onChange(e)}
                      focus={code.focus}
                    />
                    <Button
                      className='code-btn'
                      disabled={inputPhoneDisabled}
                      onClick={sendCode}
                    >
                        {
                            !start
                                ? '发送验证码'
                                : <View>
                                    <Counter
                                      start={start}
                                      onFinish={() => {
                                            setStart(false);
                                            setDisabled(false)
                                        }}
                                    />
                                    秒后重发
                                </View>
                        }
                    </Button>
                </View>
            </View>
            <Button form-type='submit' className='submit'>提交</Button>
        </Form>
    )
}

BankForm2.propTypes = {
    onSend: PropTypes.func
};

BankForm2.defaultProps = {
    onSend: () => {}
};

BankForm2.options = {
    addGlobalClass: true
};

export default BankForm2
