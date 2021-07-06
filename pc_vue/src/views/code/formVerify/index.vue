<template>
  <div class="page-container">
    <div class="page-content code">
      <h2>表单验证</h2>
      <hr />
      <div class="navList-wrap">
        <my-navList :parentValue="navList"></my-navList>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
const navList = [
  { label: '身份证验证', path: '/code/formVerify/idVerify' },
  { label: '日期验证', path: '/code/formVerify/dateVerify' },
  { label: '号码空格', path: '/code/formVerify/numSpace' },
  { label: '邮箱、中文', path: '/code/formVerify/chinese' },
  { label: '密码', path: '/code/formVerify/password' },
  { label: '文件上传', path: '/code/formVerify/upload' },
  { label: '输入框格式化', path: '/code/formVerify/format' }
]

export default {
  data () {
    return {
      navList: []
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    // init数据
    handleInit () {
      this.navList = navList
    }
  }
}
</script>
