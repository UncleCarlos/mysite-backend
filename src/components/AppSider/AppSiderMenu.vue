<template>
  <nav class="mt-10">
    <router-link
      v-for="(item, index) in menuItems"
      :key="index"
      class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
      :class="[$route.name === item.name ? activeClass : inactiveClass]"
      :to="item.to"
    >
      <Icon :name="item.icon" class="w-5 h-5" />
      <span class="mx-4">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'

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
    const menuItems = computed(() => props.menuItems)

    const activeClass = ref('bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100')
    const inactiveClass = ref(
      'border-transparent text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
    )
    return {
      menuItems,
      activeClass,
      inactiveClass,
    }
  },
})
</script>
