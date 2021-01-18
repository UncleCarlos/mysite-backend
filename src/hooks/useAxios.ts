import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import { Ref, ref, toRaw } from 'vue'
import Config from '/@/config'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import qs from 'qs'

nprogress.configure({ parent: '#nprogress-node' })
const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: Config.API_TIMEOUT,
})

const handleError = (error: AxiosError) => {
  return Promise.reject(error)
}
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  // request.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  // request.data = qs.stringify(request.data)
  return request
}, handleError)

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response
}, handleError)

export async function useAxios<T = any>(url: string, config?: AxiosRequestConfig) {
  nprogress.start()
  const response = ref<any>(null) as Ref<AxiosResponse<T> | undefined>
  const data = ref<any>(undefined) as Ref<T | undefined>
  const finished = ref(false)
  const canceled = ref(false)
  const error = ref<AxiosError<T> | undefined>()

  const cancelToken: CancelTokenSource = axios.CancelToken.source()
  const cancel = (message?: string) => {
    cancelToken.cancel(message)
    canceled.value = true
    nprogress.done()
  }

  await axiosInstance(url, { ...config, cancelToken: cancelToken.token })
    .then((res: AxiosResponse<T>) => {
      response.value = res
      data.value = res.data
    })
    .catch((e) => {
      error.value = e
    })
    .finally(() => {
      nprogress.done()
      finished.value = true
    })

  return {
    response,
    data,
    error,
    finished,
    cancel,
    canceled,
  }
}
