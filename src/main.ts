import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.css'
import * as GlobalComponents from '@/components/common'
// import ElementPlus from 'element-plus'
import '@/assets/css/ep-custom.scss'
import { ElCard, ElTable, ElDialog, ElTableColumn, ElButton, ElLink, ElTag } from 'element-plus'
const GlobalComponentsElementPlus = [
  ElButton,
  ElCard,
  ElDialog,
  ElLink,
  ElTable,
  ElTableColumn,
  ElTag,
]

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const app = createApp(App)
app.use(router)
app.use(store)
// app.use(ElementPlus, { size: 'mini' })
app.config.globalProperties.$dayjs = dayjs
Object.entries(GlobalComponents).forEach((component) => app.component(component[0], component[1]))
GlobalComponentsElementPlus.forEach((component) => app.component(component.name, component))
app.mount('#app')
