import {Image, View} from "@tarojs/components";
import PropTypes from "prop-types";
import {go, rStore} from "@inc/router";
import './Joins.less';

function Joins({items}) {
    const child = items.map((item, index) => {
        return (
            <View
              key={item.id}
              className='at-col-6'
              onClick={go(rStore.shopDetail, {id: item.id})}
            >
                <View className={`goods-box ${index % 2 === 0 ? 'g1' : 'g2'}`}>
                    <Image className='pic' src={item.logo} />
                    <View className='title text-overflow'>{item.title}</View>
                    <View className='txt line2-overflow'>{item.remark}</View>

                    <View className='at-row address-box'>
                        <View className='at-col at-col-8 text-overflow address'>
                            {item.address}
                        </View>
                        <View className='at-col at-col-4 text-right date'>
                            {item.cdate}
                        </View>
                    </View>
                </View>
            </View>
        )
    });

    return (
        <View className='shop-list1 at-row at-row--wrap'>
            {child}
        </View>
    )
}

Joins.propTypes = {
    items: PropTypes.array,
};

Joins.defaultProps = {
    items: []
};

Joins.options = {
    addGlobalClass: true
};

export default Joins
