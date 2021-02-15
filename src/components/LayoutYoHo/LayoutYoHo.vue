<template>
  <div class="px-8 py-5 bg-theme-10 text-theme-130">
    <div class="flex">
      <AppSider />
      <section class="flex-1 min-w-0 min-h-screen px-5 pb-10 rounded-3xl bg-theme-20">
        <AppHeader />
        <PCard class="mt-8">
          <template #header> </template>
          <template #title> Advanced Card </template>
          <template #subtitle class="mb-12"> subtitle </template>
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur
            error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis,
            culpa ratione quam perferendis esse, cupiditate neque quas!
          </template>
          <template #footer>
            <PButton icon="pi pi-check" label="Save" />
            <PButton
              icon="pi pi-times"
              label="Cancel"
              class="p-button-secondary"
              style="margin-left: 0.5em"
            />
          </template>
        </PCard>
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import AppHeader from './AppHeader.vue'
import AppSider from './AppSider.vue'

export default defineComponent({
  name: 'LayoutYoHo',
  components: { AppHeader, AppSider },
  props: {},
  setup(props) {
    const data = reactive({})
    return {
      ...toRefs(data),
    }
  },
})
</script>
