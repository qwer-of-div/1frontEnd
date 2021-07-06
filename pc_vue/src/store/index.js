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

// localStorage页面与页面之间传值不用实时更新 vuex同一页面传值才需要实时更新 queryData 存于localStorage不需要实时更新 不用书写结构
const state = {
  cancelTokenArr: [], // 取消请求token数组
  userInfo: JSON.parse(localStorage.getItem('userInfo')), // 用户信息 null
  transNo: '10001', // 流水号
  transModule: '', // 流程模块 后端控制(流程中断，后端、前端删除vuex、localStorage)
  userType: '1', // 优质业务员
  scrollTop: 0, // 滑动距离 localStorage
  queryData: JSON.parse(localStorage.getItem('queryData')), // 根据需求是否刷新也需要保留
  query: { // 存于localStorage
    claimList: { // eg type: claimList reportCase
      tab: '',
      scroll: 0,
      data: {}
    },
    reportCase: {

    }
  },
  from: {
    main: '', // 首屏
    scan: '', // 待派扫 单页面
    preview: '' // 申请书预览 eg:claimList claimListNew
  },
  g: { // 全局变量
    idCardType: '1000', // 判断常量
    minDate: new Date(1900, 0, 1),
    maxDate: new Date()
  }
}

const mutations = {
  resetState (stateNew) { // 重置
    for (const key in stateNew) {
      stateNew[key] = state[key]
    }
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
  },
  // localStorage {type:'detail','message'}
  fromSet (state, obj) {
    state.from[obj.type] = obj.from
  },
  userInfoSet (state, userInfo) {
    state.userInfo = userInfo
  },
  queryDataSet (state, queryData) {
    state.queryData = queryData
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (val) {
      return {
        // 只储存state中的token
        userInfo: val.userInfo
      }
    }
  })],
  state: { ...state },
  mutations: { ...mutations },
  actions: {},
  modules
})
