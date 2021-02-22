<template>
  <CScrollBar>
    <section class="w-screen h-screen max-h-screen min-h-screen">
      <section class="flex w-full h-auto min-h-screen bg-app">
        <AppSider />
        <section class="flex flex-col flex-1">
          <AppHeader />
          <section class="flex-1">
            <div class="container px-6 py-8 mx-auto">
              <CustomRouterView />
            </div>
          </section>
        </section>
      </section>
    </section>
  </CScrollBar>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import AppSider from '@/components/AppSider'
import AppHeader from '@/components/AppHeader'
import CustomRouterView from '@/components/CustomRouterView.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: { AppSider, AppHeader, CustomRouterView },
  props: {},
  setup(props) {
    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>

