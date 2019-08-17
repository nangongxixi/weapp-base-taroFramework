import Taro, {useState} from '@tarojs/taro'
import {BaseView, JScrollView} from '@com/index'
import {go, rMine} from '@inc/router'
import {AtList, AtListItem} from 'taro-ui'
import {getHelp} from '@inc/service/mine'

import './help.less'

export default function MineHelpPage() {
    const [items, setItems] = useState([]);
    Taro.setNavigationBarTitle({
        title: '帮助中心'
    });

    return (
        <BaseView>
            <JScrollView
              service={getHelp}
              onData={rs => setItems(rs)}
            >
                <AtList className='help'>
                    {items.map((item) => {
                        return (
                            <AtListItem
                              title={item.title}
                              arrow='right'
                              key={item.id}
                              onClick={go(rMine.helpDetail, {id: item.id})}
                            />
                        )
                    })}
                </AtList>
            </JScrollView>
        </BaseView>
    )
}
