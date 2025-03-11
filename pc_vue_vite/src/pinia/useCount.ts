
import { defineStore } from "pinia"; // 定义store的方法

export const useCountStore = defineStore('count', { // 取名字的方式比较讲究，这里可以对比一下
  state() {
    return {
      sum: 1,
      a: 'aaaa',
    }
  },
  // 相当于计算属性
  getters: {
    bigSum: state => state.sum * 10, // 第一种写法：不用this用参数state拿状态中的属性
    veryBigSum(): number { // 第二种写法：用this拿state中的属性
      return this.sum * 100
    }
  },
  actions: { // 第四种方法才会用到
    increment(value: number) {
      // 这里的value是外面组件调用increment这个函数时的传参
      // 这里的this可以拿到下方state中的属性
      this.sum += value
    }
  },
})
