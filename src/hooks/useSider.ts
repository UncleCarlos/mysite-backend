import { ref } from 'vue'

const state = ref({
  visiable: false,
})

export function useSider() {
  return {
    state,
  }
}
