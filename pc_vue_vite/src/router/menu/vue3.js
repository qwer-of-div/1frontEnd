




export default [
  {
    path: 'vue3',
    name: 'vue3',
    component: () => import('@/views/menu/vue3/index.vue'),
    children: [
      {
        path: 'ref',
        name: 'ref',
        component: () => import('@/views/menu/vue3/ref/index.vue')
      }, {
        path: 'reactive',
        name: 'reactive',
        component: () => import('@/views/menu/vue3/reactive/index.vue')
      }, {
        path: 'computed',
        name: 'computed',
        component: () => import('@/views/menu/vue3/computed/index.vue')
      }, {
        path: 'watch',
        name: 'watch',
        component: () => import('@/views/menu/vue3/watch/index.vue')
      }, {
        path: 'hook',
        name: 'hook',
        component: () => import('@/views/menu/vue3/hook/index.vue')
      }, {
        path: 'refs',
        name: 'refs',
        component: () => import('@/views/menu/vue3/refs/index.vue')
      }
    ]
  }
]
