import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/DefaultLayout.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: {
            label: '仪表盘',
          },
        },
        {
          path: '/collector/',
          redirect: '/collector/list',
          name: 'Collector',
          meta: { label: 'Collector' },
          component: () => import('@/components/CustomRouterView.vue'),
          children: [
            {
              path: '/collector/list',
              name: 'CollectorList',
              component: () => import('@/views/Collector/List.vue'),
              meta: { label: 'Collector' },
            },
          ],
        },
        {
          path: '/feed',
          redirect: '/feed/',
          name: 'Feed',
          meta: { label: 'Feed' },
          component: () => import('@/components/CustomRouterView.vue'),
          children: [
            {
              path: '/feed/',
              name: 'FeedList',
              component: () => import('@/views/Feed/FeedList.vue'),
              meta: { label: 'Feed' },
            },
          ],
        },
        {
          path: '/source',
          redirect: '/source/',
          name: 'Source',
          meta: { label: 'Source' },
          component: () => import('@/components/CustomRouterView.vue'),
          children: [
            {
              path: '/source',
              name: 'SourceList',
              component: () => import('@/views/Source/SourceList.vue'),
              meta: { label: 'Source' },
            },
          ],
        },
        {
          path: '/account',
          name: 'Account',
          component: () => import('@/views/Account.vue'),
          meta: {
            label: '用户',
          },
        },
      ],
    },
  ],
})

export default router
