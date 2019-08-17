import { NoData } from '@com/index'
import {ScrollView, View} from '@tarojs/components'
import PropTypes from 'prop-types'

function JScroll({page, options, onScroll}) {
    console.log('render: JScrollView');
    const isNotFound = options.isStart
        && page === 1
        && options.result
        && options.result.length === 0;

    const isFinished = !isNotFound
        && options.result
        && options.result.length === 0;

    const handleScroll = () => {
        if(!options.isLoading || isFinished) {
            onScroll(page + 1)
        }
    };

    return (
        <ScrollView
          className='flex-auto'
          scrollY
          onScrollToLower={handleScroll}
        >
            {isNotFound && <NoData />}
            {this.props.children}
            {options.error && <View>Sorry, 加载出错了, 请稍后再试</View>}
            {options.isLoading && <View>正在加载中</View>}
            {isFinished && <View>数据已加载完, 我是有底线的</View>}
        </ScrollView>
    )
}

JScroll.propTypes = {
    onScroll: PropTypes.func,
    options: PropTypes.object,
    page: PropTypes.number,
};

JScroll.defaultProps = {
    options: {
        isStart: false,
        isLoading: false,
        error: null,
        result: [],
    },
    page: 1,
    onScroll: () => {}
};

JScroll.options = {
    addGlobalClass: true
};

export default JScroll
