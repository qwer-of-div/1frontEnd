<template>
  <div class="page-container">
    <div class="page-content code">
      <h2>代码</h2>
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
  { label: '表单验证', path: '/code/formVerify' },
  { label: '防抖节流', path: '/code/debThro' },
  { label: '工具函数', path: '/code/utils' },
  { label: '工具函数1', path: '/code/utils1' },
  { label: '伪代码', path: '/code/pseudoCode' },
  { label: '对象拷贝', path: '/code/objCopy' }
]

export default {
  data (vm) {
    return {
      navList: [],
      columns: columns(vm),
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
