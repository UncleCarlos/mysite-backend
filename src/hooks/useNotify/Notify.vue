<template>
  <div class="text-sm">
    <h1 class="mb-2 font-bold">{{ title }}</h1>
    <span class="text-xs">
      <pre>{{ detail }}</pre>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

// 配合 Maronato/vue-toastification 的通知详情组件，无法单独使用
export default defineComponent({
  name: 'CNotify',
  components: {},
  props: {
    title: String,
    detail: String,
  },
  emits: ['showDetail'],
  setup(props, { emit }) {
    const title = computed(() => props.title)
    const detail = computed(() => props.detail)

    const handleClickDetail = () => {
      emit('showDetail')
    }
    return {
      title,
      detail,
      handleClickDetail,
    }
  },
})
</script>
