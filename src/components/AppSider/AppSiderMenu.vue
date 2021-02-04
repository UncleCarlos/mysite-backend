<template>
  <nav>
    <router-link
      v-for="(item, index) in menuItems"
      :key="index"
      class="flex items-center px-6 py-2 duration-300 border-r-4"
      :class="[$route.matched[0]?.name === item.name ? activeClass : inactiveClass]"
      :to="item.path"
      @click.passive="handleClickMenu"
    >
      <Icon :name="item.icon" class="w-5 h-5" />
      <span class="mx-4">{{ item.meta?.label || '' }}</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useSider } from '@/hooks/useSider'
export default defineComponent({
  name: 'AppSiderMenu',
  components: {},
  props: {
    menuItems: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup(props) {
    const menuItems = computed(() => props.menuItems.filter((e) => e.path !== '/'))

    // const activeClass = ref('bg-yellow-300 bg-opacity-25 text-gray-100 border-yellow-400')
    // const inactiveClass = ref(
    //   'border-transparent text-gray-500 hover:bg-yellow-100 hover:bg-opacity-25 hover:text-gray-100'
    // )
    const activeClass = ref('bg-yellow-600 text-gray-100 border-yellow-800')
    const inactiveClass = ref(
      'border-transparent text-gray-500 hover:bg-yellow-300 hover:bg-opacity-25 hover:text-gray-100'
    )
    const siderVisiable = useSider().visiable
    const handleClickMenu = () => {
      if (siderVisiable) siderVisiable.value = false
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
