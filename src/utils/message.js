import Taro from "@tarojs/taro";

export const showMsg = (msg) => {
    Taro.showToast({
        title: msg,
        icon: 'none'
    })
};

export const showConfirm = (msg, fn, title = '') => {
    Taro.showModal({
        title:title,
        content: msg,
    }).then(res => {
        res.confirm && fn && fn();
    })
};

export const showLoading = (title = 'loading') => {
    Taro.showLoading({
        title: title,
        mask: true
    })
};
export const hideLoading = () => {
    Taro.hideLoading()
};
