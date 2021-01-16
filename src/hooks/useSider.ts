import { reactive, toRefs } from 'vue'

const state = reactive({
  visiable: false,
})

export function useSider() {
  return {
    ...toRefs(state),
  }
}
