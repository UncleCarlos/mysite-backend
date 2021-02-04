<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppRoot',
  components: { DefaultLayout },
  setup() {
    const { currentRoute } = useRouter()
    const defaultLayout = 'default'
    const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`)
    return {
      layout,
    }
  },
})
</script>

