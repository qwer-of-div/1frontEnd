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
        let [required, disabled, options] = [true, false, []]
        if (item.id === 'city') { // 市
          item.options = this.form.province === '四川' ? ['成都'] : options
        } else if (item.id === 'area') {
          item.options = this.form.city === '成都' ? ['武侯区'] : options
        }
      })
      console.log('formListListen')
    },
    // 监听数据 xMind
    formChangeListen (item) {
      console.log(item, this.form, 'formChangeListen')
      if (item.id === 'province') {
        this.cityListen()
        return
      }
      if (item.id === 'city') {
        this.areaListen()
        return
      }
      if (item.id === 'type') {
        this.agentListen()
        return
      }
      if (['manager'].includes(item.id)) {
        if (this.form.isSame === '1') this.financeListen()
        return
      }
      if (['auth'].includes(item.id)) {
        if (this.form.type === '1') this.agentListen()
        return
      }
      if (['finance'].includes(item.id)) {
        if (this.form.type === '2') this.agentListen()
        return
      }
    },
    cityListen () {
      this.form.city = ''
      this.formChangeListen({ id: 'city' })
    },
    areaListen () {
      this.form.area = ''
      this.formChangeListen({ id: 'area' })
    },
    // 授权人信息
    authListen () {
      this.formChangeListen({ id: 'auth' })
    },
    // 财务人信息
    financeListen () {
      if (this.form.isSame === '1') {
        this.form.finance = this.form.manager
      } else {
        this.form.finance = ''
      }
      this.formChangeListen({ id: 'finance' })
    },
    // 经办人信息
    agentListen () {
      // 授权人1 授权人信息 财务责任人2 财务人信息 其他3
      if (this.form.type === '1') {
        this.form.agent = this.form.auth
      } else if (this.form.type === '2') {
        this.form.agent = this.form.finance
      } else {
        this.form.agent = ''
      }
    }
  }
}
</script>