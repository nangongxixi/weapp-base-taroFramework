import { BaseView, Rich } from '@com/index'
import { View, Video } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import { useAsyncEffect } from '@util/index'

import { videoInfo } from '@inc/service/shop'

import './videoDetail.less'

export default function VideoDetailPage() {
    let { id } = this.$router.params
    const [info, setInfo] = useState({})

    Taro.setNavigationBarTitle({
        title: '视频详情'
    })
    useAsyncEffect(async () => {
        setInfo(await videoInfo({ id: id }))
    }, [id])

    return (
        <BaseView>
            <View className='video-detail pd-15'>
                <View className='title'>{info.title}</View>
                <Video className='video com-box' src='{info.video_url}' poster='{info.image}' controls />
                <View className='cnt'>
                    <Rich content={info.content} />
                </View>
            </View>
        </BaseView>
    )
}
