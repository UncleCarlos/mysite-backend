<template>
  <CScrollbar>
    <div class="w-screen h-screen max-h-screen min-h-screen">
      <div class="flex flex-grow h-auto px-6 bg-theme-dark-10 text-theme-gray-130">
        <AppSider />
        <section class="flex-1 min-w-0 pb-10 my-5 rounded-3xl bg-theme-dark-20">
          <AppHeader />
          <CustomRouterView class="px-5" />
        </section>
      </div>
    </div>
  </CScrollbar>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import CustomRouterView from '@/components/CustomRouterView.vue'
import AppHeader from './AppHeader.vue'
import AppSider from './AppSider'

export default defineComponent({
  name: 'LayoutYoHo',
  components: { CustomRouterView, AppHeader, AppSider },
  props: {},
  setup(props) {
    const data = reactive({})
    return {
      ...toRefs(data),
    }
  },
})
</script>
