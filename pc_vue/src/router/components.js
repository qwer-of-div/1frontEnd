export default [
  {
    path: '/components',
    name: 'components',
    component: () => import('@/views/components'),
    meta: {
      roles: ['2']
    },
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/components/table')
      }, {
        path: 'btnChange',
        name: 'btnChange',
        component: () => import('@/views/components/btnChange')
      }, {
        path: 'echarts',
        name: 'echarts',
        component: () => import('@/views/components/echarts')
      }, {
        path: 'animate',
        name: 'animate',
        component: () => import('@/views/components/animate')
      }, {
        path: 'map',
        name: 'map',
        component: () => import('@/views/components/map')
      }, {
        path: 'pdf',
        name: 'pdf',
        component: () => import('@/views/components/pdf')
      }, {
        path: 'webview',
        name: 'webview',
        component: () => import('@/views/components/webview')
      }, {
        path: 'keepAlive',
        name: 'keepAlive',
        component: () => import('@/views/components/keepAlive'),
        meta: {
          keepAlive: true
        }
      }, {
        path: 'virtalList',
        name: 'virtalList',
        component: () => import('@/views/components/virtalList')
      }, {
        path: 'jsDom',
        name: 'jsDom',
        component: () => import('@/views/components/jsDom')
      }, {
        path: 'request',
        name: 'request',
        component: () => import('@/views/components/request')
      }, {
        path: 'hookRouter',
        name: 'hookRouter',
        component: () => import('@/views/components/hookRouter')
      }
    ]
  }
]
