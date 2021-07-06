<template>
  <div class="page-container">
    <div class="page-content page-menu">
      <h2 @click="onExample">菜单{{$store.state.userInfo.role}}</h2>
      <h2 @click="$router.go(-1)">返回</h2>
      <hr />
      <div class="navList-wrap">
        <my-navList :parentValue="navList"></my-navList>
      </div>
      <hr />
      <div class="test-wrap"
           v-if="count > 5">
        <el-button type="primary"
                   @click="$router.push('/example')">测试模块</el-button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
const navList = [
  { label: '组件', path: '/components' },
  { label: '代码', path: '/code' },
  { label: '自定义指令', path: '/directives' },
  { label: 'canvas', path: '/canvas' },
  { label: '浏览器相关', path: '/browser' }
]

export default {
  data () {
    return {
      count: 0,
      navList: []
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    // mock数据
    handleInit () {
      this.navList = navList
    },
    // 测试模块
    onExample () {
      this.count++
    }
  }
}
</script>
