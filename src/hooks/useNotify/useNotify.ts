// import { getCurrentInstance } from 'vue'
import { TYPE, useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { ToastOptions } from 'vue-toastification/dist/types/types'
import Notify from './Notify.vue'

export const useNotify = () => {
  // const vueInstance = getCurrentInstance()

  const toast = useToast()

  const notifyError = (
    error: any,
    options: (ToastOptions & { type?: TYPE.ERROR | undefined }) | undefined = {
      timeout: false,
    }
  ) => {
    const data = error.response.data.data
    const content = data instanceof Array ? data.join('\n') : data
    const componentMessage = {
      component: Notify,
      props: {
        title: `错误 ${error.response.status} - ${error.response.statusText}`,
        detail: content,
      },
      // listeners: {
      //   showDetail: () => {
      //     vueInstance?.ctx.$store.commit('updateDialogNotifyDetailContent', content)
      //     vueInstance?.ctx.$store.commit('toggleDialogNotifyDetailVisiable', true)
      //   },
      // },
    }

    toast.error(componentMessage, options)
  }
  return { notifyError }
}
