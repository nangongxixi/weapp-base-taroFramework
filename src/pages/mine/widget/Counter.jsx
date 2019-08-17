import {Text} from "@tarojs/components";
import PropTypes from "prop-types";
import {useEffect, useState} from "@tarojs/taro";

function Counter({max, start, onFinish}) {
    console.log('render: Counter', start);
    const [ time, setTime ] = useState(max);
    useEffect(() => {
        if (!start) {
            return;
        }

        let interval = setInterval(() => {
            setTime(t => {
                if(t === 0){
                    clearInterval(interval);
                    console.log('Debug: time finish');
                    onFinish();
                    return max;
                }
                return t -1;
            })
        }, 1000);
        return () => clearInterval(interval)
    }, [start]);

    return (
        <Text>{time}</Text>
    )
}

Counter.propTypes = {
    max: PropTypes.number,
    start: PropTypes.bool,
    onFinish: PropTypes.func,
};

Counter.defaultProps = {
    max: 60,
    start: false,
    onFinish: () => {}
};

Counter.options = {
    addGlobalClass: true
};

export default Counter
