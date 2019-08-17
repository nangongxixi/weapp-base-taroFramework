import {View} from "@tarojs/components";

import {setPrice} from "@inc/store/category";
import {goto} from "@inc/router";
import rStore from "@inc/router/url/store";
import {usePrices} from "@config/constants";

import "./FilterBar.less";

function FilterBar() {
    const go = (item) => {
        setPrice(item.id)
        goto(rStore.find)
    };

    const AgentPrices = usePrices();
    const child = AgentPrices.map((item, index) => {
        return (
            <View className='at-col at-col-4' key={item.id} onClick={() => go(item)}>
                <View className={`filter-item f${index}`}>{item.name}</View>
            </View>
        )
    });

    return (
        <View className='filter-box at-row at-row--wrap'>
            {child}
        </View>
    )
}

FilterBar.options = {
    addGlobalClass: true
};

export default FilterBar
