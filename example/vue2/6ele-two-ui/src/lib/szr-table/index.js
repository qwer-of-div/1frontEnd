import SzrTable from './SzrTable.vue'

SzrTable.install = function (Vue) {
  console.log(SzrTable.name)
  Vue.component(SzrTable.name, SzrTable)
}

export default SzrTable
