import { ref } from 'vue'

const visiable = ref(false)

export function useSider() {
  return {
    visiable,
  }
}
