import {View} from "@tarojs/components";
import PropTypes from "prop-types";

function List({items, renderItem, className}) {
    return (
        <View className={className}>
            {items.map(renderItem)}
        </View>
    )
}

List.propTypes = {
    items: PropTypes.array,
    className: PropTypes.string,
    renderItem: PropTypes.func,
};

List.defaultProps = {
    items: [],
    className: '',
    renderItem: () => {},
};

List.options = {
    addGlobalClass: true
};

export default List
