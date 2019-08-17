import {BaseView} from '@com/index'
import {AtTabs, AtTabsPane} from 'taro-ui'
import Taro, {useState} from '@tarojs/taro'
import Brand from './widget/Brand'
import Goods from './widget/Goods'
import './hits.less'

export default function MineHitsPage() {
    const tabList = [{title: '招商项目'}, {title: '产品信息'}]
    const [current, setCurrent] = useState(0)

    Taro.setNavigationBarTitle({
        title: '最近浏览'
    })

    return (
        <BaseView>
            <AtTabs current={current} tabList={tabList} onClick={setCurrent}>
                <AtTabsPane current={current} index={0}>
                    <Brand />
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    <Goods />
                </AtTabsPane>
            </AtTabs>
        </BaseView>
    )
}
