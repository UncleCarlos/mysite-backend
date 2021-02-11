<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="route.meta.keepAlive">
      <component :is="Component" />
    </keep-alive>
    <component v-else :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomRouterView',
})
</script>
