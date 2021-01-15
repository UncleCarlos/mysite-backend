import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '/@/assets/css/index.css'

import '/@/assets/iconfont-anp'
// import '/@/assets/iconfont'
import Icon from '/@/components/Common/Icon.vue'

const app = createApp(App)
app.use(router)

app.component('Icon', Icon)

app.mount('#app')
