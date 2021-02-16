import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    label: string
    group?: string
    keepAlive?: boolean
  }
}

const LayoutYoHo = () => import('@/components/LayoutYoHo/LayoutYoHo.vue')

const Dashboard = () => import('@/views/Dashboard.vue')
const FeedList = () => import('@/views/Feed/FeedList.vue')
const SourceList = () => import('@/views/Source/SourceList.vue')
const SourceEdit = () => import('@/views/Source/SourceEdit.vue')
const Collector = () => import('@/views/Collector/CollectorList.vue')
const Tools = () => import('@/views/Tools.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/dashboard',
      component: LayoutYoHo,
      children: [
        { path: '/dashboard', component: Dashboard, meta: { label: '仪表盘' } },
        {
          path: '/feed',
          name: 'Feed',
          component: FeedList,
          meta: { label: 'Feed', group: '阅读' },
        },
        {
          path: '/source',
          name: 'Source',
          component: SourceList,
          meta: { label: '源', group: '阅读' },
          children: [
            {
              path: 'edit',
              component: SourceEdit,
              meta: { label: '编辑' },
            },
          ],
        },
        {
          path: '/collector',
          name: 'Collector',
          component: Collector,
          meta: { label: '采集器', group: 'RBAC' },
        },
        {
          path: '/tools',
          name: 'Tools',
          component: Tools,
          meta: { label: '工具', keepAlive: true },
        },
      ],
    },
  ],
})

export default router
