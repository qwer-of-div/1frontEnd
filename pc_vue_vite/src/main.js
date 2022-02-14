import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import mixin from './mixin/index.js'
import common from './utils/common.js'

const app = createApp(App)

app.mixin(mixin)

// 全局方法
app.config.globalProperties.$g = common

const uses = { router, store, ElementPlus }
for (const key in uses) {
  app.use(uses[key]);
}

const componentFiles = import.meta.globEager('./components/*.vue') // vite
Object.values(componentFiles).forEach(item => {
  app.component(item.default.name, item.default)
})

app.mount('#app');

// Power mode、 vetur、 eslint、 open in browser、 Auto Rename Tag、 Auto Close Tag、GitLens、Path Intellisense、Bracket Pair Colorizer
// "powermode.enabled": true,
// "powermode.presets": "flames",
// "powermode.enableShake": false,