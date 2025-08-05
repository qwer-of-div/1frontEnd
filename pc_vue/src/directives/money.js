
// 只能输入数字和小数点，n表示小数位数
function float (el, n) {
  let value = el.value
  value = value.replace(/[^\d.]/g, '') // 只允许输入能数字和小数点
  value = value.replace(/^\./g, '') // 去掉开头的点
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 处理多个点的情况
  if (n && Number(n) > 0) {
    const d = new Array(Number(n)).fill('\\d').join('') // 构建正则表达式
    const reg = new RegExp(`^(\\-)*(\\d+)\\.(${d}).*$`, 'ig')
    value = value.replace(reg, '$1$2.$3') // 限制小数位数
  }
  if (value && !value.endsWith('.')) {
    // const regex = /\.!$/ // 注意 $ 表示字符串的结尾
    // console.log(regex.test(value)) // 输出: true
    value = Number(value).toString() // 去掉开头多个0
  }
  el.value = value
}

// 这里扩展限制的类型
const map = { float }

export default {
  bind (el, binding, vnode) {
    el = el.querySelector('.el-input__inner') || el.querySelector('.el-textarea__inner') || el
    let lock = false // 标记是否需要锁定输入框
    let isHandling = false // 标记是否正在处理
    let lastValue = null
    // input事件处理函数
    const handler = () => {
      if (lock) return // 如果当前为锁定状态，则不进行处理
      if (isHandling) return // 如果已经在处理中，则不进行处理
      if (el.value === lastValue) return // 输入内容没有变化，则不进行处理
      isHandling = true // 设置标记为处理中
      const modifiers = Object.keys(binding.modifiers)
      const newModifier = modifiers[0] || 'num'
      map[newModifier](el, binding.value || 2)
      lastValue = el.value // 记录当前输入框的值
      Promise.resolve().then(() => {
        // 异步处理，场景：火狐浏览器中，需要在最后派发input事件
        el.dispatchEvent(new Event('input'))
      })
      isHandling = false // 处理完毕后设置标记为非处理状态
    }
    el.addEventListener('input', handler)
    // compositionstart和compositionend事件解决的bug场景：限制只能输入数字的输入框，先输入数字，再切换为中文输入法，输入字母时，会将原来的数字删掉
    el.addEventListener('compositionstart', () => {
      lock = true
    })
    el.addEventListener('compositionend', () => {
      lock = false
      el.dispatchEvent(new Event('input'))
    })
    // 当指令与元素解绑时，移除事件监听器
    vnode.context.$once('hook:destroyed', () => {
      el.removeEventListener('input', handler)
    })
  }
}
