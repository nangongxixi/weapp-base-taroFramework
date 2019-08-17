import {Text, View} from "@tarojs/components";
import {useAsyncEffect} from "@util/index";

import PropTypes from "prop-types";
import {useState} from "@tarojs/taro";
import {setCategory} from "@inc/store/category";
import {goto} from "@inc/router";
import rStore from "@inc/router/url/store";

import {AgentCategoryAll} from "@config/constants";
import {shopIndustry} from "@inc/service";
import "./Menu.less";

function Menu({max = 7, showAll = false, color}) {
    const [ items, setItems ] = useState([])

    useAsyncEffect(async () => {
        setItems(await shopIndustry());
    });

    const onClick = (item, index) => {
        item.index = index
        setCategory(item)
        goto(rStore.find)
    };

    const itemClass = `at-col menu-item text-overflow`;
    const child = items.map((item, index) => {
        if(!showAll && index >= max) {
            return;
        }

        return (
            <View
              key={item.id}
              className={itemClass}
              onClick={() => onClick(item, index)}
            >
                <View className={`iconfont ${item.icon} c${color[index % 8]}`} />
                <Text>{item.name}</Text>
            </View>
        )
        });

    const more = !showAll && items.length > max &&
        <View className={itemClass} onClick={() => onClick(AgentCategoryAll, -1)}>
            <View className='iconfont icongengduo c3' />
            <Text>更多</Text>
        </View>

    return (
        <View className='icon-nav text-center at-row at-row--wrap xs mgt-15'>
            {child}
            {more}
        </View>
    )
}

Menu.propTypes = {
    items: PropTypes.array,
    color: PropTypes.array,
    max: PropTypes.number,
    showAll: PropTypes.bool,
};

Menu.defaultProps = {
    color: [1, 2, 3, 4, 4, 1, 2, 3],
    items: [],
};

Menu.options = {
    addGlobalClass: true
};

export default Menu
