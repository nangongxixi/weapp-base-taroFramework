import {useCallback, useState} from "@tarojs/taro";

export function useInputValue(initialValue, initFocus = false) {
    const [value, setValue] = useState(initialValue);
    const [focus, setFocus] = useState(initFocus);
    const onChange = useCallback(function (event) {
        setValue(event.currentTarget.value);
    }, []);

    return {
        value,
        onChange,
        focus,
        setFocus
    };
}

export function useInputFocus(initFocus= {}) {
    const [focus, setFocus] = useState(initFocus);
    const onFocus = useCallback(function(key) {
        setFocus({[key]: true});
    }, []);

    return {
        focus,
        onFocus
    };
}

/**
 * select 选择器
 * @param initialValue object
 * @param initialIndex object
 * @returns {{setPickerVal: *, onChange: *, pickerVal: *, pickerInd: *}}
 */
export function usePicker(initialValue = {}, initialIndex = {}) {
    const [pickerVal, setPickerVal] = useState(initialValue);
    const [pickerInd, setPickerInd] = useState(initialIndex);
    const onChange = useCallback(function (event, values, key) {
        const index = event.detail.value;
        pickerVal[key] = values[index];
        pickerInd[key] = index;
        setPickerVal(pickerVal);
        setPickerInd(pickerInd)
    }, []);

    return {
        pickerVal,
        pickerInd,
        onChange,
        setPickerVal
    }
}
