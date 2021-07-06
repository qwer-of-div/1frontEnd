<template>
  <div class="page-container">
    <div class="page-content formVerify">
      <h2>输入框格式化</h2>
      <hr />
      <div class="form-wrap">
        <el-form :model="form"
                 :rules="rules"
                 label-width="auto"
                 ref="idVerify">
          <el-form-item label="身份证"
                        prop="id">
            <el-input v-model="form.id"
                      placeholder="请输入身份证"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="dev-wrap"
           v-if="flag.devShow">
        <el-button type="primary"
                   @click="onDev">开发</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 表单字符串类型验证
import validator from '@/utils/validator1'

export default {
  data () {
    return {
      formReset: null,
      page: { // 上传数据 = {...res.page}
        // fromPage: '', // 不写 路由守卫(优先) 写在页面内router的动态参数:id传参 this.$route.params,this.$route.params
      },
      form: {
        id: ''
      },
      rules: {
        id: [
        ]
      },
      flag: {
        popupShow: false,
        isAPP: false,
        isWeChat: false,
        devShow: false // 开发展示
      }
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    // 初始化数据
    handleInit () {
      // 开发阶段
      if (process.env.NODE_ENV === 'development') this.flag.devShow = true
      // 置空
      this.formReset = JSON.parse(JSON.stringify(this.form))
    },
    // 提交
    onSubmit () {
      console.log('纯数字校验', validator.isStrType(this.form.id))
      console.log('纯中文校验', validator.isStrType(this.form.id, '纯数字', 'num'))
      console.log('纯英文校验', validator.isStrType(this.form.id, '纯英文', 'english'))
      console.log('字符校验', validator.isStrType(this.form.id, '字符', 'specChar'))
    },

    // 开发点击
    onDev () {
      this.form = { ...window.input.building }
      console.log(window.input.building, '假数据')
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
