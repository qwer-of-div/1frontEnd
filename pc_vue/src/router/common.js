// {
//   path: '/',
//   name: 'home',
//   redirect: 'collect',
//   component: () =>
//     import(/*webpackChunkName:'home'*/ '@/components/home/index'),
//   children: [
//     ...otherRouter,
//     ...patchRouter,

//   ]
// }

export default [
  {
    path: '/',
    name: 'index',
    redirect: '/home', // 禁止使用 / 为主页 直接路由进入，刷新from为 /
    component: () => import('@/views')
  }, {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home')
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      fromList: ['/home', '/menu']
    }
  }, {
    path: '/menu',
    // path: '/menu/:from', query
    name: 'menu',
    component: () => import('@/views/menu'),
    meta: {
      roles: []
    }
  }, {
    path: '/browser',
    name: 'browser',
    component: () => import('@/views/browser')
  }, {
    path: '/example',
    name: 'example',
    component: () => import('@/views/example')
  }, {
    path: '*',
    name: '404',
    component: () => import('@/views/404')
  }
]
