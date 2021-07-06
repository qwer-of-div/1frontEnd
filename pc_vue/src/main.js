// 系统 自写 html css js 前端 后端
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'animate.css'
import './components/index.js' // 全局组件
import './utils/windowInput.js'
import './utils/windowRes.js'

import Toast from './components/toast/index'
import Confirm from './components/jsDom/confirm/index' // 提交 提示
import Picker from './components/jsDom/picker/index'
import Date from './components/jsDom/date/index'

import directives from './directives'
import mixin from './mixin/index.js' // mixin
import api from '@/api/common.js'
import md5 from 'js-md5'

Vue.config.productionTip = false

const myExtends = { Toast, Confirm, Picker, Date }
for (const key in myExtends) {
  Vue.prototype[`$my${key}`] = myExtends[key]
}

Vue.prototype.$api = api
Vue.prototype.$md5 = md5
Vue.mixin(mixin)

// Vue.use
const uses = {
  directives,
  ElementUI,
  Vant
}
for (const key in uses) {
  Vue.use(uses[key])
}

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥
  ak: 'WRcy9MoAH4x7A7olsMMA1GoFCGxi1wFh'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
