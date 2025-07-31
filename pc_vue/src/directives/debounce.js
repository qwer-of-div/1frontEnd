// 自定义指令防抖
Vue.directive('debounce', {
  inserted: function (el, binding) {
    const [fn, event, time] = binding.value
    let timer = null

    el.directiveEvent = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(binding.arg)
      }, time)
    }

    el.addEventListener(event, el.directiveEvent)
  },
  unbind (el, binding) {
    const [, event] = binding.value
    el.removeEventListener(event, el.directiveEvent)
    delete el.directiveEvent
  }
})
