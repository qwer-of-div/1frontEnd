<template>
  <div class="page-container">
    <div class="page-content formVerify">
      <h2>身份证验证</h2>
      <hr />
      <div class="form-wrap">
        <el-form :model="form"
                 :rules="rules"
                 label-width="auto"
                 ref="idVerify">
          <el-form-item label="身份证"
                        prop="id">
            <el-input v-model.trim="form.id"
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
// el-form-item prop属性对应验证
import validator from '@/utils/validator'

export default {
  data () {
    return {
      query: { // 查询数据
        id: ''
      },
      queryEmpty: null,
      page: { // 上传数据 = {...res.page}
        // fromPage: '', // 不写 路由守卫(优先) 写在页面内router的动态参数:id传参 this.$route.params,this.$route.params
      },
      inputPage: { // 输入数据 前后端传入数据不一致数据
        date: new Date()
      },
      form: {
        id: ''
      },
      rules: {
        id: [
          { validator: this.handleIdVerify, trigger: 'blur' }
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
      if (process.env.NODE_ENV === 'development') {
        this.flag.devShow = true
      }
      // 置空
      this.queryEmpty = JSON.parse(JSON.stringify(this.query))
    },
    // 提交
    onSubmit () {
      this.$refs.idVerify.validate((flag, obj) => {
        console.log(flag, obj, '验证结果和验证字段')
      })
    },

    // 表单校验规则
    // 身份证验证
    handleIdVerify (rule, value, callback) {
      this.mixVerify = validator.isId(value)
      if (!this.mixVerify.flag) return callback(new Error(this.mixVerify.label))
      // if (!validator.isId(value).flag) return callback(new Error(validator.isId(value).label))
      console.log(this.mixVerify, 'mixin验证结果')
      callback()
    },
    // 所有表单验证
    handleVerify () {
      return true
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
