import Vue from 'vue'
import App from './App'
import g from './static/js/config.js'
import input from './static/js/input.js'
import res from './static/js/res.js'
import uView from 'uview-ui'
import store from './store'
import mixin from './mixin'
import {
	router,
	RouterMount
} from './router.js'

Vue.config.productionTip = false
Vue.prototype.$g = g
Vue.prototype.$input = input
Vue.prototype.$res = res
Vue.mixin(mixin)

// Vue.use
const uses = {
	uView,
	router
}
for (const key in uses) {
	Vue.use(uses[key])
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// http拦截器，此为需要加入的内容
import httpInterceptor from '@/api/interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
// http接口API集中管理引入部分
import httpApi from '@/api/common.js'
Vue.use(httpApi, app)

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
