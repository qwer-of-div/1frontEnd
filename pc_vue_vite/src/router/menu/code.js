




export default [
  {
    path: 'code',
    name: 'code',
    component: () => import('@/views/menu/code/index.vue'),
    children: [
      {
        path: 'judgeObj',
        name: 'judgeObj',
        component: () => import('@/views/menu/code/judgeObj/index.vue')
      }, {
        path: 'asyncAwait',
        name: 'asyncAwait',
        component: () => import('@/views/menu/code/asyncAwait/index.vue')
      }
    ]
  }
]
