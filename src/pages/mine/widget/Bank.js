import {View} from "@tarojs/components";
import Taro, {useRef, useState} from "@tarojs/taro";
import PropTypes from "prop-types";
import BankForm1 from "./BankForm1";
import BankForm2 from "./BankForm2";
import './Verify.less';

function Bank({onSend}) {
    const data = useRef({});
    const [bPage, setBPage] = useState(1);
    const onSubmit1 = e => {
        data.current = e;
        setBPage(2);
    };
    const onSubmit2 = e => {
        onSend(Object.assign(data.current, e));
    }
    return (
        <View className='verify'>
            <View className='form-title'>请绑定你的银行卡</View>
            {
                bPage === 1
                    ? <BankForm1 onSend={onSubmit1} />
                    : <BankForm2 onSend={onSubmit2} />
            }
        </View>
    )
}

Bank.propTypes = {
    onSend: PropTypes.func
};

Bank.defaultProps = {
    onSend: () => {}
};

Bank.options = {
    addGlobalClass: true
};

export default Bank
