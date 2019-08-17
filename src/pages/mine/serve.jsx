import {BaseView, Rich} from '@com/index'
import {View, Form, Input, Textarea, Button} from '@tarojs/components'
import Taro from "@tarojs/taro";
import {zsImgs, jkbImgs} from '@img/images'
import {useInputFocus} from "@inc/use-form";
import {shareMessage} from "@inc/share";
import {rMine} from "@inc/router/url";
import { parseReqId } from '@util/tool'

import {goJoin} from './widget/brandJoin'
import './serve.less'


export default function MineServePage() {
    const type = parseReqId(this.$router.params,'type');
    const {focus, onFocus} = useInputFocus();
    const bol = type === '1';
    let imgs = '';
    let imgArr = bol ? zsImgs : jkbImgs;
    for (var i in imgArr) {
        imgs += `<img src='${imgArr[i]}'/>`;
    }

    Taro.setNavigationBarTitle({
        title: bol ? '招商宝' : '集客宝'
    });
    this.onShareAppMessage = () => {
        const title = bol ? '九正招商，给您零风险的招商服务' : '九正集客宝，家居企业获客引流神器';
        const share = shareMessage(title, null, rMine.service, {type: type});
        return share;
    };
    return (
        <BaseView>
            <View className='service'>
                <Rich content={imgs} float />
                <Form className='form' onSubmit={e => goJoin(e, onFocus, type)} style={{background: bol ? '#DB2C4B' : '#00053F'}}>
                    <Input
                      className='input'
                      name='name'
                      type='text'
                      placeholder='姓名'
                      focus={focus.name}
                    />
                    <Input
                      className='input'
                      name='phone'
                      type='number'
                      placeholder='手机号码'
                      focus={focus.phone}
                    />
                    <Input
                      className='input'
                      name='brand_name'
                      type='text'
                      placeholder='企业名称/品牌名称'
                      focus={focus.brand_name}
                    />
                    <Textarea className='input textarea' name='remark' placeholder='请输入你的详细需求'></Textarea>
                    <Button className='btn' form-type='submit'>{bol ? '我要招商' : '申请免费试用'}</Button>
                </Form>
            </View>
        </BaseView>
    )
}

MineServePage.options = {
    addGlobalClass: true
};
