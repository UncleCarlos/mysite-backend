import { createLogger, createStore } from 'vuex'

const store = createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {},
  plugins: import.meta.env.DEV ? [createLogger()] : [],
})

export default store
