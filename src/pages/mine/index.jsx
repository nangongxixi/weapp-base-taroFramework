import {BaseView} from '@com/index'
import {View, Text, OpenData} from '@tarojs/components'
import { useUserLink } from '@inc/use-user'
import {showConfirm} from "@util/message";
import {go} from '@inc/router'
import {rMine, rIndex} from '@inc/router/url'
import {isH5} from '@config'
import {logout, useUserStore} from '@inc/store/user';
import avatar from '@img/user3.png'
import {useBroker} from '@inc/store/broker'
import {getStat, commissionTotal} from '@inc/service/mine'
import BrokerReg from '@com/auth/BrokerReg'
import {useDocumentTitle} from "@inc/use-dom";
import {useApi} from "@util/use-reqeust";

import './index.less'

export default function MinePage() {
    const {isGuest, nickname} = useUserStore();
    const {handleBrokerLink} = useBroker();
    const handleUserLink = useUserLink();
    const stat = useApi(getStat, {}, [isGuest], () => !isGuest);
    const money = useApi(commissionTotal, {}, [isGuest], () => !isGuest);

    useDocumentTitle('我的');

    const quit = () => {
        showConfirm('确认退出？', logout);
    };

    return (
        <BaseView chkUser navBar>
            <View className='mine xs text-center'>
                <View className='mine-top pd-15'>
                    {isH5() && !isGuest &&
                        <View className='iconfont iconquit' onClick={quit} />
                    }
                    <View
                      className='avatar bg-cov'
                      style={isH5() ? `background-image:url(${avatar})` : ''}
                    >
                        {!isH5() &&
                            <OpenData type='userAvatarUrl' />
                        }
                    </View>
                    {!isGuest &&
                        <View className=''>{nickname || '你好'}</View>
                    }
                </View>

                <View className='navs at-row'>
                    <View className='at-col' onClick={handleUserLink(rMine.brand)}>
                        <View>意向品牌</View>
                        <View className='dl'>{stat.brand}</View>
                    </View>
                    <View className='at-col' onClick={handleUserLink(rMine.collect)}>
                        <View>我的收藏</View>
                        <View className='dl'>{stat.fav}</View>
                    </View>
                    <View className='at-col' onClick={handleUserLink(rMine.hits)}>
                        <View>最近浏览</View>
                        <View className='dl'>{stat.browser}</View>
                    </View>
                </View>

                <View className='pd-15'>
                    <View className='com-box' onClick={handleBrokerLink('goWeb')}>
                        <View className='m-title nm'>经纪人 <Text className='xs'>动动手指，赚点外快</Text></View>
                        <View className='icon-navs dis-flex'>
                            <View className='flex-auto'>
                                <View className='b-title'>可提现余额</View>
                                <View className='price'>{money.allowCash}</View>
                            </View>
                            <View className='flex-auto'>
                                <View className='b-title'>冻结资产</View>
                                <View className='price'>{money.frozen}</View>
                            </View>
                        </View>
                        <View className='more-txt c-33'>查看更多</View>
                    </View>
                    <View className='com-box mgt-15'>
                        <View className='m-title nm'>商家服务</View>
                        <View className='icon-navs dis-flex'>
                            <View className='at-col' onClick={go(rIndex.login)}>
                                <View className='iconfont c1 iconguanlizhongxin' /> 管理中心
                            </View>
                            <View className='at-col' onClick={go(rMine.service, {type: 1})}>
                                <View className='iconfont c2 iconzhaoshangjiameng' /> 招商服务
                            </View>
                            <View className='at-col' onClick={go(rMine.service, {type: 2})}>
                                <View className='iconfont c3 iconsanshuxian' /> 拓客引流
                            </View>
                            <View className='at-col' onClick={handleUserLink(rMine.verify)}>
                                <View className='iconfont c4 iconshenfenzheng' /> 实名认证
                            </View>
                            <View className='at-col' onClick={go(rMine.help)}>
                                <View className='iconfont c4 iconicon-test' /> 帮助中心
                            </View>
                        </View>
                    </View>
                </View>
                <BrokerReg />
            </View>
        </BaseView>
    )
}
