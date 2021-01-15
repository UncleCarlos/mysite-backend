<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="siderIsOpen ? 'block' : 'hidden'"
      @click="siderIsOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="siderIsOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform shadow-md bg-component lg:translate-x-0 lg:static lg:inset-0"
    >
      <AppSiderLogo />
      <AppSiderMenu :menuItems="menuItems" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import AppSiderLogo from '/@/components/AppSider/AppSiderLogo.vue'
import AppSiderMenu from '/@/components/AppSider/AppSiderMenu.vue'

import { useSider } from '/@/hooks/useSider'
export default defineComponent({
  name: '',
  components: { AppSiderLogo, AppSiderMenu },
  props: {},
  setup(props) {
    const siderIsOpen = useSider().isOpen
    const menuItems = reactive([
      { name: 'Dashboard', label: '仪表盘', icon: 'dashboard', to: '/dashboard' },
      { name: 'User', label: '用户', icon: 'user', to: '/user' },
    ])

    return {
      siderIsOpen,
      menuItems,
    }
  },
})
</script>

