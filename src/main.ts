import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import BadgeDirective from 'primevue/badgedirective';
// import 'primevue/resources/themes/vela-orange/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import PrimeVueComponents from './primevue'

import '@/assets/css/index.css'
// import GlobalComponents from '@/components/common'

import CarlosComponents from 'carlos-components'
import 'carlos-components/dist/style.css'

import Toast, { PluginOptions } from 'vue-toastification'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue, { ripple: true })
app.use(Toast)
app.use(CarlosComponents)

Object.entries(PrimeVueComponents).forEach((component) =>
  app.component(`P${component[0]}`, component[1])
)
// Object.entries(GlobalComponents).forEach((component) => app.component(component[1].name, component[1]))

app.directive('ripple', Ripple)
app.directive('badge', BadgeDirective)

app.mount('#app')
