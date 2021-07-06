import Vue from 'vue' // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import Main from './index.vue' // 引入刚才的 toast 组件

const ToastConstructor = Vue.extend(Main) //  用 Vue.extend 创建组件的模板（构造函数）
let instance

const Toast = function (options = {}) {
  instance = new ToastConstructor({ data: options }) // 实例化组件
  instance.$mount() // $mount() 里面如果没有参数，说明组件只是渲染了但还没有挂载到页面上
  document.body.appendChild(instance.$el) // 挂载到 body 下
}

// 以下就是在 Toast 函数中拓展 ["success", "error"] 这两个方法
const typeList = ['success', 'error']
typeList.forEach(type => {
  Toast[type] = options => {
    options.type = type
    return Toast(options)
  }
})

export default Toast
