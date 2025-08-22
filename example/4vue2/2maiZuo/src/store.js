import Vue from 'vue'
import Vuex from 'vuex'
import { getCityId, getCityName, getToken } from '@/utils/local-data'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityId: getCityId(), // 城市id
    cityName: getCityName(), // 城市名称
    token: getToken()
  },
  mutations: {
    setCityId (state, val) {
      state.cityId = val
    },
    setCityName (state, val) {
      state.cityName = val
    },
    setToken (state, val) {
      state.token = val
    }
  },
  actions: {

  }
})
