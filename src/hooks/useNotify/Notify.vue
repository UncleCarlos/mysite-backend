<template>
  <div class="font-sans text-sm">
    <h1 v-if="title" :class="{ 'mb-2 font-bold': message }">{{ title }}</h1>
    <span v-if="message" class="text-xs">
      <pre>{{ message }}</pre>
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
    message: String,
  },
  setup(props) {
    const title = computed(() => props.title)
    const detail = computed(() => props.message)

    return {
      title,
      detail,
    }
  },
})
</script>
