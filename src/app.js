import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'

import 'taro-ui/dist/style/index.scss'
import './resource/style/iconfont.css'
import './app.styl'

import Index from './pages/index'
import {setGlobal, setShareUid} from "./config/global";
import {isEnvProduct, isH5} from "./config";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (!isEnvProduct() && isH5()) {
  // require('nerv-devtools')
}

class App extends Component {
  config = {
    navigateToMiniProgramAppIdList: [
      'wx3100324a9b073ebe', // 九正
      'wx165097df9cacf151', // 商管家
      'wxfe87e1c27b7d19a1' // 九正建材网
    ],
    pages: [
      'pages/index/index',
      'pages/index/joinAdd',
      'pages/index/shopList',
      'pages/index/login',
      'pages/index/apply',
      'pages/index/book',
      'pages/index/bookDetail',
      'pages/index/search',
      'pages/index/bannerDetail',

      'pages/find/index',

      'pages/broker/index',
      'pages/broker/level',
      'pages/broker/friend',
      'pages/broker/recommend',
      'pages/broker/rule',
      'pages/broker/makeMoney',
      'pages/broker/login',
      'pages/broker/friend-child',

      'pages/mine/index',
      'pages/mine/help',
      'pages/mine/helpDetail',
      'pages/mine/hits',
      'pages/mine/serve',
      'pages/mine/collect',
      'pages/mine/brand',
      'pages/mine/login',
      'pages/mine/verify',

      'pages/com/success',
      'pages/com/topic',
      'pages/com/web-view',

      'pages/store/index',
      'pages/store/goods',
      'pages/store/goodsDetail',
      'pages/store/join',
      'pages/store/design',
      'pages/store/designDetail',
      'pages/store/shop',
      'pages/store/shopDetail',
      'pages/store/videoDetail',
      'pages/store/state',
      'pages/store/stateDetail',
      'pages/store/news',
      'pages/store/newsDetail'
],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '九正招商宝',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#666',
      selectedColor: '#ef2a32',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'resource/img/icon/home.png',
          selectedIconPath: 'resource/img/icon/home_on.png',
          text: '首页'
        },
        {
          pagePath: 'pages/find/index',
          iconPath: 'resource/img/icon/project.png',
          selectedIconPath: 'resource/img/icon/project_on.png',
          text: '找项目'
        },
        {
          pagePath: 'pages/broker/index',
          iconPath: 'resource/img/icon/person.png',
          selectedIconPath: 'resource/img/icon/person_on.png',
          text: '经纪人'
        },
        {
          pagePath: 'pages/mine/index',
          iconPath: 'resource/img/icon/mine.png',
          selectedIconPath: 'resource/img/icon/mine_on.png',
          text: '我的'
        }
      ]
    }
  };

  checkUpdateVersion () {
    // 创建 UpdateManager 实例
    const updateManager = Taro.getUpdateManager();
    // 检测版本更新
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        // 监听小程序有版本更新事件
        updateManager.onUpdateReady(function() {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(rs) {
              if (rs.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        });

        updateManager.onUpdateFailed(function() {
          // 新版本下载失败
          Taro.showModal({
            title: '已经有新版本咯~',
            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~'
          })
        })
      }
    })
  }

  componentWillMount () {
    let options = this.$router.params;
    console.log("app.onLaunch()", options);

    // 设置shareUid
    if (options.query) {
      if(!isH5() && options.query.scene){
        // 扫码进入
        let parts = options.query.scene.split('_');
        if (parts[1]) {
          setShareUid(parts[1]);
          setGlobal('scene', parts[1])
        } else {
          setGlobal('scene', parts[0])
        }
      } else {
        setShareUid(options.query.shareUid);
      }
    }
    !isH5() && this.checkUpdateVersion()
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
        <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'));
