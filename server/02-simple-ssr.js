// 传统web，网页内容在服务端渲染完成，一次性传输到浏览器。
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express')
const app = express()

// 导入Vue
const Vue = require('vue')
// 导入Vur-Router
const Router = require('vue-router')
Vue.use(Router)

// 渲染器导入
const { createRenderer } = require('vue-server-renderer')

// 创建一个渲染器
const renderer = createRenderer()

// 问题1不能交互
// 问题2不能同构开发
// 问题3路由处理问题
app.get('*', async function (req, res) {
  // 创建一个router实例
  const router = new Router({
    mode:'history',
    routes: [
      {path:'/', component: {template:'<div>index page</div>'}},
      {path:'/detail', component: {template:'<div>detail page</div>'}},
    ]
  })
  // 创建一个Vue实例
  const vm = new Vue({
    data: {name:'村长真棒'},
    template: `<div @click="onClick">
      <router-link to="detail">detail</router-link>
      <router-view></router-view>
    </div>`,
    router,
    methods: {
      onClick() {
        console.log('hello');     
      }
    }
  })
  try {
    // 跳转至url对应路由页面
    // 首屏渲染
    router.push(req.url)
    const html = await renderer.renderToString(vm)

    // bundlerenderer.renderToString({url:req.url})
    // 将渲染html字符串返回给客户端
    res.send(html)
  } catch (error) {
    // 将错误信息返回给用户
    res.status(500).send('服务器渲染错误，请重试！')
  }
  
})

app.listen(3000)