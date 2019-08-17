
class UserModel {
    constructor(info) {
        this.info = info
    }

    _get(key) {
        return this.info[key]
    }

    set(info) {
        this.info = {...info}
    }

    getInfo() {
        return this.info
    }

    getId() {
        return this._get('uid')
    }

    getToken() {
        return this._get('token')
    }

    isBindPhone() {
        return this._get('isBindPhone')
    }

    isAuthBaseInfo() {
        return this._get('isAuthBaseInfo')
    }

    hasCard() {
        return this._get('isHasCard')
    }

    isGuest() {
        return this._get('uid') !== 0;
    }
}

export default UserModel
