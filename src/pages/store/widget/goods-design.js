import {View, Swiper, SwiperItem} from '@tarojs/components'
import {useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {goodsDesigns} from '@inc/service/shop'

import './goods-design.less'

function GoodsDesign({goodsId}) {
    const [design, setDesign] = useState([]);
    useAsyncEffect(async () => {
        setDesign(await goodsDesigns({goods_id: goodsId}))
    });
    return design.length > 0 && (
        <View className='goods-design sm'>
            <View className='title'>搭配推荐</View>
            <Swiper indicatorDots circular autoplay
              style='height:150px'
            >
                {
                    design.map(item => {
                        return (
                            <SwiperItem key={item.id} className='bg-cov' style={`background-image:url(${item.image})`}>
                                <View className='place'>{item.name}</View>
                                <View className='all'>3D全景</View>
                            </SwiperItem>
                        )
                    })
                }
            </Swiper>
        </View>
    )
}

GoodsDesign.options = {
    addGlobalClass: true
};

export default GoodsDesign
