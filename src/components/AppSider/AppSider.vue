<template>
  <section class="flex">
    <!-- Backdrop -->
    <div
      :class="siderVisiable ? 'block' : 'hidden'"
      @click="siderVisiable = false"
      class="fixed inset-0 z-40 transition-opacity duration-1000 bg-black opacity-50 lg:hidden"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="siderVisiable ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto transition duration-300 transform shadow bg-component lg:translate-x-0 lg:static lg:inset-0"
    >
      <AppSiderLogo />
      <AppSiderMenu :menuItems="menuItems" />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import AppSiderLogo from '/@/components/AppSider/AppSiderLogo.vue'
import AppSiderMenu from '/@/components/AppSider/AppSiderMenu.vue'
import { useSider } from '/@/hooks/useSider'
export default defineComponent({
  name: '',
  components: { AppSiderLogo, AppSiderMenu },
  props: {},
  setup(props) {
    const siderVisiable = useSider().visiable

    const menuItems = reactive([
      { name: 'Dashboard', label: '仪表盘', icon: 'dashboard', to: '/dashboard' },
      { name: 'Account', label: '用户', icon: 'user', to: '/account' },
    ])

    return {
      siderVisiable,
      menuItems,
    }
  },
})
</script>

