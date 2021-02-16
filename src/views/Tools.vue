<template>
  <div>
    <PCard class="mt-8">
      <template #header> </template>
      <template #title> 颜色计算器 </template>
      <!-- <template #subtitle class="mb-12"> subtitle </template> -->
      <template #content>
        <div class="flex flex-col mt-4 space-y-8">
          <div class="p-inputgroup">
            <span class="p-float-label">
              <PInputText type="text" v-model="colorValue" />
              <label>颜色值</label>
            </span>
          </div>
          <div class="p-inputgroup">
            <span class="p-float-label">
              <PInputNumber v-model="transformPercentage" showButtons />
              <label>变色百分比</label>
            </span>
          </div>

          <div class="flex flex-row">
            <PColorPicker v-model="colorHexValue" :inline="true" @click="changePicker" />
            <div>
              <pre>{{ colorResult }}</pre>
            </div>
          </div>
          <div class="flex mt-4">
            <div
              class="w-20 h-20 text-center"
              :class="colorIsDark ? 'text-theme-gray-130' : 'text-theme-dark-10'"
              v-for="(value, key, index) in colorPreview"
              :key="index"
              :style="{ backgroundColor: value }"
            >
              {{ key }} <br />
              {{ value }}
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <PButton label="test" class="" />
        <PButton label="test" class="p-button-secondary" />
      </template>
    </PCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Color from 'color'

export default defineComponent({
  name: 'Tools',
  components: {},
  props: {},
  setup() {
    const colorHexValue = ref('ffd54f')
    const colorValue = ref('')
    const colorPreview = ref({})
    const colorResult = ref('')
    const colorIsDark = ref(false)
    const transformPercentage = ref(10)

    watch([colorValue, transformPercentage], () => transformColor())

    const changePicker = () => {
      colorValue.value = colorHexValue.value
    }
    const transformColor = () => {
      try {
        const color =
          (colorValue.value.indexOf(',') !== -1
            ? Color(`rgb(${colorValue.value})`)
            : Color(`#${colorValue.value.replace('#', '')}`)) || undefined
        if (color) {
          const percent = transformPercentage.value / 100
          colorHexValue.value = color.hex()
          colorIsDark.value = color.isDark()
          colorResult.value = `HEX: ${color
            .hex()
            .toString()}\nRGB: ${color
            .rgb()
            .toString()}\nisLight: ${color.isLight()}\nisDark: ${color.isDark()}\n`
          colorPreview.value = {
            lighten: color.lighten(percent).hex(),
            darken: color.darken(percent).hex(),
            whiten: color.whiten(percent).hex(),
            blacken: color.blacken(percent).hex(),
            saturate: color.saturate(percent).hex(),
            desaturate: color.desaturate(percent).hex(),
            fade: color.fade(percent).hex(),
            opaquer: color.fade(percent).hex(),
            mixWhite: color.mix(Color('#ffffff'), percent).hex(),
            mixBlack: color.mix(Color('#000000'), percent).hex(),
          }
        }
      } catch (e) {
        return
      }
    }
    changePicker()
    return {
      transformColor,
      colorPreview,
      colorValue,
      colorHexValue,
      colorResult,
      colorIsDark,
      transformPercentage,
      changePicker,
    }
  },
})
</script>
