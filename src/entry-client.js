// 客户端也需要创建vue实例
import { createApp } from './main';

const {app, router, store} = createApp()

// 判断是否存在state，则需要做初始化
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 挂载激活
  app.$mount('#app')
})