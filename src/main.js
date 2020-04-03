import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

Vue.config.productionTip = false;


export function createApp(context) {
  // 1.创建路由器实例
  const router = createRouter()

  // 2.创建Vue实例
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  }).$mount("#app");

  return { app, router }
}

