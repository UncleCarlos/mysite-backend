import { getCurrentInstance, onUnmounted } from 'vue'

export function useInterval(cb: Function, interval = 1000, immediate = false) {
  let timer: number | undefined = undefined

  const start = () => {
    clean()
    timer = setInterval(cb, interval)
  }
  const stop = () => {
    clean()
  }

  const clean = () => {
    if (timer) clearInterval(timer)
  }

  if (immediate) start()

  if (getCurrentInstance()) onUnmounted(() => clean())

  return {
    start,
    stop,
  }
}
