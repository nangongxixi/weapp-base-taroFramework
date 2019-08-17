import {Image, View} from '@tarojs/components';
import img from '@img/pic2.png'
import PropTypes from 'prop-types';
import './Step.less';

function Step({page}) {
    return (
        <View className='step-box dis-flex'>
            <View className={`flex-hide top-txt ${page === 1 ? 'blue' : ''}`}>上传身份信息</View>
            <View className='wd-70'>
                <Image className='icon1' src={img} />
            </View>
            <View className={`flex-hide top-txt ${page === 2 ? 'blue' : ''}`}>绑定银行卡</View>
            <View className='wd-70'>
                <Image className='icon1' src={img} />
            </View>
            <View className={`flex-hide top-txt ${page > 2 ? 'blue' : ''}`}>认证结果</View>
        </View>
    )
}

Step.propTypes = {
    page: PropTypes.number
};

Step.defaultProps = {
    page: 1
};

Step.options = {
    addGlobalClass: true
};

export default Step
