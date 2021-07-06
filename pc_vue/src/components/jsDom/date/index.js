import Vue from 'vue'
import pciker from './index.vue'

const PcikerConstructor = Vue.extend(pciker)

const instance = (content) => {
  return new Promise((resolve, reject) => {
    // promise封装，ok执行resolve，no执行reject
    const instanceDom = new PcikerConstructor({
      el: document.createElement('div')
    })

    document.body.appendChild(instanceDom.$el) // new一个对象，然后插入body里面

    // 为了使confirm的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义
    console.log(content, '传入参数')
    for (const key in content) {
      instanceDom[key] = content[key]
    }

    instanceDom.onConfirm = (value) => {
      resolve({ value }) // 只能接收一个参数
      instanceDom.show = false // 对应data数据
      document.body.removeChild(instanceDom.$el) // new一个对象，然后插入body里面
      const overlay = document.body.querySelectorAll('.van-overlay')
      document.body.removeChild(overlay[overlay.length - 1]) // new一个对象，然后插入body里面
    }
    instanceDom.onCancel = () => {
      // reject()
      reject(new Error(0))
      instanceDom.show = false
      document.body.removeChild(instanceDom.$el) // new一个对象，然后插入body里面
      const overlay = document.body.querySelectorAll('.van-overlay')
      document.body.removeChild(overlay[overlay.length - 1]) // new一个对象，然后插入body里面
    }
  })
}
export default instance
