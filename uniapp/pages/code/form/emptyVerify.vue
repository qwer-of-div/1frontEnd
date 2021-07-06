<template>
  <view>
    <uni-navbar ref="disableValue1">
      <template slot="right">
        <view class="message-box right-item">
          <u-icon name="chat"
                  size="38"></u-icon>
          <u-badge count="18"
                   size="mini"
                   :offset="[-15, -15]"></u-badge>
        </view>
        <view class="dot-box right-item">
          <u-icon name="calendar-fill"
                  size="38"></u-icon>
          <u-badge size="mini"
                   :is-dot="true"
                   :offset="[-6, -6]"></u-badge>
        </view>
      </template>
    </uni-navbar>
    <br />
    <view class="form-wrap">
      <u-form :model="form"
              label-width="auto"
              :error-type="errorType"
              ref="uForm">
        <u-form-item label="身份证"
                     prop="id">
          <u-input v-model="form.id"
                   border></u-input>
        </u-form-item>
      </u-form>
      <u-button type="primary"
                @click="onSubmit">提交</u-button>
    </view>
  </view>
</template>

<script>
import validator from '@/utils/validator.js'
// toJOSON 版本问题
export default {
  data () {
    return {
      errorType: ['border', 'message', 'toast'],
      form: {
        id: ''
      },
      rules: {
        id: [{
          require: true,
          message: 'require无效',
          trigger: ['change', 'blur']
        }, {
          validator: (rule, value, callback) => {
            rule.message = `证件号不能为空`
            return validator.isNotEmpty(value)
          },
          message: '请输入证件号validator',
          trigger: ['change', 'blur']
        }]
      }
    }
  },
  onLoad () {
    console.log('onLoad返回不会触发', this.$refs['disableValue1'])
  },
  onShow () {
    console.log('onShow返回会触发', this.$refs['disableValue1'])
  },
  onReady () {
    this.$refs['uForm'].setRules(this.rules)
    // toJSON报错
    console.log('onReady返回不会触发', this.$refs.uForm)
  },
  onHide () {
    console.log('触发onUnload不会触发onHide')
  },
  onUnload () {
    console.log('onUnload')
  },
  methods: {
    onSubmit () { // 提交
      this.$refs['uForm'].validate(valid => {
        console.log(valid)
        if (valid) {
          console.log(this, '验证通过')
        } else {
          console.log('验证失败')
        }
      })
    },
  }
}
</script>

<style>
</style>
