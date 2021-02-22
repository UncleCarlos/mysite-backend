<template>
  <aside class="sticky top-0 w-56 h-screen py-5 pr-5">
    <div
      class="flex items-center justify-center h-16 pr-2 mb-8 border-b max-h-16 border-theme-dark-30"
    >
      <img src="/images/logo.png" alt="logo" class="w-8 h-8" />
      <span class="ml-2 text-theme-gray-150">卡叔实验室</span>
    </div>
    <AppSiderMenu :model="menuItems" />
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import AppSiderMenu from './AppSiderMenu.vue'

export default defineComponent({
  name: 'AppSider',
  components: { AppSiderMenu },
  props: {},
  setup() {
    const { currentRoute, options } = useRouter()
    const menuItems = reactive<{ label?: string; to?: any; icon?: string; class?: any }[]>([])
    // TODO: 使用路由 meta.group 给菜单分组并排序
    watchEffect(() => {
      options.routes[0].children?.forEach((e) => {
        menuItems.push({
          label: e.meta?.label,
          to: e.path,
          icon: e.meta?.icon,
          class: computed(() =>
            currentRoute.value.matched.find((m) => m.path === e.path) ? 'is-actived' : ''
          ),
        })
      })
    })

    return {
      menuItems,
    }
  },
})
</script>
