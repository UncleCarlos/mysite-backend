import { ref } from 'vue'

const visible = ref(false)

export function useSider() {
  return {
    visible,
  }
}
