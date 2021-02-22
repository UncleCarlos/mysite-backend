import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    label: string
    group?: string
    keepAlive?: boolean
  }
}

const LayoutYoHo = () => import('@/components/LayoutYoHo/LayoutYoHo.vue')
const DefaultLayout = () => import('@/components/DefaultLayout.vue')
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
        { path: '/dashboard', component: Dashboard, meta: { label: '总览', icon:'dashboard-one' } },
        {
          path: '/feed',
          name: 'Feed',
          component: FeedList,
          meta: { label: '饲料', group: '阅读', icon: 'newspaper-folding' },
        },
        {
          path: '/source',
          name: 'Source',
          component: SourceList,
          meta: { label: 'RSS源', group: '阅读', icon: 'world' },
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
          meta: { label: '采集器', group: 'RBAC', icon: 'robot-one' },
        },
        {
          path: '/tools',
          name: 'Tools',
          component: Tools,
          meta: { label: '工具', keepAlive: true, icon: 'tool' },
        },
      ],
    },
  ],
})

export default router
