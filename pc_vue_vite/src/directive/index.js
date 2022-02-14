const directives = {
  debounce: {
    mounted (el, binding) {
      // el:imgdom对象
      // binding: value 表达式值
      // 使用监听函数 在满足条件的情况下 把binding.value 交给 el的src属性
      let { delay, fn } = binding.value //参数：时间，执行函数
      delay = delay ? delay : 500
      let timer = null
      el.addEventListener("click", () => {
        timer && clearTimeout(timer)
        timer = setTimeout(fn, delay)
      })
    }
  },
  longPress: {
    mounted (el, binding) {
      // el:imgdom对象
      // binding: value 表达式值
      // 使用监听函数 在满足条件的情况下 把binding.value 交给 el的src属性
      let { delay, fn } = binding.value // 参数：时间，执行函数
      delay = delay ? delay : 500
      let timer = null
      el.addEventListener("click", () => {
        timer && clearTimeout(timer)
        timer = setTimeout(fn, delay)
      })
    }
  }
}
// vue自定义指令防抖
export default {
  install (app) {
    for (const key in directives) {
      app.directive(key, directives[key])
    }
  }
}