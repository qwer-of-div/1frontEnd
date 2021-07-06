<template>
  <div class="page-container">
    <div class="page-content code">
      <h2>防抖节流</h2>
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
  { label: '防抖', path: '/code/debThro/debounce' },
  { label: '节流', path: '/code/debThro/throttle' }
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
