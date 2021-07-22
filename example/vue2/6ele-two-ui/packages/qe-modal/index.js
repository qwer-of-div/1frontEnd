import qeModal from './src/qe-modal'

qeModal.install = function (Vue) {
  Vue.component(qeModal.name, qeModal)
}

export default qeModal
