import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    user: ''

  },
  mutations: {
    handleLoad(state, val) {
      state.loading = val
    },
    setUser(state, val) {
      state.user = val
    }
  },
  actions: {

  }
})
