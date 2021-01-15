import { createRouter, createMemoryHistory } from 'vue-router'
import Hei from '/@/components/Hei.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hei,
    },
  ],
})

export default router
