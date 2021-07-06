<template>
  <div class="page-container">
    <div class="page-content formVerify">
      <h2>utils工具函数1</h2>
    </div>
  </div>
</template>

<script>
// el-form-item prop属性对应验证
// import { mapState, mapMutations } from 'vuex'
import { delRepeat, listRepeat } from '@/utils/index1'

const mockPage = {
  repeatList: [
    {
      label: '张三',
      id: 18
    }, {
      label: '李四',
      id: 19
    }, {
      label: '王五',
      id: 20
    }, {
      label: '王五',
      id: 20
    }
  ],
  repeatList1: [1, 1, 3, 3, 4, 4, 6, 6, '7', '7']
}

export default {
  data () {
    return {
      page: {
      },
      flag: {
      },
      init: {
      }
    }
  },
  created () {
    this.handleMock()
  },
  methods: {
    // mock数据
    handleMock () {
      console.log(delRepeat(mockPage.repeatList1), '简单类型数组去重')
      console.log(listRepeat(mockPage.repeatList), '复杂类型数组去重')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
