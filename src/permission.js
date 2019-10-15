import router from "./router";
import store from "./store";

const whiteList = ["/login"]; // 无需令牌白名单

// 全局守卫
router.beforeEach(async (to, from, next) => {
  // 获取令牌判断用户是否登录
  const hasToken = localStorage.getItem("token");

  // 已登录
  if (hasToken) {
    if (to.path === "/login") {
      // 若已登录没有必要显示登录页，重定向至首页
      next({ path: "/" });
    } else {
      // 去其他路由，暂时放过
      // 接下来执行用户角色逻辑, todo
      const hasRoles =
        store.state.user.roles && store.state.user.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        //   请求角色信息
        try {
          const { roles } = await store.dispatch("user/getInfo");

          // 动态路由生成，todo
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles,
          );
          //   动态追加到router
          router.addRoutes(accessRoutes);

          // 路由在进来一次
          next({ ...to });
        } catch (error) {
          // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
          await store.dispatch("user/resetToken");
          next(`/login?redirect=${to.path}`);
          alert(error || "未知错误");
        }
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next();
    } else {
      // 重定向至登录页
      next(`/login?redirect=${to.path}`);
    }
  }
});
