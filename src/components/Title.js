import {Text, View} from "@tarojs/components";
import route from "@inc/router";
import PropTypes from "prop-types";

import "./Title.less";

function Title({
   name, title, more, hasMore,
   onClick, autoMb, path, pathWay, args
}) {
    const go = () => {
        if (path.length > 0) {
            route[pathWay ? 'ToRedirect' : 'ToPage'](path, args)
        }
        onClick()
    };

    return (
        <View
          className='title-box at-row at-row--wrap'
          style={autoMb ? 'margin-bottom:20px' : ''}
        >
            <View className='at-col at-col-6' onClick={go}>
                <View className='title'>{name}{title}</View>
            </View>
            <View className='at-col at-col-6' onClick={go}>
                {hasMore &&
                <View className='more'>
                    {more}
                    <Text className='iconfont iconjiantou' />
                </View>
                }
            </View>
        </View>
    )
}

Title.propTypes = {
    autoMb: PropTypes.bool,
    name: PropTypes.string,
    path: PropTypes.string,
    args: PropTypes.object,
    pathWay: PropTypes.string,
    title: PropTypes.string,
    more: PropTypes.string,
    onClick: PropTypes.func,
    hasMore: PropTypes.bool
};

Title.defaultProps = {
    title: '',
    name: '',
    autoMb: false,
    path: '',
    args: {},
    pathWay: '',
    more: '更多',
    onClick: () => {},
    hasMore: true
};

Title.options = {
    addGlobalClass: true
};

export default Title
