import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import '@/assets/css/reset1.css'
import '@/assets/css/animate.css'
import * as filters from './filters/index'
import { Button, List, Sticky, Popup, IndexBar, IndexAnchor, Cell, Icon, Toast, NavBar} from 'vant'

Vue.use(Button).use(List).use(Sticky).use(IndexBar).use(Toast).use(IndexAnchor).use(Cell).use(Icon)
.use(NavBar)

// 批量添加全局过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}



Vue.config.productionTip = false

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
