// import { getCurrentInstance } from 'vue'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { ToastID, ToastOptions } from 'vue-toastification/dist/types/types'
import Notify from './Notify.vue'

const componentMessage = (title: string, message?: string) => {
  return {
    component: Notify,
    props: {
      title,
      message,
    },
  }
}

export const useNotify = () => {
  const toast = useToast()
  const defaultOptions: ToastOptions & { type: undefined } = { type: undefined, timeout: 6 * 1000 }

  const argsParser = (...rest: any[]) => {
    if (rest.length === 2) return { message: rest[0], options: rest[1] }
    else if (typeof rest[0] === 'string') return { message: rest[0] }
    else return { options: rest[0] || {} }
  }
  function notifyError(title: string): ToastID
  function notifyError(title: string, message: string): ToastID
  function notifyError(title: string, options: ToastOptions): ToastID
  function notifyError(title: string, message: string, options: ToastOptions): ToastID
  function notifyError(title: string, ...rest: any[]): ToastID {
    const result = argsParser(...rest)
    return toast.error(
      componentMessage(title, result.message),
      Object.assign({}, defaultOptions, { timeout: false }, result.options)
    )
  }
  function notifyWarning(title: string): ToastID
  function notifyWarning(title: string, message: string): ToastID
  function notifyWarning(title: string, options: ToastOptions): ToastID
  function notifyWarning(title: string, message: string, options: ToastOptions): ToastID
  function notifyWarning(title: string, ...rest: any[]) {
    const result = argsParser(...rest)
    return toast.warning(
      componentMessage(title, result.message),
      Object.assign({}, defaultOptions, result.options)
    )
  }
  function notifySuccess(title: string): ToastID
  function notifySuccess(title: string, message: string): ToastID
  function notifySuccess(title: string, options: ToastOptions): ToastID
  function notifySuccess(title: string, message: string, options: ToastOptions): ToastID
  function notifySuccess(title: string, ...rest: any[]) {
    const result = argsParser(...rest)
    return toast.success(
      componentMessage(title, result.message),
      Object.assign({}, defaultOptions, result.options)
    )
  }
  function notifyInfo(title: string): ToastID
  function notifyInfo(title: string, message: string): ToastID
  function notifyInfo(title: string, options: ToastOptions): ToastID
  function notifyInfo(title: string, message: string, options: ToastOptions): ToastID
  function notifyInfo(title: string, ...rest: any[]) {
    const result = argsParser(...rest)
    return toast.info(
      componentMessage(title, result.message),
      Object.assign({}, defaultOptions, result.options)
    )
  }

  const dismissNotify = (id: string | number) => {
    toast.dismiss(id)
  }
  // function notifyError(
  //   content: { title: string; massage: string },
  //   options: (ToastOptions & { type?: TYPE.ERROR | undefined }) | undefined = {
  //     timeout: false,
  //   }
  // ) {
  //   // const data = error.response.data.data
  //   // const content = data instanceof Array ? data.join('\n') : data
  //   // const componentMessage = {
  //   //   component: Notify,
  //   //   props: {
  //   //     title: `错误 ${error.response.status} - ${error.response.statusText}`,
  //   //     detail: content,
  //   //   },
  //   //   // listeners: {
  //   //   //   showDetail: () => {
  //   //   //     vueInstance?.ctx.$store.commit('updateDialogNotifyDetailContent', content)
  //   //   //     vueInstance?.ctx.$store.commit('toggleDialogNotifyDetailVisiable', true)
  //   //   //   },
  //   //   // },
  //   // }

  //   toast.error(componentMessage(content.title, content.massage), options)
  // }
  return { notifyError, notifyWarning, notifySuccess, notifyInfo, dismissNotify }
}
