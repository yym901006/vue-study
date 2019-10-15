const count = {
  namespaced: true,
  state: { count: 10 },
  mutations: {
    increment(state) {
      state.count += 1;
    }
  },
  actions: {
    increment({ getters, commit }) {
      // 添加业务逻辑
      if (getters.left > 0) {
        commit("increment");
        return true;// 返回结果
      }
      return false;// 返回结果
    },
    asyncIncrement({ dispatch }) {
      // 异步逻辑返回Promise
      return new Promise(resolve => {
        setTimeout(() => {
          // 复用其他action
          resolve(dispatch("increment"));
        }, 1000);
      });
    },
  }
};

export default count
