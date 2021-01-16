import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '/@/views/Dashboard.vue'
import Account from '/@/views/Account.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
    },
  ],
})

export default router
