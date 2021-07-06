const longPress = {
  inserted: function (el, binding) {
    console.log(el, '自定义指令')
    let timer
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      console.log('未延迟', binding)
      timer = setTimeout(() => {
        console.log('延迟', binding)
      }, 1000)
    })
  }
}

export default longPress
