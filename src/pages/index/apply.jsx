import {BaseView} from '@com/index'
import Taro, {useState} from '@tarojs/taro'
import {View, Form, Input, Button} from '@tarojs/components'
import {isH5} from '@config'
import {applyBanner} from '@img/images'
import {useInputFocus} from "@inc/use-form";
import {showAuthPhone} from "@inc/store/auth";
import {useDocumentTitle} from "@inc/use-dom";

import {goJoin} from '../mine/widget/brandJoin'
import './apply.less'

export default function ApplyPage() {
    const {focus, onFocus} = useInputFocus();
    const [tel, setTel] = useState('');
       const checkPhone = () => {
        showAuthPhone(true, t => {
            setTel(t);
        });
    };

    useDocumentTitle('我要招商');

    return (
        <BaseView>
            <View className='apply-index'>
                <View className='banner bg-cov' style={`background-image:url(${applyBanner})`} />
                <View className='form-box com-box'>
                    <View className='title'>免费提升品牌影响力</View>
                    <Form className='form' onSubmit={e => goJoin(e, onFocus)}>
                        <Input
                          className='input'
                          type='text' name='name'
                          placeholder='您的称呼'
                          focus={focus.name}
                        />
                        <View className='dis-flex'>
                            <Input
                              className='input flex-hide'
                              name='phone' type='number'
                              placeholder='联系手机'
                              value={tel}
                              focus={focus.phone}
                            />
                            {
                                !isH5() &&
                                <View className='phoneBtn' onClick={checkPhone}>授权手机号</View>
                            }
                        </View>
                        <Input
                          className='input'
                          type='text'
                          name='brand_name'
                          placeholder='您的品牌名称'
                          focus={focus.brand_name}
                        />
                        <Input className='input' type='text' name='remark' placeholder='备注（选填）' />
                        <Button className='red-btn' form-type='submit'>提交加盟信息</Button>
                    </Form>
                </View>
            </View>
        </BaseView>
    )
}
