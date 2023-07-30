import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: 'unknown',
      nickname: '未登录'
    },
    menus: []
  },
  mutations: {
    login(state, user) {
      state.user = user
    },
    logout(state) {
      state.user = {
        username: 'unknown',
        nickname: '未登录'
      }
      state.menus = []
    },
    initMenu(state, data) {
      state.menus = data
    }
  },
  actions: {
  },
  modules: {
  }
})
