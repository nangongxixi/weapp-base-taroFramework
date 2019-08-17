import Taro, {useState} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import {BaseView} from '@com/index';
import {useAsyncEffect} from '@util/index';
import Verify from './widget/Verify';
import {brokerInfo} from '@inc/service/broker';
import './verify.less';

export default function MineVerifyPage() {
    const [info, setInfo] = useState({});
    const [isVerify, setIsVerify] = useState(false);
    useAsyncEffect(() => {
        getInfo(1);
    });
    const getInfo = async first => {
        const res = await brokerInfo();
        if (first) {
            const no = res.certified === '2';
            setIsVerify(no);
            Taro.setNavigationBarTitle({
                title: no ? '身份认证' : '实名认证'
            })
        }
        setInfo(res);
    };
    const onRes = () => {
        setIsVerify(false);
        getInfo();
    };
    return (
        <BaseView>
            {
                isVerify
                    ? <Verify onRes={onRes} />
                    : <View className='verify-is dis-flex nm'>
                        <View className='flex-hide'>
                            <View className='name'>
                                {info.real_name}
                                <Text className='span'>{info.certifiedName}</Text>
                            </View>
                            <View className='number'>{info.card_id}</View>
                        </View>
                        {
                            (info.certified === '4' || info.certified === '2') &&
                            <View className='btn' onClick={() => setIsVerify(true)}>
                                {info.certified === '4' ? '重新认证' : '去认证'}
                            </View>
                        }
                    </View>
            }
        </BaseView>
    )
}
