import {Swiper, SwiperItem, View} from "@tarojs/components";
import PropTypes from "prop-types";

function JSlider({height, items, onClick}) {
    let child = items.map((item, index) => {
        return (
            <SwiperItem key={item.id} className='swiper-item'>
                <View
                  className='bg-cov'
                  onClick={() => onClick(item, index)}
                  style={`background-image:url(${item.image}); height:${height}px;`}
                >
                </View>
            </SwiperItem>
        )
    });

    return (
        <Swiper indicatorDots circular autoplay
          indicatorActiveColor='#ddd'
          interval='3000' duration='1000'
          indicatorColor='rgba(255,255,255)'
          style={`height:${height}px`}
        >
            {child}
        </Swiper>
    )
}

JSlider.propTypes = {
    height: PropTypes.number,
    items: PropTypes.array,
    onClick: PropTypes.func
};

JSlider.defaultProps = {
    height: 190,
    items: [],
    onClick: () => {}
};

JSlider.options = {
    addGlobalClass: true
};

export default JSlider;
