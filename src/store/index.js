import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    credentials: {
      unsplashApiKey: "",
      unsplashApiSecret: "",
      oxfordAppID: "",
      oxforedAppKey: ""
    }
  },
  mutations: {
    setCredentials(state, payload) {
      state.credentials = payload
    }
  },
  actions: {
    setCredentials({commit}, payload) {
      commit('setCredentials', payload)
    }
  },
  modules: {
  }
})
