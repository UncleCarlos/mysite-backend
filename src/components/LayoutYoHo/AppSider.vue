<template>
  <aside class="w-56 pr-5">
    <div class="flex items-center h-16 mb-8 text-center border-b max-h-16 border-theme-30">
      <img src="/images/logo.png" alt="logo" class="w-8 h-8" />
      <span class="ml-2">卡叔实验室</span>
    </div>
    <PMenu class="app-navmenu" :model="menuItems" />
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppSider',
  components: {},
  props: {},
  setup() {
    const { currentRoute } = useRouter()

    const menuItems = reactive([
      {
        label: '仪表盘',
        icon: 'pi pi-bell',
        to: { name: 'Dashboard' },
        class: computed(() => (currentRoute.value.name === 'Dashboard' ? 'is-actived' : '')),
      },
      {
        label: '阅读',
        icon: 'pi pi-bell',
        items: [
          {
            label: 'Feed',
            to: { name: 'Feed' },
            icon: 'pi pi-bell',
            class: computed(() => (currentRoute.value.name === 'Feed' ? 'is-actived' : '')),
          },
          {
            label: '源',
            to: { name: 'Source' },
            icon: 'pi pi-bell',
            class: computed(() => (currentRoute.value.name === 'Source' ? 'is-actived' : '')),
          },
          {
            label: '采集器',
            icon: 'pi pi-bell',
            to: { name: 'Collector' },
            class: computed(() => (currentRoute.value.name === 'Collector' ? 'is-actived' : '')),
          },
        ],
      },
      { label: 'RBAC', items: [{ label: '角色' }, { label: '权限' }, { label: '用户' }] },
    ])

    return {
      menuItems,
    }
  },
})
</script>
