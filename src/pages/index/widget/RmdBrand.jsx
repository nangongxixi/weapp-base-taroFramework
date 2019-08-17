import {useAsyncEffect, cacheAsyncData} from "@util/index";
import PropTypes from "prop-types";
import {useState} from "@tarojs/taro";
import Lists from "@com/agent/Lists";
import {View} from "@tarojs/components";

import {shopSearch} from "@inc/service";
import BrandTitle from "./BrandTitle";

function RmdBrand({nums, initIndex}) {
    const [rmd, setRmd] = useState(initIndex);
    const [items, setItems] = useState([]);

    useAsyncEffect(async () => {
        setItems(await cacheAsyncData(`agentIndexRmd2${rmd}`, () => shopSearch({rmd, nums})));
    }, [rmd]);

    return (
        <View className='box1'>
            <BrandTitle active={rmd} onClick={(item) => setRmd(item.id)} />
            <Lists items={items} />
        </View>
    )
}

RmdBrand.propTypes = {
    nums: PropTypes.number,
    initIndex: PropTypes.number,
};

RmdBrand.defaultProps = {
    nums: 8,
    initIndex: 1
};

RmdBrand.options = {
    addGlobalClass: true
};

export default RmdBrand
