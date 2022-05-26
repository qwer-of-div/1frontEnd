/**
 * 权限配置文件
 */
import {router} from '@/router'
import store from '@/store'
import { ElMessage  } from 'element-plus'
import common from "@/utils/common"

router.beforeEach(async (to, from, next) => {
  console.log(to,99999)
  //获取用户信息
  let { userInfo } = store.state.user
  const { token } = userInfo
  //有用户信息
  if (token) {
    if (to.path === '/login') {
      next('/')
      return
    }
    store.commit('user/addRoute')
    //根据to.name来判断是否为动态路由, 是否有人知道还有更好的判断方法？
    if (!to.name) {
      let { routerList } = userInfo
      console.log('routerList', routerList)
      //当前路由是动态的，确定是有的, 有就跳自己，没有就跳404,, tip: 刷新后动态路由的to.name为空
      // if (routerList.findIndex((i) => `/home/${i.path}` === to.path) !== -1) {
        if (common.parseJson(routerList,'path',to.path).length) {
        next({ ...to, replace: true })
      } else {
        next('/404')
      }
    } else {
      next()
    }
  }
  //无用户信息
  else {
    //没有权限访问，跳入没有权限页面/或者登陆页面
    // 跳转之前要判断一下是否为需要跳转的界面，不然会进入死循环
    if (to.path === '/login') {
      next()
    } else {
      ElMessage({
        showClose: true,
        message: '请先登录',
        type: 'error',
      })
      next('/login')
    }
  }
})

router.afterEach(() => {})

