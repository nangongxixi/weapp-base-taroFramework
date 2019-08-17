import { View, Image } from '@tarojs/components'
import router from '@inc/router'
import { rStore } from '@inc/router/url'
import PropTypes from 'prop-types'

import img1 from '@img/foot/f-home.png'
import imgon1 from '@img/foot/f-home-on.png'
import img2 from '@img/foot/f-goods.png'
import imgon2 from '@img/foot/f-goods-on.png'
import img3 from '@img/foot/f-join.png'
import img4 from '@img/foot/f-case.png'
import imgon4 from '@img/foot/f-case-on.png'
import img5 from '@img/foot/f-shop.png'
import pic from '@img/pic5.png'
import imgon5 from '@img/foot/f-shop-on.png'
import Taro from '@tarojs/taro'
import './foot.less'
import { isH5 } from '@config'

function StoreFoot({ current, shopId }) {
    let url = ['index', 'goods', 'join', 'design', 'shop']
    let pageArr = Taro.getCurrentPages()
    let path = ''
    !isH5() && (pageArr.length > 0) && (path = pageArr[pageArr.length-1].route)
    isH5() && (path = this.$router.path.substring(1))
    const link = (e) => {
        if (current !== e) {
            let name = url[e]
            router.ToRedirect(rStore[name], { id: shopId })
        }
    }
    let tabList = [
        { title: '店铺', image: img1, selectedImage: imgon1 },
        { title: '产品', image: img2, selectedImage: imgon2 },
        { title: '招商加盟', image: img3, selectedImage: img3 },
        { title: '案例', image: img4, selectedImage: imgon4 },
        { title: '加盟店', image: img5, selectedImage: imgon5 }
    ].map((item, index) => {
        return (
            <View className='at-col' onClick={() => link(index)} key={item.title}>
                <View className={`foot-item ${index === 2 ? 'foot-join' : ''}`}>
                    <Image className='foot-img' src={current === index ? item.selectedImage : item.image} />
                    {index === 2 && path !== 'pages/store/join' && <Image className='x-icon' src={pic} />}
                </View>
                <View style={`color: ${current === index ? '#ef473a' : ''}`}>{item.title}</View>
            </View>
        )
    })
    return (
        <View className='store-foot at-row text-center xs'>
            {tabList}
        </View>
    )
}

StoreFoot.propTypes = {
    shopId: PropTypes.string,
    current: PropTypes.number
}

StoreFoot.defaultProps = {
    current: 0
}

StoreFoot.options = {
    addGlobalClass: true
}

export default StoreFoot
