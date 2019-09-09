import Vue from 'vue'
import Vuex from 'vuex'
import count from './modules/count'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    a: count, user, permission
  },
  getters: {
    permission_routes: state => state.permission.routes, // 完整路由
    roles: state => state.user.roles,
    hasRoles: state => state.user.roles && state.user.roles.length > 0
  }
})
