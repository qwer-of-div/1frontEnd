<template>
  <div class="page-container">
    <div class="page-content page-login">
      <h2 ref="h2">请求数据</h2>
      <hr />
      <el-button type="primary"
                 @click="onLogin('1')">请求数据</el-button>
      <el-button type="primary"
                 @click="onLogin('')">请求数据为空</el-button>
      <hr />
      <div class="info-wrap">
        <my-loading :show="show">
          <div class="info">
            <div>{{info.username}}</div>
            <div>{{info.password}}</div>
            <div>{{info.role}}</div>
          </div>
        </my-loading>
      </div>
    </div>
  </div>
</template>

<script>
// 初始显示 请求中 请求后 请求失败
export default {
  data () {
    return {
      show: 'initData',
      info: {
        username: '',
        password: '',
        role: ''
      }
    }
  },
  created () {
    console.log(this.$store.state, 'vuex')
  },
  methods: {
    // 登录
    async onLogin (role) {
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
      this.localLogin()
    },
    // api
    // 登录
    async localLogin () {
      this.show = 'loading'
      try {
        const res = await this.$api.localLogin(this.mixApiParams)
        console.log('res后台返回信息', 'params', res)
        for (const key in this.info) {
          this.info[key] = res[key]
        }
        if (!res.role) {
          this.show = 'noData'
          return
        }
        this.show = 'content'
        console.log(this.$data, this.$options.data()) // 还原data
      } catch (err) {
        this.show = 'error'
        console.log(err, '错误处理')
      } finally {
        console.log('finally') // return对其无效
      }
      console.log('执行') // return 不执行
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  .info-wrap {
    .info {
      color: #096;
    }
  }
}
</style>
