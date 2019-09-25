import Vue from "vue";
import App from "./App.vue";
import emitter from "./mixins/emitter";
import Bus from './utils/bus';

Vue.config.productionTip = false;
Vue.mixin(emitter);
Vue.prototype.$bus = new Bus();

new Vue({
  render: h => h(App),
}).$mount("#app");
