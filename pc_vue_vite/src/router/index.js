/**
 * 跳转同一路由报错处理
 * 使用动态路由传参 'input/:id'
 * component: () => import('@/views/index.vue') index.vue
 */
import { createRouter, createWebHashHistory } from 'vue-router';

// 文件上下文
const menuFiles = import.meta.globEager('./menu/*.js') // vite

const menuChilds = []

Object.values(menuFiles).forEach(item => {
  menuChilds.push(...item.default)
})
// for (const key in filePaths) {
//   console.log(filePaths[key].default)
// }
// for (const item of Object.keys(filePaths)) {
//   if (['./index.js'].includes(item)) continue
// }

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home', // 禁止使用 / 为主页 直接路由进入，刷新from为 /
    component: () => import('@/views/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      fromList: ['/home', '/menu']
    }
  }, {
    path: '/menu',
    // path: '/menu/:from', query
    name: 'menu',
    component: () => import('@/views/menu/index.vue'),
    children: menuChilds,
    meta: {
      roles: []
    }
  }, {
    path: '/example',
    name: 'example',
    component: () => import('@/views/example/index.vue')
  }, {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
