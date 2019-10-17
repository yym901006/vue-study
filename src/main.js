import Vue from "vue";
import App from "./App.vue";
import emitter from "./mixins/emitter";
import Bus from "./utils/bus";

import router from "./router";
import store from "./store";

// import router from './krouter'
// import store from './kstore'

import "@/icons";
import './permission'
import vp from './directive/permission'
import './plugins/element.js'
Vue.directive('permission', vp);

Vue.config.productionTip = false;
Vue.mixin(emitter);
Vue.prototype.$bus = new Bus();
// console.log(router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
