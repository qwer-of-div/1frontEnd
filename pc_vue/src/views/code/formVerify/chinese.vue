<template>
  <div class="page-container">
    <div class="page-content formVerify">
      <h2>邮箱、中文</h2>
      <hr />
      <div class="form-wrap">
        <el-form :model="form" :rules="rules" label-width="auto" ref="idVerify">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="请输入中、英文" prop="chinese">
            <el-input v-model.trim="form.chinese" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model.trim="form.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// el-form-item prop属性对应验证
import validator from '@/utils/validator'

const mockForm = {
  email: '794621839@qq.com',
  chinese: '李华',
  address: '飒飒大大飒飒'
}

export default {
  data () {
    return {
      form: {
        email: '',
        chinese: '',
        address: ''
      },
      rules: {
        email: [
          { validator: this.handleEmailVerify, trigger: 'blur' }
        ],
        chinese: [
          { validator: this.handleChinVerify, trigger: 'blur' }
        ],
        address: [
          { validator: this.handleAddressVerify, trigger: 'blur' }
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
      this.form = mockForm
    },

    // 提交
    onSubmit () {
      this.$refs.idVerify.validate((flag, obj) => {
        console.log(flag, obj, '验证结果和验证字段')
      })
    },

    // 表单校验规则
    // 邮箱验证
    handleEmailVerify (rule, value, callback) {
      this.mixVerify = validator.isEmail(value)
      if (!this.mixVerify.flag) return callback(new Error(this.mixVerify.label))
      // if (!validator.isId(value).flag) return callback(new Error(validator.isId(value).label))
      console.log(this.mixVerify, 'mixin验证结果')
      callback()
    },
    // 中、英文验证
    handleChinVerify (rule, value, callback) {
      this.mixVerify = validator.isChinese(value, 'engChinese')
      if (!this.mixVerify.flag) return callback(new Error(this.mixVerify.label))
      // if (!validator.isId(value).flag) return callback(new Error(validator.isId(value).label))
      console.log(this.mixVerify, 'mixin验证结果')
      callback()
    },
    // 地址验证
    handleAddressVerify (rule, value, callback) {
      this.mixVerify = validator.isAddress(value, 'engChinese')
      if (!this.mixVerify.flag) return callback(new Error(this.mixVerify.label))
      // if (!validator.isId(value).flag) return callback(new Error(validator.isId(value).label))
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
