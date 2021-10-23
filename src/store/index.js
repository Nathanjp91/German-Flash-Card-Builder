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
      plural: '',
      meaning: '',
      examples: [],
      gender: '',
      images: [],
      endings: {}
    },
    cards: []
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
        plural: '',
        meaning: '',
        examples: [],
        gender: '',
        images: [],
        endings: {}
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
    addCard({commit, state}) {
      const currenteCard = state.currentCard
      if (state.cards.filter((card) => card.word === currenteCard.word).length >= 0) {
        commit('deleteCard', currenteCard)
      }
      commit('addCard', currenteCard)
      commit('newCard')
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
