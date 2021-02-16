<template>
  <div class="px-8 bg-theme-dark-10 text-theme-gray-130">
    <div class="flex flex-grow">
      <AppSider />
      <section class="flex-1 min-w-0 px-5 pb-10 my-5 rounded-3xl bg-theme-dark-20">
        <AppHeader />
        <CustomRouterView />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import CustomRouterView from '@/components/CustomRouterView.vue'
import AppHeader from './AppHeader.vue'
import AppSider from './AppSider.vue'

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
