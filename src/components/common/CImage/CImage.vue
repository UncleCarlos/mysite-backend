<template>
  <div v-if="!(hideOnError && hasLoadError)" class="c-image" ref="container">
    <transition-group name="fade">
      <slot v-if="isLoading & !isLoaded" name="placeholder">
        <div class="mask" key="image-mask">
          <SpinLoading />
        </div>
      </slot>
      <slot v-else-if="hasLoadError" name="error">
        <div class="mask" key="image-mask-err">
          <img src="/images/logo.png" class="object-contain w-full h-full p-4" />
        </div>
      </slot>
      <img
        v-else
        class="w-24 h-12"
        :src="imgSrc"
        :class="imgClass"
        :key="`image-${imgSrc}`"
        @load="isLoaded = true"
        v-show="isLoaded"
        :alt="$attrs.alt"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue'
import SpinLoading from '@/components/common/SpinLoading.vue'

export default defineComponent({
  name: 'CImage',
  components: { SpinLoading },
  props: {
    src: {
      type: String,
      default: '',
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    fit: {
      type: String,
      default: '',
      validator: (val: string) =>
        ['', 'none', 'contain', 'cover', 'fill', 'scale-down'].includes(val),
    },
    hideOnError: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['error'],
  setup(props, { emit }) {
    const ObjectFit = new Map([
      ['none', 'obejct-none'],
      ['contain', 'object-contain'],
      ['cover', 'object-cover'],
      ['fill', 'object-fill'],
      ['scale-down', 'object-scale-down'],
    ])

    const imgWidth = ref(0)
    const imgHeight = ref(0)
    const imgSrc = computed(() => props.src)
    const isLoading = ref(true)
    const hasLoadError = ref(false)
    const isLoaded = ref(false)
    const imgClass = computed(() => ObjectFit.get(props.fit))
    const container = ref<HTMLElement | null>(null)

    const hideOnError = computed(() => props.hideOnError)

    const loadImage = (src: string) => {
      isLoading.value = true
      isLoaded.value = false
      hasLoadError.value = false
      const img = new Image()
      img.onload = (e) => handleLoad(e, img)
      img.onerror = (e) => handleError(e)
      img.src = src
    }

    const handleLoad = (e: Event, img: HTMLImageElement) => {
      imgWidth.value = img.width
      imgHeight.value = img.height
      isLoading.value = false
      hasLoadError.value = false
    }

    const handleError = (e: string | Event) => {
      isLoading.value = false
      isLoaded.value = false
      hasLoadError.value = true
      emit('error', e)
    }

    // const getImageStyle = (fit: string) => {
    //   const imageWidth = imgWidth.value
    //   const imageHeight = imgHeight.value
    //   if (!container.value) return {}
    //   const { clientWidth: containerWidth, clientHeight: containerHeight } = container.value
    //   if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {}

    //   const imageAspectRatio = imageWidth / imageHeight
    //   const containerAspectRatio = containerWidth / containerHeight

    //   if (fit === ObjectFit.SCALE_DOWN) {
    //     const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight
    //     fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
    //   }

    //   switch (fit) {
    //     case ObjectFit.NONE:
    //       return { weight: 'auto', height: 'auto' }
    //     case ObjectFit.CONTAIN:
    //       return imageAspectRatio < containerAspectRatio ? { weight: 'auto' } : { height: 'auto' }
    //     case ObjectFit.COVER:
    //       return imageAspectRatio < containerAspectRatio ? { height: 'auto' } : { width: 'auto' }
    //     default:
    //       return {}
    //   }
    // }

    watchEffect(() => loadImage(imgSrc.value))

    onMounted(() => {
      loadImage(imgSrc.value)
    })

    return {
      container,
      imgWidth,
      imgHeight,
      isLoading,
      isLoaded,
      hasLoadError,
      loadImage,
      imgSrc,
      imgClass,
      hideOnError,
    }
  },
})
</script>
