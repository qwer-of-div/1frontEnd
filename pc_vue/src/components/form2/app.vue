<template>
  <div class="page-container">
    <div class="page-content">
      <form-self @formChangeListen="formChangeListen"></form-self>
    </div>
  </div>
</template>

<script>
import formSelf from './index'

export default {
  components: {
    formSelf
  },
  data () {
    return {
      formList: [],
      form: {}
    }
  },
  methods: {
    // 监听结构
    formListListen () {

      console.log('formListListen')
    },
    // 监听数据
    formChangeListen (item) {
      console.log(item, this.form, 'formChangeListen')
      if (item.id === 'name') {
      }
      // 下方包含上方
      if (['name', 'age'].includes(item.id)) {

      }
    }
  }
}
</script>