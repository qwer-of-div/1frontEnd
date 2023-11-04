<template>
  <div class="page-container">
    <div class="page-content">
      <form-self :formList="formList"
                 :rules="rules"
                 :form="form"
                 @formChangeListen="formChangeListen">
        <template #zhuCeSlot>
          <el-input type="number"
                    v-model="form.zhuCeSlot"
                    @on-change="formChangeListen({ id: 'zhuCeSlot'})"></el-input>
        </template>
      </form-self>
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
      rules: {},
      form: {}
    }
  },
  computed: {
    formComputed () {
      return JSON.parse(JSON.stringify(this.form))
    }
  },
  watch: {
    formComputed: {
      handler (newVal, oldVal) {
        this.formListListen()
      }
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      // rules
    },
    // 监听结构
    formListListen () {
      this.formList.forEach(item => {
        let [required, disabled] = [true, false]
        if (item === 'name') {
          item.disabled = disabled
        }
      })
      console.log('formListListen')
    },
    // 监听数据 xMind
    formChangeListen (item) {
      console.log(item, this.form, 'formChangeListen')
      if (item.id === 'name') {
        return
      }
    },
    nameListen () {
      this.formChangeListen({ id: 'name' })
    }
  }
}
</script>