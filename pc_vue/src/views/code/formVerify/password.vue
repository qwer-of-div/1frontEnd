<template>
  <div class="page-container">
    <div class="page-content formVerify">
      <h2>密码验证</h2>
      <hr />
      <div class="form-wrap">
        <el-form :model="form"
                 :rules="rules"
                 label-width="auto"
                 ref="idVerify">
          <el-form-item label="密码"
                        prop="password">
            <el-input placeholder="请输入密码"
                      v-model.trim="form.password"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="重复密码">
            <el-input placeholder="请输入密码"
                      v-model.trim="form.rePassword"
                      show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// el-form-item prop属性对应验证
import validator from '@/utils/validator'

export default {
  data () {
    return {
      form: {
        password: '',
        rePassword: ''
      },
      rules: {
        password: [
          { validator: this.handlePasswordVerify, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.handleMock()
  },
  methods: {
    // mock数据
    handleMock () {
    },
    // 提交
    onSubmit () {
      this.$refs.idVerify.validate((flag, obj) => {
        console.log(flag, obj, '验证结果和验证字段')
      })
    },
    // 表单校验规则
    handlePasswordVerify (rule, value, callback) {
      this.mixVerify = validator.pwdStrength(value)
      if (!this.mixVerify.flag) return callback(new Error(this.mixVerify.label))
      console.log(this.mixVerify, 'mixin验证结果')
      callback()
    }
  }
}
</script>

<style lang="scss" scoped>
.formVerify {
  .form-wrap {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
