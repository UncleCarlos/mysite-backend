import { createLogger, createStore } from 'vuex'

const store = createStore({
  state: {
    zoomLevel: 3,
    dialogNotifyDetailVisiable: false,
    dialogNotifyDetailContent: null,
  },
  getters: {},
  actions: {},
  mutations: {
    toggleDialogNotifyDetailVisiable(state, value) {
      state.dialogNotifyDetailVisiable = value
    },
    updateDialogNotifyDetailContent(state, value) {
      state.dialogNotifyDetailContent = value
    },
    updateZoomLevel(state, value) {
      state.zoomLevel = value
    },
  },
  modules: {},
  plugins: import.meta.env.DEV ? [createLogger()] : [],
})

export default store
