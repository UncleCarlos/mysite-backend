import { AxiosRequestConfig } from 'axios'
import Config from '@/config'
import { IQueryOptions } from '@/types/interface'
import { useAxios } from './useAxios'
import nprogress from 'nprogress'
import { useNotify } from './useNotify'
import { ref } from 'vue'

const versionPrefix = ''
const api = {
  getFeedList: 'feeders',
  getFeed: 'feeders/',
  getSourceList: 'sources',
  getCollector: 'collector',
}

const axiosConfig = { baseURL: Config.API_BASE_URL, timeout: Config.API_TIMEOUT }

export function useService() {
  const { notifyError, notifyWarning, dismissNotify } = useNotify()

  /** 获取饲料列表 */
  const serviceGetFeedList = (params: IQueryOptions) => exec({ url: api.getFeedList, params })
  /** 获取饲料详情 */
  const serviceGetFeed = (id: string) => exec({ url: `${api.getFeed}${id}` })
  const serviceGetSourceList = (params: IQueryOptions) => exec({ url: api.getSourceList, params })
  /** 获取采集器状态 */
  const serviceGetCollectorStatus = () => exec({ url: api.getCollector })

  /** 执行服务 */
  const exec = async (options: AxiosRequestConfig) => {
    let overtimeToastID: string | number = 0
    nprogress.start()
    const startAt = setTimeout(
      () =>
        (overtimeToastID = notifyWarning('网速过慢，请求尚未完成，请耐心等待。', {
          timeout: false,
        })),
      5000
    )

    const { data, error, finished } = await useAxios(
      Object.assign(axiosConfig, options, { url: `${versionPrefix}${options.url}` })
    )

    if (error.value) {
      const res = error.value.response
      notifyError(
        `错误 ${res?.status} - ${res?.statusText}`,
        res?.data.data instanceof Array ? res.data.data.join('\n') : res?.data.data
      )
      nprogress.done()
      if (!!overtimeToastID) dismissNotify(overtimeToastID)
      clearTimeout(startAt)
      return { error, data: ref(undefined) }
    }

    nprogress.done()
    if (!!overtimeToastID) dismissNotify(overtimeToastID)
    clearTimeout(startAt)
    return { data }
  }
  return {
    serviceGetFeedList,
    serviceGetFeed,
    serviceGetSourceList,
    serviceGetCollectorStatus,
  }
}
