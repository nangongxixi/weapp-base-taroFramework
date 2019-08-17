import {View} from "@tarojs/components";
import PropTypes from "prop-types";
import {useAsyncEffect, cacheAsyncData} from "@util/index";
import {useState} from "@tarojs/taro";
import {rIndex} from "@inc/router/url";
import Title from "@com/Title";
import Joins from "@com/shop/Joins";
import {openShopSearch} from "@inc/service";

// import './JoinShop.less';

function JoinShop({nums}) {
    const [ items, setItems ] = useState([])

    useAsyncEffect(async () => {
        setItems(await cacheAsyncData(
            'indexRmdOpenShop',
            () => openShopSearch({page: 1, nums})
        ));
    });

    return (
        <View className='box1'>
            <Title name='开店捷报' autoMb path={rIndex.shopList} />
            <Joins items={items} />
        </View>
    )
}

JoinShop.propTypes = {
    nums: PropTypes.number,
};

JoinShop.defaultProps = {
    nums: 4
};

JoinShop.options = {
    addGlobalClass: true
};

export default JoinShop
