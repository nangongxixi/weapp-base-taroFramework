import { View, Text } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import { useAsyncEffect } from '@util/index'
import { NoticeBar } from '@com/index'
import { goto } from '@inc/router'
import { rIndex, rStore } from '@inc/router/url'
import { joinCount } from '@inc/service/shop'
import { shopJoin } from '@inc/service'
import PropTypes from 'prop-types'

import './msg.less'

function StoreMsg({detail, hasBom}) {
    const [count, setCount] = useState(0)
    const [msg, setMsg] = useState([])
    useAsyncEffect(async () => {
        if (hasBom) {
            setCount(await joinCount({ shop_id: detail.shop_id, type: 4 }))
            setMsg(await shopJoin({ shop_id: detail.shop_id }))
        }
    })
    return (
        <View className='store-msg'>
            {
                hasBom &&
                <View className='title-box at-row'>
                    <View className='title at-col'>品牌信息</View>
                    <View className='more' onClick={() => goto(rStore.shopState, {id: detail.shop_id})}>
                        品牌介绍
                        <Text className='iconfont iconjiantou'></Text>
                    </View>
                </View>
            }
            <View className='s-brand text-center com-box mgt-15'>
                <View className='desc1 dis-flex lg'>
                    <View className='flex-hide bg'>
                        <View className='c-99 xs'>成立时间</View>
                        <View className='fwb text-overflow'>{detail.agent.fdate}</View>
                    </View>
                    <View className='flex-hide'>
                        <View className='c-99 xs'>总部地址</View>
                        <View className='fwb text-overflow'>{detail.agent.actBrandArea}</View>
                    </View>
                    <View className='flex-hide bg'>
                        <View className='c-99 xs'>经营产品</View>
                        <View className='fwb text-overflow'>{detail.keywords}</View>
                    </View>
                    <View className='flex-hide'>
                        <View className='c-99 xs'>经营模式</View>
                        <View className='fwb text-overflow'>{detail.agent.actKindsNames[0]}</View>
                    </View>
                    <View className='flex-hide bg'>
                        <View className='c-99 xs'>发展模式</View>
                        <View className='fwb text-overflow'>{detail.agent.actDevelopKindNames[0]}</View>
                    </View>
                    <View className='flex-hide'>
                        <View className='c-99 xs'>加盟区域</View>
                        <View className='fwb text-overflow'>{detail.agent.areaName}</View>
                    </View>
                </View>
                {
                    hasBom &&
                    <View>
                        <View className='desc2 dis-flex lg'>
                            <View className='flex-hide'>
                                <View className='xs'>门店数量</View>
                                <View className='fwb text-overflow'>{detail.store_num}</View>
                            </View>
                            <View className='flex-hide'>
                                <View className='xs'>投资金额</View>
                                <View className='fwb text-overflow'>{detail.budget || 0}</View>
                            </View>
                            <View className='flex-hide'>
                                <View className='xs'>创业者关注</View>
                                <View className='fwb text-overflow'>{detail.read || 0}</View>
                            </View>
                            <View className='flex-hide'>
                                <View className='xs'>成功加盟</View>
                                <View className='fwb text-overflow'>{detail.join_num || 0}</View>
                            </View>
                        </View>
                        <View className='desc3'>
                            <View className='d3-1'>品牌加盟</View>
                            <View className='d3-2 xl'>{count}位已提交</View>
                            {
                                msg.length > 0 &&
                                <View className='dis-flex join-msg-dis'>
                                    <Text className='iconfont iconsound nm'></Text>
                                    <View className='flex-hide'>
                                        <NoticeBar items={msg} height={20} color='#FFEEC2' />
                                    </View>
                                </View>
                            }
                        </View>
                        <View className='desc4 bg-btn-box dis-flex'>
                            <View className='flex-hide red' onClick={() => goto(rIndex.joinAdd, {id: detail.shop_id})}>
                                <View className='iconfont iconxiaoxi'></View> 加盟咨询
                            </View>
                            <View className='flex-hide green' onClick={() => goto(rStore.join, {id: detail.shop_id})}>
                                <View className='iconfont iconziliao'></View> 加盟介绍
                            </View>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

StoreMsg.propTypes = {
    detail: PropTypes.object,
    hasBom: PropTypes.bool
}

StoreMsg.defaultProps = {
    detail: {},
    hasBom: false
}

StoreMsg.options = {
    addGlobalClass: true
}

export default StoreMsg
