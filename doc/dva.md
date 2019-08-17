


## DvaJs集成

解决:

1. 视图组件层专注于展示数据
2. Dva 负责组织数据(state), 负责页面逻辑(reducer), 负责与异步交互(effects)
    1. reducer计算出视图需要的state, 或是响应用户交互改变state
    2. effects调用api与服务器交互


安装依赖

```
npm i dva-core dva-loading --save
```

### 初始化Dva

```
# @see src/utils/dva.js
# @see src/app.js

#src/app.js

import { Provider } from '@tarojs/redux';
import dva from './utils/dva'
import models from './models';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

...
 render () {
    return (
      <Provider store={store}>
        <Index store={store} />
      </Provider>
    )
  }
...
```

### 挂载View使用model

```
# src/pages/index/index.js

import { connect } from '@tarojs/redux';
@connect(({ common }) => ({
  ...common
}))

...

  render () {
    const { nickname } = this.props;
    return (
      <View className='index'>
        <View>Hi, {nickname}</View>
        <Welcome name='stcer' />
        <Clock />
      </View>
    )
  }
...

```

参考

* src/app.js
* src/utils/dva.js
* src/models/*
* src/page/home/index.js

