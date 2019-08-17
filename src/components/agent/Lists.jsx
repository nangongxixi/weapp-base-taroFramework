import {View} from "@tarojs/components";
import PropTypes from "prop-types";
import AItem from "./AItem";
import AItemComm from "./AItemComm";

function Lists({type, items}) {
    const isRmd = type === 'rmd' || type === 'top'
    const child = items.map((info, index) => {
        return (
            isRmd
                ?
                <View key={info.id} className='at-col at-col-6'>
                    <AItem type={type} index={index} info={info} />
                </View>
                :
                <View key={info.id}>
                    <AItemComm info={info} />
                </View>
        )
    });

    return (
        <View className={isRmd ? 'at-row at-row--wrap' : ''}>{child}</View>
    )
}

Lists.propTypes = {
    type: PropTypes.string,
    items: PropTypes.array,
    onClick: PropTypes.func
};

Lists.defaultProps = {
    type: 'comm',
    items: []
};

Lists.options = {
    addGlobalClass: true
};

export default Lists;
