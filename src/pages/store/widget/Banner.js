import { JSlider } from '@com/index'
import { View } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import { useAsyncEffect } from '@util/index'

import PropTypes from 'prop-types'
import {goto} from "@inc/router";
import rStore from "@inc/router/url/store";

import { videoList } from '@inc/service/shop'

function Banner({ shopId }) {
    const [banners, setBanners] = useState([])

    useAsyncEffect(async () => {
        setBanners(await videoList({ store_id: shopId }))
    });

    return banners.length > 0 && (
        <View className='video'>
            <JSlider items={banners}
              onClick={
                item => goto(rStore.videoDetail, { id: item.id })
                }
              height={150}
            />
        </View>
    )
}

Banner.propTypes = {
    shopId: PropTypes.string
};

Banner.options = {
    addGlobalClass: true
};

export default Banner
