<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center h-14">
      <svg class="anp" aria-hidden="true">
        <use xlink:href="#anp-c" />
      </svg>
      <svg class="anp" aria-hidden="true">
        <use xlink:href="#anp-a" />
      </svg>
      <svg class="anp" aria-hidden="true">
        <use xlink:href="#anp-r" />
      </svg>
      <svg class="anp" aria-hidden="true">
        <use xlink:href="#anp-l" />
      </svg>
      <svg class="anp" aria-hidden="true">
        <use xlink:href="#anp-o" />
      </svg>
      <svg class="anp" aria-hidden="true">
        <use xlink:href="#anp-s" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppSiderLogo',
  components: {},
  props: {},
  setup() {},
})
</script>

<style >
.anp {
  vertical-align: -0.15em;
  @apply w-8 h-8 overflow-hidden fill-current;
}
</style>
