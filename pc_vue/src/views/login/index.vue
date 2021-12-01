<template>
  <div class="page-container">
    <div class="page-content page-login">
      <h2 ref="h2">登录</h2>
      <hr />
      <el-button type="primary"
                 @click="onLogin('0')">管理员登录</el-button>
      <el-button type="primary"
                 @click="onLogin('1')">用户1登录</el-button>
      <el-button type="primary"
                 @click="onLogin('2')">用户2登录</el-button>
      <el-button type="primary"
                 @click="onLogin('md5')">md5登录</el-button>
      <el-button type="primary"
                 @click="onLogin('no')">不登录</el-button>
      <el-button type="primary"
                 @click="onLogin('logout')">退出</el-button>
      <br>
      <br>
      <el-button type="primary"
                 @click="onLogin('loading')">请求样式</el-button>
      <br>
      <br>
      <el-button type="primary"
                 @click="onLogin('noData')">noData请求样式</el-button>
      <div class="myLoading-wrap">
        <my-loading :show="flag.loadShow">
          <div>{{res.message}}</div>
        </my-loading>
      </div>
      <div>
        <el-input v-model.trim="md5"
                  placeholder="密码"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
// async/await
export default {
  data () {
    return {
      md5: '',
      page: 'login',
      flag: {
        loadShow: 'initData'
      },
      res: {
        message: ''
      }
    }
  },
  created () {
    console.log(this.$store.state, 'vuex')
    // this.$api.localLogin(this.mixApiParams)
  },
  beforeDestroy () {
    // 可以获取dom
    // this.page = 'beforeDestroy'
    console.log('beforeDestroy', this.$refs.h2, this.page)
  },
  destroyed () {
    // 无法获取dom
    // this.page = 'destroyed'
    console.log('destroyed', this.$refs.h2, this.page)
  },
  methods: {
    // 登录
    // Api和参数想关判断
    async onLogin (role) {
      if (role === 'no') {
        this.$router.push('/menu')
        return
      }
      if (role === 'logout') {
        this.$router.push('/home')
        return
      }
      if (role === 'md5') {
        const password = this.$md5(this.md5)
        console.log('md5加密', password)
        return
      }
      // 新增：是否重复，数据总量
      // 删除：不能删除的某些数据、数据长度0
      // 查询：查询条件随意组合和单一查询的合理性 查询成功查询条件是否保存
      // 修改：哪条数据、哪个属性不可修改

      // 普通对象、list 提交处绝对要验证、数据转换 、数据本地存储

      // 数据转换
      // 数据验证 数据转换后再验证 item.bornCountry = McValidation.chooseDic1(dic.nativeplaceList, item.bornCountry) this.verify(obj)

      // 加载中loading
      // 加载消失
      // 数据展示 错误、无、大量
      this.mixApiParams = { username: `管理员${role}`, password: this.$md5('794621839'), role }
      // 请求样式
      if (['loading', 'noData'].includes(role)) {
        try {
          this.flag.loadShow = 'loading'
          const res = await this.$api.localLogin(this.mixApiParams)
          this.res.message = JSON.stringify(res)
          if (role === 'loading') {
            this.flag.loadShow = 'content'
          } else if (role === 'noData') {
            this.flag.loadShow = 'noData'
          }
        } catch (err) {
          this.flag.loadShow = 'error'
          console.log(err.code, '错误捕获')
        }
        return
      }
      this.localLogin()
      console.log('调用async/await函数后', '第二步')
    },
    // api
    // 登录
    async localLogin () {
      console.log('async/await前', '第一步')
      try {
        const res = await this.$api.localLogin(this.mixApiParams)
        console.log('res后台返回信息', 'params', res)
        console.log('async/await后', '第三步')
        // 数据本地存储
        this.onMixStore('queryData', this.mixApiParams)
        this.onMixStore('userInfo', res)
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
          return
        }
        this.$router.push('/menu')
      } catch (err) {
        console.log(err.code, '错误捕获')
      }
    }
  }
}
</script>
