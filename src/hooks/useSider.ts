import { reactive, toRefs } from 'vue'

const state = reactive({
  isOpen: false,
})

export function useSider() {
  return {
    ...toRefs(state),
  }
}
