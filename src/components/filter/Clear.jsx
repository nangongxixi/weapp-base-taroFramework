import {Text, View} from "@tarojs/components";
import PropTypes from "prop-types";
import './Clear.less';

function Clear({clearItems, onReset}) {
    //const [v, setV] = useState(0);
    console.log('render: clear', clearItems);
    const hasItems = clearItems.length > 0;
    return (
        <View>
        {hasItems &&
            <View className='filters dis-flex text-center'>
                {clearItems.map((item) => {
                    return (
                        <Text
                          className='filter-clear flex-hide text-overflow'
                          key={item.id} onClick={() => item.onclick()}
                        >
                            {item.name}
                        </Text>
                    )
                })}
                <Text
                  className='filter-clear flex-hide'
                  onClick={() => onReset()}
                >
                    全部清除
                </Text>
            </View>
        }
        </View>
    )
}

Clear.propTypes = {
    clearItems: PropTypes.array,
    onReset: PropTypes.func,
};

Clear.defaultProps = {
    clearItems: [],
};

Clear.options = {
    addGlobalClass: true
};

export default Clear
