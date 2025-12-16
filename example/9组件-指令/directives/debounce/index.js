import Vue from 'vue'

function debounce(func, wait, immediate = true) {
  let timer
  wait = wait || 1000
  return function () {
    const context = this
    const args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}
// 增加自定义指令防抖函数
Vue.directive('debounce', {
  inserted: function (el, binding) {
    // 获取指令的参数，默认为1s
    let interval = 1000, immediate = true, handler;
    if (typeof binding.value === 'object') {
      interval = binding.value.interval
      immediate = binding.value.immediate
      el._documentEvent = binding.value.event || 'click'
      handler = binding.value.handler || function () { }
    } else if (typeof binding.value === 'function') {
      el._documentEvent = binding.arg
      handler = binding.value
    } else {
      el._documentEvent = 'click'
      handler = () => { }
    }
    const debouncedFn = debounce(handler, interval, immediate)
    el.addEventListener(el._documentEvent, debouncedFn)
    el._documentFn = debouncedFn
  },
  unbind(el) {
    el.removeEventListener(el._documentEvent, el._documentFn)
  }
})
