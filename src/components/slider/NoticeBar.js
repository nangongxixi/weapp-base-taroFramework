import {View, Swiper, SwiperItem} from "@tarojs/components";
import PropTypes from "prop-types";
import './Noticebar.css'

function NoticeBar({height = 40, items, color = '#333', onClick, indicatorDots = false}) {
    let child = items.map((item, index) => {
        return (
            <SwiperItem key={item.id} onClick={() => onClick(item, index)}>
                <View
                  className='slide-txt text-overflow'
                  style={`height: ${height}px; color:${color};`}
                >
                    {item.content || item.title}
                </View>
            </SwiperItem>
        )
    });

    return (
        <Swiper
          vertical indicatorDots={indicatorDots} circular autoplay
          indicatorActiveColor='#ddd'
          interval='3000' duration='1000'
          indicatorColor='rgba(255,255,255)'
          style={`height:${height}px`}
        >
            {child}
        </Swiper>
    )
}

NoticeBar.propTypes = {
    height: PropTypes.number,
    color: PropTypes.string,
    items: PropTypes.array,
    onClick: PropTypes.func,
    indicatorDots: PropTypes.bool
};

NoticeBar.defaultProps = {
    items: [],
    onClick: () => {}
};

NoticeBar.options = {
    addGlobalClass: true
};

export default NoticeBar;
