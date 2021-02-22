import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

export const useDayjs = () => {
  dayjs.locale('zh-cn')
  dayjs.extend(relativeTime)

  const formatRelativeIn3Days = (
    date: string | number | dayjs.Dayjs | Date | undefined,
    pattern?: string | undefined
  ) => {
    if (!date) return
    if (dayjs(date).isAfter(dayjs().subtract(3, 'day'))) return dayjs(date).fromNow()
    else return formatDate(date, pattern)
  }

  const formatDate = (
    date: string | number | dayjs.Dayjs | Date | undefined,
    pattern?: string | undefined
  ) => {
    if (!date) return
    return dayjs(date).format(pattern || 'YYYY年MM月DD日 A HH:mm')
  }
  return { dayjs, formatDate, formatRelativeIn3Days }
}
