<template>
  <div class="relative">
    <button
      @click="dropdownVisiable = !dropdownVisiable"
      class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
    >
      <img class="object-cover w-full h-full transition-transform hover:scale-110 transform-gpu" :src="carlosAvatar" alt="Your avatar" />
    </button>

    <div
      v-show="dropdownVisiable"
      @click="dropdownVisiable = false"
      class="fixed inset-0 z-50 w-full h-full"
    ></div>

    <div
      v-show="dropdownVisiable"
      class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
    >
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
        >Profile</a
      >
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
        >Products</a
      >
      <router-link
        to="/"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
        >Log out</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import CarlosAvatar from '@/assets/carlos-avatar.png'

export default defineComponent({
  name: 'AppHeaderAvatar',
  components: {},
  props: {},
  setup(props) {
    const dropdownVisiable = ref(false)
    const carlosAvatar = CarlosAvatar
    const data = reactive({
      dropdownVisiable,
      carlosAvatar
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>
