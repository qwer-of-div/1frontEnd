import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach(item => {
  const module = files(item).default
  // 使用内置的组件名称 进行全局组件注册
  modules[module.name] = module
})

// localStorage页面与页面之间传值不用实时更新 vuex同一页面传值才需要实时更新
// queryData 存于localStorage不需要实时更新 不用书写结构
const state = {
  cancelTokenArr: [], // 取消请求token数组
  userInfo: {}, // 用户信息
  transNo: '10001', // 流水号
  transModule: '', // 流程模块 后端控制(流程中断，后端、前端删除vuex、localStorage)
  scrollTop: 0, // 滑动距离 localStorage
  query: { // 存于localStorage 根据需求是否刷新也需要保留
    claimList: { // eg type: claimList reportCase
      tab: '',
      scroll: 0,
      data: {}
    },
    reportCase: { // 报案
    }
  },
  from: {
    main: '', // 首屏 都要设置from 流程完成页清空 首页清空
    scan: '', // 待派扫 单页面
    preview: '' // 申请书预览 eg:claimList claimListNew
  },
  g: { // 全局常量
    idType: '1000', // 判断常量
    // idTypeLabel: '身份证', // 判断常量
    date: {
      birthMin: new Date(1900, 0, 1),
      birthMax: new Date()
    },
    length: { // 限制长度
      name: 20,
      phone: 11
    }
  }
}

const mutations = {
  resetState (stateNew) { // 重置
    stateNew = JSON.parse(JSON.stringify(state))
  },
  userInfoSet (state, userInfo) {
    state.userInfo = userInfo
  },
  pushToken (state, payload) {
    state.cancelTokenArr.push(payload.cancelToken)
  },
  clearToken ({ cancelTokenArr }) {
    console.log(cancelTokenArr, '请求取消')
    cancelTokenArr.forEach(item => {
      item('路由跳转取消请求') // 使用elementUI
    })
    cancelTokenArr = []
  }
}

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: JSON.parse(JSON.stringify(state)),
  mutations: { ...mutations },
  actions: {},
  modules
})

export default store

// Array[] modules moduleList
export function resetState (modules) {
  if (!store) return
  // const moduleList = ['', 'dic/', 'claimList/', 'reportCase/']
  const moduleList = ['', 'dic/']
  const modulesTemp = modules || moduleList
  modulesTemp.forEach(item => {
    store.commit(`${item}resetState`)
  })
}