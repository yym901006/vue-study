import router from './router'
import store from './store'

const whiteList = ['/login'] // 无需令牌白名单

router.beforeEach(async (to, from, next) => {

  // 获取令牌判断用户是否登录
  const hasToken = store.state.user.token;

  // 已登录
  if (hasToken) {
    if (to.path === '/login') {
      // 若已登录没有必要显示登录页，重定向至首页
      next({ path: '/' })
    } else {        
      // 去其他路由，暂时放过
      // next()  
      // 接下来执行用户角色逻辑
      // 先判断是否有角色
      if (store.getters.hasRoles) {
        next();
      } else {
        try {
          const {roles} = await store.dispatch('user/getInfo')
        
          // 动态生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 添加
          router.addRoutes(accessRoutes)
          // 继续路由切换
          next({...to, replace: true})
          
        } catch (error) {
          // 出错重置令牌
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          alert(error || '未知错误')
        }
        
        
      }
    }
  } else {// 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next()
    } else {
      // 重定向至登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})