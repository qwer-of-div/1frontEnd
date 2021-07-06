<template>
  <div class="page-container">
    <div class="page-content keep-alive">
      <br />
      <h3>webview</h3>
      <br />
      <el-tabs v-model="activeName"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane label="用户管理"
                     name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理"
                     name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理"
                     name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿"
                     name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      from: '',
      activeName: 'first'
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(from)
    if (['/', '/components/echarts'].includes(from.path)) {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next(vm => {
      vm.from = from.path
    })
  },

  // // 其他页面刷新 不保留状态
  // beforeRouteLeave (to, from, next) {
  //   if (to.name === 'echarts') {
  //     from.meta.keepAlive = true
  //   } else {
  //     from.meta.keepAlive = false
  //   }
  //   next()
  // },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
