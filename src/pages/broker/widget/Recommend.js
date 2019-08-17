import {AreaDiy} from '@com/index'
import {View, Form, Input, Picker, Text, Button, Image} from '@tarojs/components'
import Taro, {useEffect, useRef} from '@tarojs/taro'
import {useApi} from '@util/index'
import {useInputFocus, usePicker} from '@inc/use-form'
import {showMsg} from '@util/message'
import {vailPhone} from '@util/tool'
import {rCom} from '@inc/router/url'
import {goto} from '@inc/router'
import {shopIndustry} from '@inc/service';
import {broker7} from '@img/images'
import {commissionRule, searchClientType, updateAdd} from '@inc/service/broker'
import PropTypes from 'prop-types';

import './Recommend.less'

export default function Recommend({shopId}) {
    const {focus, onFocus} = useInputFocus();
    const {pickerVal, pickerInd, onChange} = usePicker();

    const typeNames = useRef([]);
    const types = useApi(searchClientType);
    const rule = useApi(commissionRule);
    const brands = useApi(shopIndustry, {}, [], null, res => res.map(item => item.name), []);

    useEffect(() => {
        if(!Array.isArray(types)){
            return;
        }
        typeNames.current = types.map(item => {
            return item.name;
        })
    }, [types]);


    const goSub = async e => {
        let count = 0;
        const form = e.detail.value;
        let data = {...pickerVal, ...form};
        const field = ['name', 'phone', 'area', 'industry'];
        const tip = ['真实姓名', '正确手机号', '区域', '意向类目'];
        field.every((item, index) => {
            const bol = item === 'area' || item === 'industry';
            const val = data[item];
            if (item === 'phone' ? !vailPhone(val) : !val) {
                count += 1;
                showMsg(`请${bol ? '选择' : '输入'}` + tip[index] + '！');
                !bol && onFocus(item);
                return false;
            }
            return true;
        });

        if (!count) {
            const pType = pickerInd.agent_type;
            typeof pType !== 'undefined' && (data.agent_type = types[pType].id);
            shopId && (data.shop_id = shopId);
            data.broker = '1';

            updateAdd(data).then(() => {
                goto(rCom.success, {pn: 'tj'})
            }).catch((err) => {
                showMsg(err.msg || err.message)
            })
        }
    };

    return (
        <View className='recommend xs'>
            <Image className='w100' src={broker7} mode='widthFix' />
            <Form onSubmit={goSub}>
                <View className='form'>
                    <View className='rec-title'>推荐客户</View>
                    <View className='dis-flex'>
                        <View className='f-block must-fill'>
                            <View className='dis-flex'>
                                <View className='f-label'>客户姓名：</View>
                                <Input
                                  className='f-input flex-hide'
                                  type='text'
                                  name='name'
                                  focus={focus.name}
                                />
                            </View>
                        </View>
                        <View className='f-block must-fill'>
                            <View className='dis-flex'>
                                <View className='f-label'>手机：</View>
                                <Input
                                  className='f-input flex-hide'
                                  type='number'
                                  name='phone'
                                  focus={focus.phone}
                                  maxLength={11}
                                />
                            </View>
                        </View>
                        <View className='f-block must-fill'>
                            <View className='dis-flex'>
                                <View className='f-input flex-hide'>
                                    <AreaDiy onChange={aid => pickerVal.area = aid} />
                                </View>
                            </View>
                        </View>
                        <View className='f-block must-fill'>
                            <View className='dis-flex'>
                                <Picker
                                  className='f-input flex-hide'
                                  range={brands}
                                  onChange={e => onChange(e, brands, 'industry')}
                                >
                                    {pickerVal.agent_type || '请选择类别'}
                                </Picker>
                            </View>
                        </View>
                        <View className='f-block'>
                            <View className='dis-flex'>
                                <View className='f-label'>意向品牌：</View>
                                <Input
                                  className='f-input flex-hide'
                                  type='text'
                                  name='brand'
                                />
                            </View>
                        </View>
                        <View className='f-block'>
                            <View className='dis-flex'>
                                <Picker
                                  className='f-input flex-hide'
                                  range={typeNames.current}
                                  onChange={e => onChange(e, typeNames.current, 'agent_type')}
                                >
                                    {pickerVal.agent_type || '请选择类型'}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View className='txt1'>
                        <Text className='iconfont icontick' />
                        服从调剂我们将把客户推荐给更多合适企业，增加签约概率
                    </View>
                    <View>请确保推荐客户来源真实合法，客户本人知晓并统一提交</View>
                    <Button className='red-btn' form-type='submit'>提交客户</Button>

                    <Image className='w100' src={rule.img} mode='widthFix' />
                </View>
            </Form>
        </View>
    )
}

Recommend.propTypes = {
    shopId: PropTypes.string
};

Recommend.defaultProps = {
    shopId: ''
};

Recommend.options = {
    addGlobalClass: true
};
