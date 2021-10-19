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
    },
    cards: [
      { 
        type: 'noun',
        content: {
          word: 'Katze',
          gender: 'Feminine',
          images: [],
        }
      },
      {
        type: 'verb',
        content: {
          word: 'Essen',
          images: []
        }
      },
      {
        type: 'adjective',
        content: {
          word: 'Blau',
          images: []
        }
      }
    ]
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
