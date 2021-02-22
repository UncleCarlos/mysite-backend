<template>
  <nav class="app-sider-menu">
    <ul class="">
      <template v-for="(item, i) in menuItems" :key="item.label + i">
        <li class="app-sider-menu-item" :class="item.class">
          <router-link :to="item.to" class="app-sider-menu-link">
            <span class="app-sider-menu-icon"><CIconPark :icon="item.icon" size="1.25rem" /></span>
            <span class="app-sider-menu-text">{{ item.label }}</span>
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'AppSiderMenu',
  components: {},
  props: {
    model: {
      type: Array,
      default: null,
    },
  },
  setup(props) {
    const menuItems = computed(() => props.model)
    return {
      menuItems
    }
  },
})
</script>
