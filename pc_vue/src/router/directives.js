export default [
  {
    path: '/directives',
    name: 'directives',
    component: () => import('@/views/directives'),
    // meta: {
    //   roles: ['1']
    // },
    children: [
      {
        path: 'delayOutput',
        name: 'delayOutput',
        component: () => import('@/views/directives/delayOutput')
      }
    ]
  }
]
