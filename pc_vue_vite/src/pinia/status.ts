// 引入defineStore

import { defineStore } from "pinia";

// 官方推荐命名与hooks一样，use开头

// 第一个参数可以理解为给Store命名，这个名称在整个应用程序的 Pinia 实例中必须是唯一的，它就像是一个标识符，用来区分不同的 Store
// 第一个参数可以写成和文件名字一样
// 第二个参数是一个配置对象
export const useStatusStore = defineStore("status", {

  // 存储数据的地方-Pinia唯一的数据源
  // state必须是一个函数，且返回一个对象
  state() {
    // 定义一个flag和isShow
    return { flag: 0, isShow: true }
  },
  // getters是一个配置对象，类似计算属性
  getters: {
    // doubleFlag属性，值是flag的双倍
    doubleFlag(): number {
      return this.flag * 2
    },
    // 箭头函数
    doubleFlag1: state => state.flag * 2

  },
  // actions是一个对象，里面放置的是一个一个的动作方法，用于响应组件中的动作
  actions: {
    // 修改flag
    setFlag(value: number) {
      // 可以对数据进行一些其他逻辑处理
      this.flag = value
    }
  }
})
