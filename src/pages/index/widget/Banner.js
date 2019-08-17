import {View} from "@tarojs/components";
import {goto} from "@inc/router";
import {rIndex, rCom, rStore} from "@inc/router/url";
import {useAsyncEffect} from "@util/index";
import {JSlider} from "@com/index";

import PropTypes from "prop-types";
import {useState} from "@tarojs/taro";
import {getBanners} from "@inc/service";
import './Banner.less'

function Banner({height, search}) {
    const [banners, setBanners] = useState([]);

    useAsyncEffect(async () => {
        let items = await getBanners();
        items = items.map((item) => {
            item.image = item.banner;
            return item
        });
        setBanners(items);
    });

    const go = (item) => {
        if (item.isLink) {
            if (item.isGoods) {
                goto(rStore.goodsDetail, {id: item.info_id})
            }
            if (item.isShop) {
                goto(rStore.index, {id: item.info_id})
            }
            if (item.isTopic) {
                goto(rCom.topic, {id: item.info_id})
            }
        } else {
            goto(rIndex.bannerDetail, {id: item.id})
        }
    };

    return (
        <View className='index-top-banner'>
            {
                search &&
                <View
                  className='iconfont iconiconiconfontzhizuobiaozhun22'
                  onClick={() => goto(rIndex.search)}
                >
                    品牌搜索
                </View>
            }
            <JSlider items={banners} onClick={go} height={height} />
        </View>
    )
}

Banner.propTypes = {
    height: PropTypes.number,
    search: PropTypes.bool
};

Banner.defaultProps = {
    height: 190,
    search: false
};

export default Banner
