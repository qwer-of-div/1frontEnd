import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
// import { http,api } from '@/api/interceptor.js' 
import api from '@/api/index.js' 
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载
	store
})
app.$mount()
