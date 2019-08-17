import Taro from '@tarojs/taro'
import {getJzAppId, getSgjAppId, isH5} from "@config/index";
import { rIndex, rStore, rBroker } from './url'

export * from './url'

const topPages = [rStore.find, rIndex.index, rBroker.index]
const router = {
  genUrl(page, data) {
    return buildQuery(page, data)
  },

  toIm(toUid, type) {
    this.ToPage('cardIM', {
      toUid,
      type
    })
  },

  /**
   * 打开新页面, 将当前压入路由栈
   * @param page
   * @param data
   * @constructor
   */
  ToPage(page, data) {
    if (toJzPage(page, data)) {
      return
    }

    if (toSgjPage(page, data)) {
      return
    }

    if (isH5()) {
      Taro.navigateTo({
        url: this.genUrl(page, data)
      })
    } else if(topPages.includes(page)) {
      this.ToNavBar(page)
    } else {
      setTimeout(() => {
        // 解决 formid无法获取bug
        Taro.navigateTo({
          url: this.genUrl(page, data)
        })
      }, 100)
    }
  },

  /**
   * 关闭当前页面, 重定向到下一页面
   * @param page
   * @param data
   * @constructor
   */
  ToRedirect(page, data) {
    if (toJzPage(page, data)) {
      return
    }

    if(isH5()) {
      this.ToPage(page, data)
      return
    }

    setTimeout(() => {
      Taro.redirectTo({
        url: this.genUrl(page, data)
      })
    }, 100)
  },

  /**
   * 清除路由栈, 跳转到tab对应的页面
   * @param page
   * @constructor
   */
  ToNavBar(page) {
    if(isH5()) {
      this.ToPage(page)
      return
    }

    setTimeout(() => {
      Taro.switchTab({
        url: this.genUrl(page)
      })
    }, 100)
  },

  reLaunch(page, data) {
    if(isH5()) {
      this.ToPage(page, data)
      return
    }

    Taro.reLaunch({
      url: this.genUrl(page, data)
    })
  }
}

function buildQuery(path, data) {
  if (data && !data.changedTouches) {
    let str = '';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let val = data[key];
        str = (str ? str + '&' : str) + key + '=' + encodeURIComponent(
            val.trim ? val.trim() : val
        );
      }
    }
    path = path + (path.indexOf('?') > 0 ? '&' : '?') + str
  }
  if (path.substring(0, 1) !== '/') {
    path = '/' + path
  }
  console.log('url:', path)
  return path
}


const jzAppPages = {
  shopIndex: 'pages/shop/index'
  // shopGoods: 'pages/goods/detail',
  // serviceJoinShop: 'modulesService/pages/join_shop',
  // shopTrends: 'pages/shop/trends'
};

function toJzPage(page, args) {
  if (!jzAppPages[page]) {
    return false
  }

  Taro.navigateToMiniProgram({
    appId: getJzAppId(),
    path: buildQuery(jzAppPages[page], args),
    envVersion: 'develop',
    success(res) {
      console.log('Go jz app:', res)
    }
  });

  return true
}

export default router

export function goto(...args) {
  return router.ToPage(...args);
}

export function go(...args) {
  return () => {
    router.ToPage(...args)
  };
}

const sgjAppPages = {
  sgjLogin: 'pages/login'
};

export function toSgjPage(page, args) {
  if (!sgjAppPages[page]) {
    return false
  }

  Taro.navigateToMiniProgram({
    appId: getSgjAppId(),
    path: buildQuery(sgjAppPages[page], args),
    envVersion: 'develop',
    success(res) {
      console.log('Go jz app:', res)
    }
  })

  return true
}
