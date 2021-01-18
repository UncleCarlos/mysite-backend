import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '/@/assets/css/index.css'
import '/@/assets/iconfont-anp'
// import '/@/assets/iconfont'
import globalComponents from '/@/components/Common'
import ElementPlus from 'element-plus'
import '/@/assets/css/ep-custom.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { size: 'mini' })

Object.entries(globalComponents).forEach((item) => app.component(item[0], item[1]))

app.mount('#app')
