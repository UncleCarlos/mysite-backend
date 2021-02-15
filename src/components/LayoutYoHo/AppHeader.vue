<template>
  <header>
    <PToolbar class="h-16 px-0 border-b max-h-16 border-theme-30">
      <template #left>
        <PBreadcrumb />
      </template>

      <template #right>
        <div class="space-x-2">
          <PButton icon="pi pi-bell" class="p-button-text p-button-secondary p-button-rounded" />
          <PAvatar image="/images/carlos-avatar.png" shape="circle" class="w-8 h-8 zoom-in" />
        </div>
      </template>
    </PToolbar>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeader',
  components: {},
  props: {},
  setup() {
    return {}
  },
})
</script>
