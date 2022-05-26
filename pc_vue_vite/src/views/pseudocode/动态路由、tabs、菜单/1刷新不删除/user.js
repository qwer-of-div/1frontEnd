



import {router, resetRouter } from '@/router'
import common from '@/utils/common'
import commonRouter from '@/router/modules/common.js'

const initState = {
    userInfo: {
      routerList: []
    },
    tabs: {
      actived: commonRouter[1].path,
      list: [{...commonRouter[1]}]
    },
    dic: {
      homeRouter: commonRouter[1]
    }
  }
  
  export default {
    name: "user",
    namespaced: true,
    state: JSON.parse(JSON.stringify(initState)),
    mutations: {
      resetState(state) {
        let routerList = JSON.parse(JSON.stringify(state.userInfo.routerList))
        routerList.forEach(item => {
          router.removeRoute(item.name);//???????????
        })
        // ??
        const stateTemp = JSON.parse(JSON.stringify(initState))
        for (const key in stateTemp) {
          state[key] = stateTemp[key]
        }
      },
      userInfoSet(state, userInfo) {
        state.userInfo = userInfo
      },
      addRoute(state) {
        let routerList = JSON.parse(JSON.stringify(state.userInfo.routerList))
        //????????4?,?????????????????
        if (router.getRoutes().length === 4) {
          routerList = common.filterAsyncRouter(routerList)
          console.log('addPrev', router.getRoutes())
          routerList.forEach((i) => {
            //?home?????????
            router.addRoute('home', i)
            // router.addRoute(i)
          })
          console.log('addNext', router.getRoutes())
        }
      },
      // 权限修改
      tabSet(state, {actived, list}) {
        state.tabs.actived = actived
        state.tabs.list = list
      }
    }
}
