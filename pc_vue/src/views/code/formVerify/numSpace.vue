<template>
  <div class="page-container">
    <div class="page-content formVerify">
      <h2>号码空格</h2>
      <hr />
      <div class="form-wrap">
        <el-form :model="page"
                 :rules="rules"
                 label-width="auto"
                 ref="numVerify">
          <el-form-item label="手机号"
                        prop="phone">
            <el-input v-model.trim="page.phone"
                      maxlength="13"
                      placeholder="请输入手机号"
                      ref="phone"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号"
                        prop="phone">
            <!-- <el-input v-model.trim="page.bank"
                      maxlength="22"
                      placeholder="请输入银行卡号"
                      ref="bank"></el-input> -->
            <el-input v-model.trim="page.bank"
                      placeholder="请输入银行卡号"
                      ref="bank"></el-input>
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
// el-input maxlength是否设置，影响字段长度最大时是否覆盖后面值、utils方法里的长度
import { hiddenStr, spacePhone, spaceBank } from '@/utils'
import validator from '@/utils/validator'

const mockPage = {
  phone: '15282062625',
  id: '510824199712293610',
  bank: '123456789123456789'
}

export default {
  data () {
    return {
      page: {
        phone: '',
        bank: ''
      },
      rules: {
        phone: [
          { validator: this.handlePhoneVerify, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.handleMock()
  },
  watch: {
    'page.phone': {
      handler (newVal, oldVal) {
        // 原生标签获取
        const elSpace = this.$refs.phone.$refs.input
        const resSpace = spacePhone({ el: elSpace, newVal, oldVal })
        // 修正光标位置，nextTick保证在渲染新值后定位光标
        this.$nextTick(() => {
          // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置 蓝色文字选中
          elSpace.selectionStart = resSpace.cursorIndex
          elSpace.selectionEnd = resSpace.cursorIndex
          this.page.phone = resSpace.value
        })
      }
      // immediate: true // Cannot read property '$refs' of undefined"
    },
    'page.bank': {
      handler (newVal, oldVal) {
        const elSpaceBank = this.$refs.bank.$refs.input
        const resSpace = spaceBank({ el: elSpaceBank, newVal, oldVal })
        // 修正光标位置，nextTick保证在渲染新值后定位光标
        this.$nextTick(() => {
          // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置 蓝色文字选中
          elSpaceBank.selectionStart = resSpace.cursorIndex
          elSpaceBank.selectionEnd = resSpace.cursorIndex
          this.page.bank = resSpace.value
        })
      }
    }
  },
  methods: {
    // mock数据
    handleMock () {
      for (const key in this.page) {
        this.page[key] = mockPage[key]
      }
    },

    // 提交
    onSubmit () {
      console.log(mockPage.phone, hiddenStr(mockPage.id), hiddenStr(mockPage.phone), '号码*展示')
      this.$refs.numVerify.validate((flag, obj) => {
        console.log(flag, obj, '验证结果和验证字段')
      })
    },

    // 表单校验规则
    // 手机验证
    handlePhoneVerify (rule, value, callback) {
      this.mixVerify = validator.isPhone(value)
      // if (!this.mixVerify.flag) return callback(new Error(this.mixVerify.label))
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
