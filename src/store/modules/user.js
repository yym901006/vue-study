import {login, getInfo} from '@/api/user';

// 登录状态、登录动作
const state = {
  token: localStorage.getItem("token"),
  // 其他用户信息
  roles: [] // 用户角色
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES:(state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // 模拟用户登录
  login({ commit }, userInfo) {
    return login(userInfo).then((res) => {
      commit("SET_TOKEN", res.data);
      localStorage.setItem("token", res.data);
    });
    // const { username } = userInfo;
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (username === "admin" || username === "jerry") {
    //       commit("SET_TOKEN", username);
    //       localStorage.setItem("token", username);
    //       resolve();
    //     } else {
    //       reject("用户名、密码错误");
    //     }
    //   }, 1000);
    // });
  },
  getInfo({commit, state}) {
    return getInfo(state.token).then(({data: roles}) => {
      commit("SET_ROLES", roles);
      return {roles}
    })
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     const roles = state.token === 'admin' ? ['admin'] : ['editor'];
    //     commit('SET_ROLES', roles)
    //     resolve({roles})
    //   }, 200);
    // })
  },
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      localStorage.removeItem('token')
      resolve();
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
