import { createRouter, createWebHistory } from 'vue-router'
import CustomRouterView from '@/components/CustomRouterView.vue'
import Dashboard from '@/views/Dashboard.vue'
import CollectorList from '@/views/Collector/List.vue'
import SourceList from '@/views/Source/List.vue'
import FeedList from '@/views/Feed/List.vue'
import Account from '@/views/Account.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', redirect: '/dashboard' },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        label: '仪表盘',
      },
    },
    {
      path: '/collector/',
      redirect: '/collector/list',
      name: 'Collector',
      meta: { label: 'Collector' },
      component: CustomRouterView,
      children: [
        {
          path: '/collector/list',
          name: 'CollectorList',
          component: CollectorList,
          meta: { label: 'Collector' },
        },
      ],
    },
    {
      path: '/feed/',
      redirect: '/feed/list',
      name: 'Feed',
      meta: { label: 'Feed' },
      component: CustomRouterView,
      children: [
        { path: '/feed/list', name: 'FeedList', component: FeedList, meta: { label: 'Feed' } },
      ],
    },
    {
      path: '/source',
      redirect: '/source/list',
      name: 'Source',
      meta: { label: 'Source' },
      component: CustomRouterView,
      children: [
        {
          path: '/source/list',
          name: 'SourceList',
          component: SourceList,
          meta: { label: 'Source' },
        },
      ],
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        label: '用户',
      },
    },
  ],
})

export default router
