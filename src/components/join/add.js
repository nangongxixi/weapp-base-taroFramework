import {NoticeBar} from '@com/index'
import {View, Text, Form, Input, Textarea , Button} from '@tarojs/components'
import {useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {vailPhone} from '@util/tool'
import {showMsg} from '@util/message'
import {goto} from '@inc/router'
import {rCom} from '@inc/router/url'
import {joinAddAdv} from '@img/images'
import bg from '@img/join-bg.png'
import {useInputFocus} from "@inc/use-form";
import PropTypes from 'prop-types'
import {joinCount} from '@inc/service/shop'
import {shopJoin} from '@inc/service'
import {updateAdd} from '@inc/service/broker'
import './add.less'

function JoinAdd({shopId, hasTxt}) {
    const {focus, onFocus} = useInputFocus();
    const [count, setCount] = useState(0);
    const [msg, setMsg] = useState([]);

    useAsyncEffect(async () => {
        setCount(await joinCount({shop_id: shopId, type: 4}));
        setMsg(await shopJoin({shop_id: shopId}));
    }, [shopId]);

    const formSubmit = (e) => {
        const params = e.detail.value;
        const name = params.name;
        params.shop_id = shopId;
        if (!name || !vailPhone(params.phone)) {
            showMsg(`请填写${name ? '正确手机号' : '姓名'}！`);
            onFocus(name ? 'phone' : 'name');
            return;
        }
        updateAdd(params).then(() => {
            goto(rCom.success, {id: shopId || ''});
        }).catch(err => {
            showMsg(err.msg || err.message);
        });
    };
    return (
        <View className={`text-center ${hasTxt ? 'join-add-page' : 'join-add'}`}>
            <View
              className='join-box'
              style={hasTxt ? '' : `background-image:url(${bg})`}
            >
                <View className='j-desc'>
                    {hasTxt && <View className='j-title'>免费咨询赢好礼</View>}
                    <View className='join-receive'>
                        已为 <Text className='text'>{count}</Text> 人提供了咨询服务
                    </View>
                    {
                        hasTxt &&
                        <View className='adv bg-cov' style={{backgroundImage: `url(${joinAddAdv})`}} />
                    }
                    {
                        hasTxt && msg.length > 0 &&
                        <View className='gift dis-flex'>
                            <Text className='iconfont iconsound nm' />
                            <View className='flex-hide'>
                                <NoticeBar items={msg} height={20} color='#FFEEC2' />
                            </View>
                        </View>
                    }
                </View>
                <View className='fill form'>
                    <Form onSubmit={formSubmit}>
                        <View className='dis-flex input'>
                            姓名：
                            <View className='flex-hide'>
                                <Input
                                  className='inp'
                                  name='name'
                                  type='text'
                                  placeholder='请输入你的姓名'
                                  focus={focus.name}
                                />
                            </View>
                        </View>

                        <View className='dis-flex input'>
                            {hasTxt ? '电话' : '手机'}：
                            <View className='flex-hide'>
                                <Input
                                  className='inp'
                                  name='phone'
                                  type='number'
                                  placeholder='请输入你的手机号'
                                  focus={focus.phone}
                                />
                            </View>
                        </View>
                        <View className='input text-box'>
                            <View className='dis-flex' style='align-items: flex-start;'>
                                咨询：
                                <View className='text-area-box flex-hide'>
                                    <Textarea
                                      rows='6'
                                      className='text-area'
                                      name='remark'
                                    />
                                </View>
                            </View>
                            {/*<View className='quick-box arr'>*/}
                            {/*    您可选择 <Text style='color:#FE5740;'>快捷回复</Text>*/}
                            {/*</View>*/}
                        </View>

                        <Button className='red-btn' form-type='submit'>提交加盟信息</Button>
                    </Form>
                    {
                        hasTxt &&
                        <View className='btm-txt'>郑重承诺：对于您的个人信息，我们将严格保密，请放心提交</View>
                    }
                </View>
            </View>
        </View>
    )
}

JoinAdd.propTypes = {
    shopId: PropTypes.string,
    hasTxt: PropTypes.bool
};

JoinAdd.defaultProps = {
    hasTxt: false,
    shopId: ''
};

JoinAdd.options = {
    addGlobalClass: true
};

export default JoinAdd
