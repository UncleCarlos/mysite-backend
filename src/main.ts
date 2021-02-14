import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.css'
import * as GlobalComponents from '@/components/common'

import '@/assets/css/ep-custom.scss'
import {
  locale,
  ElButton,
  ElCard,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElLoading,
  ElImage,
} from 'element-plus'
const GlobalComponentsElementPlus = [
  ElImage,
  ElLoading,
  ElButton,
  ElCard,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  // ElNotification,
]
import lang from 'element-plus/lib/locale/lang/zh-cn'
locale(lang)

// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs.locale('zh-cn')
// dayjs.extend(relativeTime)
import Toast, { PluginOptions } from "vue-toastification";

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Toast)
// app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$ELEMENT = { size: 'small' }

Object.entries(GlobalComponents).forEach((component) => app.component(component[0], component[1]))
GlobalComponentsElementPlus.forEach((component) => app.component(component.name, component))

app.mount('#app')
