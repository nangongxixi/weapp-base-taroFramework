import Taro from '@tarojs/taro'

let getPhoneNum = function (phone) {
    let phones = phone.split(/\s+|\u3000+/);
    let ablePhone = phones.pop();
    for (var i = 0; i < phones.length; i++) {
        if (phones[i].match(/^1\d{10}$/)) {
            return phones[i]
        }
    }

    if (ablePhone.length < 7) {
        return phone
    } else {
        return ablePhone
    }
};

// 验证是否是手机号码
export function vailPhone(number) {
    let flag = true;
    let myreg = /^(1[0-9]{10})$/;

    if (!number || number.length !== 11 || !myreg.test(number)) {
        flag = false
    }
    return flag
}

export function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

export function call(phone) {
    Taro.makePhoneCall({
        phoneNumber: getPhoneNum(phone)
    })
}

//数字返回2位数
export function numLen(num) {
    num = num + '';
    return num.length === 1 ? 0 + num : num
}

//时间转换
export function timeParse(time) {
    const date = time ? time : new Date()
    const year = date.getFullYear()
    const month = numLen((date.getMonth() + 1))
    const day = numLen(date.getDate())
    const hours = numLen(date.getHours())
    const minutes = numLen(date.getMinutes())
    const seconds = numLen(date.getSeconds())
    return {year, month, day, hours, minutes, seconds}
}

//时间格式化
export function formatTime(time, unit) {
    const {year, month, day, hours, minutes, seconds} = timeParse(time)
    const ny = `${year}-${month}`
    const nyr = `${ny}-${day}`
    const sfm = `${nyr} ${hours}:${minutes}:${seconds}`
    const res = {ny, nyr, sfm}
    return unit ? res[unit] : ny
}

// 元素滚动高度获取
export function getScrllTop(ele, fn) {
    const query = Taro.createSelectorQuery();
    setTimeout(() => {
        query.select(ele).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(res => fn(res[0].top));
    }, 200);
}

/**
 * 解析id参数
 * @param options
 * @param idKey
 * @returns {*}
 */
export function parseReqId(options, idKey) {
    if (!idKey) {
        idKey = 'id'
    }

    if (options[idKey]) {
        return options[idKey]
    }

    if (options.scene) {
        let parts = options.scene.split('_')
        return parts[0]
    }
    return 0
}

// 数组去重
export function uniq(array) {
    let temp = []; //一个新的临时数组
    for (let i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) === -1) {
            temp.push(array[i]);
        }
    }
    return temp;
}

