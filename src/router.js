import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// 应用插件：做了什么？install
// install里面做了什么？
// 1.挂载$router
// 2.注册组件
Vue.use(Router)

// router做了什么？
// 1.解析路由配置
// 2.响应url变化
// 3.事件监听hashchange
// 4.组件切换？怎么切换
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
