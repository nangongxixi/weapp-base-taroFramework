import {Button, Form, Input, View, Image} from "@tarojs/components";
import Taro, {useState} from "@tarojs/taro";
import {useInputFocus} from "@inc/use-form";
import {uploadFile} from "@inc/api";
import {isBdApp} from "@config/index";
import {showMsg, showLoading, hideLoading} from "@util/message";
import img from '@img/pic7.jpg';
import PropTypes from "prop-types";

import Step from "./Step";
import Bank from "./Bank";
import {bankAddAccount, myRealName} from "@inc/service/mine";
import './Verify.less';

function Verify({onRes}) {
    const [pic, setPic] = useState('');
    const [page, setPage] = useState(1);
    const {focus, onFocus} = useInputFocus();
    const upload = async () => {
        Taro.chooseImage({
            count: 1,
            sourceType: ['camera'],
            success: async (e) => {
                showLoading('上传中');
                const temp = e.tempFilePaths[0];
                let res = await uploadFile(isBdApp() ? temp.path : temp);
                hideLoading();
                if (res.code !== 200) {
                    showMsg(res.message);
                    return;
                }
                setPic(res.data);
            }
        }).catch(e => {
            console.log(e);
        })
    };
    const step1 = async e => {
        let f = e.detail.value;
        if (!pic) {
            showMsg('请上传名片照片！');
            return;
        }
        const n = f.real_name;
        if (n && f.card_id.length === 18) {
            f.business_card = pic;
            myRealName(f).then(() => {
                setPage(2);
            }).catch(err => {
                showMsg(err.message);
            })
        } else {
            onFocus(n ? 'card_id' : 'real_name');
            showMsg(`请输入${n ? '18位身份证号' : '姓名'}！`);
        }
    };
    const sendBank = async e => {
        bankAddAccount(e).then(() => {
            setPage(3);
        }).catch(err => {
            const msg = err.message;
            showMsg(msg);
            setPage(msg.indexOf('验证码') > -1 ? 2 : 4);
        })
    };
    return (
        <View className='verify'>
            <Step page={page} />
            {
                page === 1 &&
                <View className='page1 xs'>
                    <View className='pic-box'>
                        <View className='txt1'>请上传本人名片照片</View>
                        {
                            pic
                                ? <View
                                  className='pic1 bg-cov'
                                  style={`background-image:url(${pic || img})`}
                                  onClick={upload}
                                />
                                : <Image className='pic1' src={img} style='display:block'
                                  onClick={upload}
                                />
                        }

                    </View>
                    <View className='form-title'>请输入你的姓名和身份证号码</View>
                    <Form onSubmit={step1}>
                        <View className='form-box'>
                            <View className='dis-flex'>
                                <View className='label'>姓名</View>
                                <Input name='real_name' className='f-text flex-hide' type='text' confirm-type='done'
                                  placeholder='请输入姓名'
                                  focus={focus.real_name}
                                />
                            </View>
                            <View className='dis-flex'>
                                <View className='label'>身份证</View>
                                <Input name='card_id' className='f-text flex-hide' type='text' confirm-type='done'
                                  placeholder='请输入身份证号码' maxLength={18}
                                  focus={focus.card_id}
                                />
                            </View>
                        </View>
                        <Button form-type='submit' className='submit'>下一步</Button>
                    </Form>
                </View>
            }
            {
                page === 2 &&
                <Bank onSend={sendBank} />
            }
            {
                page === 3 &&
                <View className='successful'>
                    <View className='iconfont iconchenggong'></View>
                    <View className='s-txt1'>验证成功</View>
                    <View className='s-txt2'>最后结果将稍后通知你</View>
                    <Button className='submit' onClick={onRes}>完成验证</Button>
                </View>
            }
            {
                page === 4 &&
                <View className='cancel'>
                    <View className='iconfont iconcuowu'></View>
                    <View className='s-txt1'>身份信息验证不通过</View>
                    <View className='s-txt2'>身份证与银行卡信息不匹配，请重新提交</View>
                    <Button className='submit' onClick={() => setPage(1)}>重新提交</Button>
                </View>
            }
        </View>
    )
}

Verify.propTypes = {
    onRes: PropTypes.func
};

Verify.defaultProps = {
    onRes: () => {
    }
};

Verify.options = {
    addGlobalClass: true
};

export default Verify
