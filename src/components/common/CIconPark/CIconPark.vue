<template>
  <component :is="iconName" v-if="iconName" :theme="iconTheme" v-bind="$attrs" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
// import { IconPark } from '@icon-park/vue-next/es/all'
import {
  ApplicationTwo,
  Comment,
  DarkMode,
  Editor,
  FigmaComponent,
  LinkOne,
  Mail,
  Message,
  NewspaperFolding,
  Platte,
  Save,
  SettingTwo,
  ShareOne,
  ShoppingCart,
  SquareSmall,
  ThumbsUp,
  Time,
  World,
} from '@icon-park/vue-next'

export default defineComponent({
  name: 'CIconPark',
  components: {
    ApplicationTwo,
    Comment,
    DarkMode,
    Editor,
    FigmaComponent,
    LinkOne,
    Mail,
    Message,
    NewspaperFolding,
    Platte,
    Save,
    SettingTwo,
    ShareOne,
    ShoppingCart,
    SquareSmall,
    ThumbsUp,
    Time,
    World,
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
  },
  setup(props) {
    const iconName = computed(() => toPascalCase(props.icon))
    const iconTheme = computed(() => props.theme)

    const toPascalCase = (val: string) => {
      return val.replace(/(^\w|-\w)/g, (c: string) => c.replace(/-/, '').toUpperCase())
    }
    return {
      iconName,
      iconTheme,
    }
  },
})
</script>
