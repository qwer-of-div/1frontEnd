/**
 * 使用动态路由传参 'input/:id'
 * 全局路由守卫（vue-router4.0中将next取消了，可写可不写，return false取消导航，undefined或者是return true验证导航通过）
 * Path与params不能同时使用
 * 路由query type
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 跳转同一路由报错处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 文件上下文
const files = require.context('./', false, /\.js$/)
const modules = []

files.keys().forEach((item) => {
  if (['./index.js', './index copy.js'].includes(item)) return // 跳出本次循环
  // 兼容 import export 和 require module.export 两种规范  Es modules  commonjs
  modules.push(...files(item).default)
})

const router = new VueRouter({
  routes: modules
})

// 登录权限、页面进入权限
// (to路由清空,key清空数组)
router.beforeEach((to, from, next) => {
  console.log(from, to)
  store.commit('clearToken') // 取消请求
  let fromFlag = false
  if (!to.meta.fromList) {
    fromFlag = true
  } else {
    for (const item of to.meta.fromList) {
      if (from.path.startsWith(item)) {
        fromFlag = true
        break
      }
    }
  }
  if (!fromFlag && from.path !== '/') { // 直接路由进入错误,只能父级、兄弟路由进入、刷新
    alert('您没有路由权限进入该页面！')
    next(false)
    return
  }
  if (to.meta.roles) { // 判断页面是否需要登录才可操作 或者 白名单 whiteList
    if (!store.state.userInfo) { // 判断用户是否登录，值为true，代表已登录
      alert('请登录之后再操作！')
      next({
        path: '/login', // 未登录则跳转至login页面
        query: { redirect: to.fullPath } // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
      })
      return
    }
  } else {
    next()
    return
  }

  if (!to.meta.roles.length) { // 需要登录，全角色1,2
    next()
    return
  }

  if (!to.meta.roles.includes(store.state.userInfo.role)) {
    // 判断登录用户的权限是否满足meta对象中的roles的要求
    alert('您没有角色权限进入该页面！')
    next(false)
    return
  }
  next()
})

export default router
