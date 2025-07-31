const files = require.context('.', false, /\.js$/)

export default {
  install (Vue) {
    files.keys().forEach((item) => {
      // if (item === './index.js') return
      if (item === './delayOutput.js') {
        const name = item.split('.')[1].replace('/', '')
        const module = files(item).default
        Vue.directive(name, module)
      }
    })
  }
}
