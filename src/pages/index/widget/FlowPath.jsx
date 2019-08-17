import {Button, Form, Input, View} from "@tarojs/components";
import {useState} from '@tarojs/taro'
import {vailPhone} from '@util/tool'
import {showMsg} from '@util/message'
import {useInputFocus} from "@inc/use-form";
import {goto} from '@inc/router'
import {rCom} from '@inc/router/url'
import Title from "@com/Title";
import PropTypes from "prop-types";
import {updateAdd} from '@inc/service/broker'
import "./FlowPath.less";

function FlowPath({phone}) {
    const {focus, onFocus} = useInputFocus();
    const [phoneValue, setPhoneValue] = useState(phone);
    const formSubmit = e => {
        const {tel} = e.detail.value;
        if (vailPhone(tel)) {
            updateAdd({
                phone: tel
            }).then(() => {
                setPhoneValue('');
                goto(rCom.success);
            }).catch(err => {
                showMsg(err.msg || err.message);
            })
        } else {
            showMsg('请输入正确手机号！');
            onFocus('tel')
        }
    };
    return (
        <View className='box1'>
            <View className='index-flow'>
                <Title name='加盟流程' hasMore={false} />
                <View className='flow-warp'>
                    <View className='flow-box at-row'>
                        <View className='f-box at-col at-col-3'>
                            <View className='iconfont iconliaojie b1' />
                            <View className='f-txt'>加盟报名</View>
                            <View className='iconfont iconjiantou' />
                        </View>
                        <View className='f-box at-col at-col-3'>
                            <View className='iconfont iconphone6dianhua b2 f' />
                            <View className='f-txt'>客服回访</View>
                            <View className='iconfont iconjiantou' />
                        </View>
                        <View className='f-box at-col at-col-3'>
                            <View className='iconfont iconsousuo b1 f' />
                            <View className='f-txt'>项目考察</View>
                            <View className='iconfont iconjiantou' />
                        </View>
                        <View className='f-box at-col at-col-3'>
                            <View className='iconfont icongongwenbao b2' />
                            <View className='f-txt'>签订合作</View>
                        </View>
                    </View>
                    <Form
                      className='form'
                      onSubmit={formSubmit}
                    >
                        <Input name='tel' type='number' value={phoneValue}
                          className='input'
                          placeholder='免费回呼，立即沟通，请输入你的电话!'
                          focus={focus.tel}
                        />
                        <Button className='red-btn no-shadow' form-type='submit'>获取加盟指导</Button>
                    </Form>
                </View>
            </View>
        </View>
    )
}

FlowPath.options = {
    addGlobalClass: true
};

FlowPath.propTypes = {
    phone: PropTypes.string,
};

FlowPath.defaultProps = {
    phone: '',
};

export default FlowPath
