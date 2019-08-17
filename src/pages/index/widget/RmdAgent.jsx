import {useAsyncEffect, cacheAsyncData} from "@util/index";
import PropTypes from "prop-types";
import {useState} from "@tarojs/taro";
import Lists from "@com/agent/Lists";
import {View} from "@tarojs/components";
import Title from "@com/Title";
import {go} from "@inc/router";
import rStore from "@inc/router/url/store";
import {shopSearch} from "@inc/service";
import FilterBar from "./FilterBar";
import BrandTitle from "./BrandTitle";

function RmdAgent({nums = 8}) {
    const [ topItems, setTopItems ] = useState([]);
    const [ rmdItems, setRmdItems ] = useState([]);

    useAsyncEffect(async () => {
        const data = await cacheAsyncData('agentIndexRmd', () => {
            return shopSearch({
                rmd: true,  yx: 1, nums: 10, at: 'index'
            })
        });
        setRmdItems(data);
    }, [nums]);

    return (
        <View className='box1'>
            <Title name='优选项目' onClick={go(rStore.find)} />

            <View style='margin-top : 20px'>
                <FilterBar />
                <View style='margin-top: -20rpx;'>
                  <Lists type='rmd' items={rmdItems} />
                </View>
            </View>
        </View>
    )
}

RmdAgent.propTypes = {
    nums: PropTypes.number,
};

RmdAgent.defaultProps = {
    nums: 6,
};

RmdAgent.options = {
    addGlobalClass: true
};

export default RmdAgent
