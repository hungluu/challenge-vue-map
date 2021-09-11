import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/lib/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/hubs/HubLocator.vue'),
        meta: {
          title: 'Locate Hub'
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/lib/errors/Error404.vue')
  }
]

export default routes
