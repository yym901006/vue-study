import Vue from "vue";
import Router from "vue-router";

import Index from "@/components/Index";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

// 每次用户请求都应该是全新router实例
// ？
export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      { path: "/", component: Index },
      { path: "/hello", component: HelloWorld },
    ],
  });
}
