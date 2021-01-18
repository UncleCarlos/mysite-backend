<template>
  <div class="text-sm rounded shadow-md bg-component-body">
    <div
      v-if="!!$slots.header || header !== undefined"
      class="px-3 py-3 text-sm border-b border-solid rounded-t h-11 border-split bg-component-header"
    >
      <slot v-if="$slots.header" name="header" />
      <span v-else>{{ header }}</span>
    </div>
    <div class="p-2">
      <slot></slot>
    </div>
    <div v-if="!!$slots.footer || footer !== undefined" class="px-3 py-3 border-t border-solid rounded-b h-11 border-split bg-component-footer"><slot name="footer" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: '',
  components: {},
  props: {
    header: {
      type: String,
      default: undefined,
    },
    footer: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
