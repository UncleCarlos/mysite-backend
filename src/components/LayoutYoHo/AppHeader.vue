<template>
  <header class="app-header">
    <PToolbar class="h-16 px-0 border-b max-h-16 border-theme-dark-30">
      <template #left>
        <PBreadcrumb class="text-sm" :home="breadcrumbHome" :model="breadcrumbItems" />
      </template>

      <template #right>
        <div class="space-x-2">
          <PButton
            @click="changeZoomLevel(false)"
            icon="pi pi-minus"
            class="p-button-text p-button-secondary p-button-rounded"
            :disabled="zoomLevel <= 1"
          />
          <PButton
            @click="changeZoomLevel(true)"
            icon="pi pi-plus"
            class="p-button-text p-button-secondary p-button-rounded"
            :disabled="zoomLevel >= 5"
          />
          <PButton icon="pi pi-bell" class="p-button-text p-button-secondary p-button-rounded" />

          <PButton class="p-button-text p-button-icon-only p-button-secondary p-button-rounded">
            <PAvatar image="/images/carlos-avatar.png" shape="circle" class="zoom-in" />
          </PButton>
        </div>
      </template>
    </PToolbar>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AppHeader',
  components: {},
  props: {},
  setup() {
    const route = useRoute()
    const breadcrumbItems = computed(() => {
      const result: any[] = []
      const routes = route.matched.slice(0, route.matched.length).filter((e) => e.meta.label)
      routes.forEach((e) => {
        if (!result.find((r) => r.to === e.path)) result.push({ label: e.meta.label, to: e.path })
      })
      return result
    })
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' }

    const { state, commit } = useStore()
    const zoomLevel = computed(() => state.zoomLevel)
    const zoomList: Record<number, string> = {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '18px',
      5: '20px',
    }
    const changeZoomLevel = (addition: boolean = false) => {
      const result = addition
        ? zoomLevel.value >= 5
          ? 5
          : zoomLevel.value + 1
        : zoomLevel.value <= 1
        ? 1
        : zoomLevel.value - 1
      document.documentElement.style.setProperty('--zoom-level', zoomList[result])
      commit('updateZoomLevel', result)
    }
    return {
      breadcrumbItems,
      breadcrumbHome,
      zoomLevel,
      changeZoomLevel,
    }
  },
})
</script>
