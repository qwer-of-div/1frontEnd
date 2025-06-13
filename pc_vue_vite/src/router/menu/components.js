




export default [
  {
    path: 'components',
    name: 'components',
    component: () => import('@/views/menu/components/index.vue'),
    children: [
      {
        path: 'keepAlive',
        name: 'keepAlive',
        component: () => import('@/views/menu/components/keepAlive/index.vue'),
        meta: { keepAlive: true }
      }, {
        path: 'keepAliveDetail',
        name: 'keepAliveDetail',
        component: () => import('@/views/menu/components/keepAlive/detail.vue')
      }, {
        path: 'keepAliveNoCache',
        name: 'keepAliveNoCache',
        component: () => import('@/views/menu/components/keepAlive/noCache.vue')
      }
    ]
  }
]
