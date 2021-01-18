<template>
  <section class="flex h-screen bg-app">
    <AppSider />
    <section  class="flex flex-col flex-1 overflow-hidden">
      <AppHeader />
      <main id="nprogress-node" class="z-20 flex-1 overflow-x-hidden overflow-y-auto text-primary">
        <div class="container px-6 py-8 mx-auto">
          <slot />
        </div>
      </main>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import AppSider from '/@/components/AppSider'
import AppHeader from '/@/components/AppHeader'

export default defineComponent({
  name: 'DefaultLayout',
  components: { AppSider, AppHeader },
  props: {},
  setup(props) {
    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>

