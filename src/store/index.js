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
    currentCard: {
      type: 'Noun',
      word: '',
      meaning: '',
      example: '',
      gender: '',
      images: [],
      endings: {}
    },
    cards: [
      { 
        type: 'noun',
        word: 'Katze',
        example: '',
        gender: 'Feminine',
        images: []
      },
      { 
        type: 'verb',
        word: 'Essen',
        example: '',
        endings: {},
        images: []
      },
      { 
        type: 'Adjective',
        word: 'Blau',
        example: '',
        images: []
      }
    ]
  },
  mutations: {
    setCredentials(state, payload) {
      state.credentials = payload
    },
    addCard(state, payload) {
      state.cards.push(payload)
    },
    deleteCard(state, payload) {
      state.cards = state.cards.filter((card) => card.word !== payload.word)
    },
    setCurrentCard(state, payload) {
      state.currentCard = payload
    },
    newCard(state) {
      state.currentCard = {
        type: 'Noun',
        word: '',
        meaning: '',
        example: '',
        images: [],
      }
    },
    updateCard(state, payload) {
      state.currentCard = {...state.currentCard, ...payload}
    },
  },
  actions: {
    setCredentials({commit}, payload) {
      commit('setCredentials', payload)
    },
    addCard({commit, state}, payload) {
      if (state.cards.filter((card) => card.word === payload.word).length >= 0) {
        commit('deleteCard', payload)
      }
      commit('addCard', payload)
    },
    deleteCard({commit}, payload) {
      commit('deleteCard', payload)
    },
    setCurrentCard({commit}, payload) {
      commit('setCurrentCard', payload)
    },
    newCard({commit}) {
      commit('newCard')
    },
    updateCard({commit}, payload) {
      commit('updateCard', payload)
    }
  },
  modules: {
  }
})
