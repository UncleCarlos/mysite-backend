<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component v-if="route.meta.keepAlive" :is="Component" />
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomRouterView',
})
</script>
