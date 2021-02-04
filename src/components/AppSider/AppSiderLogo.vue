<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center h-14">
      <img :src="logo" alt="logo" class="w-8 h-8 logo"><span class="ml-2 text-primary">卡叔实验室</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '@/assets/logo.png'

export default defineComponent({
  name: 'AppSiderLogo',
  components: {},
  props: {},
  setup() {
    const logo = Logo
    return ({
      logo
    })
  },
})
</script>

<style >
/* .anp {
  vertical-align: -0.15em;
  @apply w-8 h-8 overflow-hidden fill-current;
} */
.logo {
  filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(0px -1px 0 white) drop-shadow(1px 0px 0 white);
}
</style>
