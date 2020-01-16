import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

// 修改1：路由这里是工厂函数
export function createRouter() {
  return new VueRouter({
    routes: [
      { path: "/", component: Home },
      { path: "/about", component: About }
    ]
  });
}
