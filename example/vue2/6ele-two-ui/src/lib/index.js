import SzrTable from './szr-table/index.js'

// 存储组件列表
const components = [
  SzrTable
]
const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  SzrTable
}
