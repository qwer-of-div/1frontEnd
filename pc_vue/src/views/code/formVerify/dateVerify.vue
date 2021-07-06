<template>
  <div class="page-container">
    <div class="page-content formVerify">
      <h2>日期验证</h2>
      <hr />
      <div class="form-wrap">
        <el-form :model="form"
                 :rules="rules"
                 label-width="auto"
                 ref="dateVerify">
          <el-form-item label="日期"
                        prop="birth">
            <el-date-picker v-model.trim="form.birth"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
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
// el-date-picker空为null
import { dateFormat } from '@/utils'
import validator from '@/utils/validator'

const mockForm = {
  birth: '1997-12-29'
}

export default {
  data () {
    return {
      form: {
        birth: ''
      },
      rules: {
        birth: [
          { validator: this.handleDateVerify, trigger: 'blur' }
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
      this.$refs.dateVerify.validate((flag, obj) => {
        console.log(flag, obj, '验证结果和验证字段')
        this.mixVerify = validator.isIndate(this.form.birth)
        console.log(this.mixVerify.label, '是否有效')
        if (flag) {
          const date = dateFormat(this.form.birth)
          const dateStr = dateFormat(date)
          console.log(this.form.birth, date, dateStr, '格式化后的日期')
        }
      })
    },

    // 表单校验规则
    // 日期验证
    handleDateVerify (rule, value, callback) {
      this.mixVerify = validator.isAdult(value)
      if (!this.mixVerify.flag) return callback(new Error(this.mixVerify.label))
      console.log(this.mixVerify, 'mixin验证结果', value)
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
