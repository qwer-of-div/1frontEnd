<template>
  <div class="page-container">
    <div class="page-content code">
      <h2>自定义指令</h2>
      <hr />
      <div class="navList-wrap">
        <my-navList :parentValue="navList"></my-navList>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
const mockNavList = [
  { label: '延迟输出', path: '/directives/delayOutput' }
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
