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
      }, {
        path: 'throttle',
        name: 'throttle',
        component: () => import('@/views/directives/throttle')
      }, {
        path: 'formInput',
        name: 'formInput',
        component: () => import('@/views/directives/formInput')
      }
    ]
  }
]
