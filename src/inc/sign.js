import md5 from "md5";
import {isH5} from "@config/index";
import {cacheAsyncData} from "@util/index";
import request from "@util/request";

const isEnvH5 = isH5();

export default async function makeSign(api, data) {
    if(!isEnvH5) {
        return Promise.resolve(data);
    }
    return cacheAsyncData('SignApis', () => {
        try {
            return request('/agent/signApis')
        } catch (e) {
            return []
        }
    }).then((enableSignApis) => {
        if (enableSignApis.includes(api)){
            genSign(data);
        }
        return data;
    })
}

let _b = '0x707764';
let _a = '0x6a6164';
let _c = '0x303124';

function genSign(data) {
    data.time = new Date().getTime();
    data.noise = randomString(5);
    data.sign = md5(
        data.noise +
        hex2str(_a) + hex2str(_b) + hex2str(_c) +
        data.time
    )
}

function randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function hex2str(hex) {
    let trimStr = hex.trim();
    let rawStr = trimStr.substr(0,2).toLowerCase() === "0x" ? trimStr.substr(2) : trimStr;
    let len = rawStr.length;
    if(len % 2 !== 0) {
        return "";
    }
    let curCharCode;
    let resultStr = [];
    for(let i = 0; i < len;i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16);
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}
