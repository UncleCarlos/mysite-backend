<template>
  <component :is="iconName" v-if="iconName" :theme="iconTheme" v-bind="$attrs" :size="iconSize" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
// import { IconPark } from '@icon-park/vue-next/es/all'
import { Editor, LinkOne, Time, Delete } from '@icon-park/vue-next'

export default defineComponent({
  name: 'CIconPark',
  components: {
    Editor,
    LinkOne,
    Time,
    Delete,
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'outline',
    },
    size: {
      type: String,
    },
  },
  setup(props) {
    const iconName = computed(() => toPascalCase(props.icon))
    const iconTheme = computed(() => props.theme)
    const iconSize = computed(() => props.size)

    const toPascalCase = (val: string) => {
      return val.replace(/(^\w|-\w)/g, (c: string) => c.replace(/-/, '').toUpperCase())
    }
    return {
      iconName,
      iconTheme,
      iconSize,
    }
  },
})
</script>
