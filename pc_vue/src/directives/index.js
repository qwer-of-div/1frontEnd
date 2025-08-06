import './debounce'
import './throttle'

const files = require.context('.', false, /\.js$/)

export default {
  install (Vue) {
    files.keys().forEach((item) => {
      // if (item === './index.js') return
      if (['./delayOutput.js', './input.js', './money.js', './thounsandsMoney.js'].includes(item)) {
        const name = item.split('.')[1].replace('/', '')
        const module = files(item).default
        Vue.directive(name, module)
      }
    })
  }
}
