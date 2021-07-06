export default [
  {
    path: '/code',
    name: 'code',
    component: () => import('@/views/code'),
    meta: {
      roles: ['1']
    },
    children: [
      {
        path: 'formVerify',
        name: 'formVerify',
        component: () => import('@/views/code/formVerify'),
        meta: {
          roles: ['1'],
          fromList: ['/code']
        },
        children: [
          {
            path: 'idVerify',
            name: 'idVerify',
            component: () => import('@/views/code/formVerify/idVerify'),
            meta: {
              roles: ['1'],
              fromList: ['/code/formVerify']
            }
          }, {
            path: 'dateVerify',
            name: 'dateVerify',
            component: () => import('@/views/code/formVerify/dateVerify'),
            meta: {
              roles: ['1'],
              fromList: ['/code/formVerify']
            }
          }, {
            path: 'numSpace',
            name: 'numSpace',
            component: () => import('@/views/code/formVerify/numSpace'),
            meta: {
              roles: ['1'],
              fromList: ['/code/formVerify']
            }
          }, {
            path: 'chinese',
            name: 'chinese',
            component: () => import('@/views/code/formVerify/chinese'),
            meta: {
              roles: ['1'],
              fromList: ['/code/formVerify']
            }
          }, {
            path: 'password',
            name: 'password',
            component: () => import('@/views/code/formVerify/password'),
            meta: {
              roles: ['1'],
              fromList: ['/code/formVerify']
            }
          }, {
            path: 'upload',
            name: 'upload',
            component: () => import('@/views/code/formVerify/upload'),
            meta: {
              roles: ['1'],
              fromList: ['/code/formVerify']
            }
          }, {
            path: 'format',
            name: 'format',
            component: () => import('@/views/code/formVerify/format'),
            meta: {
              roles: ['1'],
              fromList: ['/code/formVerify']
            }
          }
        ]
      },
      {
        path: 'utils',
        name: 'utils',
        component: () => import('@/views/code/utils')
      },
      {
        path: 'utils1',
        name: 'utils1',
        component: () => import('@/views/code/utils/index1')
      },
      {
        path: 'pseudoCode',
        name: 'pseudoCode',
        component: () => import('@/views/code/utils/pseudoCode')
      },
      {
        path: 'debThro',
        name: 'debThro',
        component: () => import('@/views/code/debThro'),
        children: [
          {
            path: 'debounce',
            name: 'debounce',
            component: () => import('@/views/code/debThro/debounce')
          }, {
            path: 'throttle',
            name: 'throttle',
            component: () => import('@/views/code/debThro/throttle')
          }
        ]
      }
    ]
  }
]
