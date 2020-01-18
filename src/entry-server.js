import { createApp } from "./main";

// 返回一个函数，接收请求上下文，返回创建的vue实例
export default context => {
  // 这里返回一个Promise，确保路由或组件准备就绪
  return new Promise((resolve, reject) => {
    // 获取vue、store、router实例
    const { app, router, store } = createApp(context);
    // 跳转到首屏的地址
    router.push(context.url);
    // 路由就绪，返回结果
    router.onReady(() => {
      // 获取匹配的路由组件数组
      const matchedComponents = router.getMatchedComponents();

      // 若无匹配则抛出异常
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      
      // 遍历所有匹配组件，查看是否有asyncData配置项
      // 如果存在则执行之，并解析其返回Promise
      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store, // store实例
              route: router.currentRoute, // 当前路由，可以传递额外路由参数
            });
          }
        })
      ).then(() => {
        // 还要把store状态返回到前端
        // 做法是按照约定将state设置到context.state属性上面
        // 这个字段会被renderer序列化为window.__INITIAL_STATE__
        context.state = store.state;

        // 所有异步请求结果全部返回，可以返回vue实例了
        resolve(app);
      }).catch(reject)
      
    }, reject);
  });
};