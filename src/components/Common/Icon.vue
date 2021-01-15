<template>
  <svg class="iconfont" :class="iconClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: '',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.name}`)
    const iconClass = computed(() => props.class)

    return {
      iconName,
      iconClass,
    }
  },
})
</script>