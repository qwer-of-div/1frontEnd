import Vue from 'vue'

// 自定义指令防抖
Vue.directive('throttle', {
  inserted: function (el, binding) {
    const [fn, event, time] = binding.value
    let timer = null

    el.directiveEvent = () => {
      if (timer) return
      timer = setTimeout(() => {
        fn(binding.arg)
        timer = null
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
