import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
// import 'primevue/resources/themes/vela-orange/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import PrimeVueComponents from './primevue'

import '@/assets/css/index.css'
import * as GlobalComponents from '@/components/common'

// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs.locale('zh-cn')
// dayjs.extend(relativeTime)
import Toast, { PluginOptions } from 'vue-toastification'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(Toast)
// app.config.globalProperties.$dayjs = dayjs

Object.entries(PrimeVueComponents).forEach((component) =>
  app.component(`P${component[0]}`, component[1])
)
Object.entries(GlobalComponents).forEach((component) => app.component(component[0], component[1]))
app.directive('ripple', Ripple)

app.mount('#app')
