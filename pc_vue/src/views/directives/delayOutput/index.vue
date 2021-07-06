<template>
  <div class="page-container">
    <div class="page-content code">
      <h2>延迟输出</h2>
      <hr />
      <div class="longPress-wrap">
        <el-button v-delayOutput="{name: '延迟输出'}">延迟输出</el-button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
const mockNavList = [
  { label: '自定义指令', path: '/directives/delayOutput' }
]

export default {
  data () {
    return {
      navList: []
    }
  },
  created () {
    this.handleMock()
  },
  methods: {
    // mock数据
    handleMock () {
      this.navList = mockNavList
    }
  }
}
</script>
