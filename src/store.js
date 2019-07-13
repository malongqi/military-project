import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    user: '',
    showLogin: false
  },
  mutations: {
    handleLoad(state, val) {
      state.loading = val
    },
    setUser(state, val) {
      state.user = Object.assign({}, val)
    },
    setLoginState(state, val) {
      state.showLogin = val
    }
  },
  actions: {

  }
})
