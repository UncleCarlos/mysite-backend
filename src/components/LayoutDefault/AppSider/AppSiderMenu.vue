<template>
  <nav>
    <router-link
      v-for="(item, index) in menuItems"
      :key="index"
      class="flex items-center px-6 py-2 duration-300 border-r-4"
      :class="[$route.matched[1]?.name === item.name ? activeClass : inactiveClass]"
      :to="item.path"
      @click.passive="handleClickMenu"
    >
      <!-- <CIconPark :icon="item.icon" class="w-5 h-5" /> -->
      <span class="mx-4">{{ item.meta?.label || '' }}</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useSider } from '@/hooks/useSider'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppSiderMenu',
  components: {},
  props: {},
  setup(props) {
    const menuItems = computed(() => useRouter().options.routes[0].children)

    // const activeClass = ref('bg-yellow-300 bg-opacity-25 text-gray-100 border-yellow-400')
    // const inactiveClass = ref(
    //   'border-transparent text-gray-500 hover:bg-yellow-100 hover:bg-opacity-25 hover:text-gray-100'
    // )
    const activeClass = ref('bg-yellow-600 text-gray-100 border-yellow-800')
    const inactiveClass = ref(
      'border-transparent text-gray-500 hover:bg-yellow-300 hover:bg-opacity-25 hover:text-gray-100'
    )
    const siderVisible = useSider().visible
    const handleClickMenu = () => {
      if (siderVisible) siderVisible.value = false
    }
    return {
      menuItems,
      activeClass,
      inactiveClass,
      handleClickMenu,
    }
  },
})
</script>
