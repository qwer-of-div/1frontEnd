import Vue from 'vue'
import confirm from './index.vue'

const ConfirmConstructor = Vue.extend(confirm)

const theConfirm = function (content) {
  return new Promise((resolve, reject) => {
    // promise封装，ok执行resolve，no执行rejectlet
    const confirmDom = new ConfirmConstructor({
      el: document.createElement('div')
    })

    document.body.appendChild(confirmDom.$el) // new一个对象，然后插入body里面

    confirmDom.content = content // 静态 为了使confirm的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义

    confirmDom.ok = function () {
      resolve(confirmDom)
      confirmDom.isShow = false // 对应data数据
    }
    confirmDom.close = function () {
      // reject()
      reject(new Error(0))
      confirmDom.isShow = false
    }
  })
}
export default theConfirm
