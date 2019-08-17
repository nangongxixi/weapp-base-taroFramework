
let globalData = {};

export function getGlobal(key) {
    return globalData[key]
}

export function setGlobal(key, value) {
    globalData[key] = value
}

/**
 * 分享用户id
 * @returns {*}
 */
export function getShareUid() {
    return getGlobal('shareUid')
}

export function setShareUid(uid) {
    setGlobal('shareUid', uid)
}
