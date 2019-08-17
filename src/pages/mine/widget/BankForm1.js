import {Button, Form, Input, Picker, View} from "@tarojs/components";
import Taro, {useRef, useState} from "@tarojs/taro";
import {useInputFocus, usePicker} from "@inc/use-form";
import {useAsyncEffect} from "@util/use-reqeust";
import {showMsg} from "@util/message";
import PropTypes from "prop-types";
import {bankLogo} from "@inc/service/mine";
import './Verify.less';

function BankForm1({onSend}) {
    const {pickerVal, pickerInd, onChange} = usePicker();
    const banks = useRef([]);
    const [bank, setBank] = useState([]);
    const {focus, onFocus} = useInputFocus();
    useAsyncEffect(async () => {
        const res = await bankLogo();
        const arr = res.map(item => {
            return item.name
        });
        banks.current = res;
        setBank(arr);
    });
    const sendBank = e => {
        let f = e.detail.value;
        let c = 0;
        const keys = ['name', 'bank', 'account'];
        const tip = ['请输入银行卡姓名', '请选择开户行', '请输入银行卡号'];
        f.bank = pickerVal.bank;
        keys.every((item, index) => {
            if (!f[item]) {
                showMsg(tip[index] + '！');
                c += 1;
                item !== 'bank' && onFocus(item);
                return false;
            }
            return true;
        });
        if (!c) {
            f.logo = banks.current[pickerInd.bank].img;
            onSend(f);
        }
    };

    return (
        <Form className='verify' onSubmit={sendBank}>
            <View className='form-box'>
                <View className='dis-flex'>
                    <View className='label'>姓名</View>
                    <Input name='name' className='f-text flex-hide' type='text' placeholder='请输入银行卡姓名'
                      focus={focus.name}
                    />
                </View>
                <View className='dis-flex' onClick='open'>
                    <View className='label'>开户行</View>
                    <Picker
                      className={`f-input flex-hide ${pickerVal.bank ? '' : 'c-66'}`}
                      range={bank}
                      onChange={e => onChange(e, bank, 'bank')}
                    >
                        {pickerVal.bank || '请选择开户行'}
                    </Picker>
                </View>
                <View className='dis-flex'>
                    <View className='label'>银行卡号</View>
                    <Input name='account' className='f-text flex-hide' type='text' placeholder='请输入银行卡号'
                      maxLength='19' focus={focus.account}
                    />
                </View>
            </View>
            <Button form-type='submit' className='submit'>下一步</Button>
        </Form>
    )
}

BankForm1.propTypes = {
    onSend: PropTypes.func
};

BankForm1.defaultProps = {
    onSend: () => {}
};

BankForm1.options = {
    addGlobalClass: true
};

export default BankForm1
