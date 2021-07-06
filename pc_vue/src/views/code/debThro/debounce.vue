<template>
  <div class="page-container">
    <div class="page-content debounce">
      <div class="form-wrap">

      </div>
    </div>
  </div>
</template>

<script>
// 防抖 最后一次
import { debounce } from '@/utils'

export default {
  data () {
    return {
      page: {
        label: 1
      }
    }
  },
  mounted () {
    // window整个项目 监听屏幕变化事件
    window.addEventListener('resize', this.listen)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.listen)
  },
  methods: {
    listen () {
      console.log('resize')
      this.handleDebounce(this.page.label) // 2调用callback this args
    },
    // 定义防抖方法
    handleDebounce: debounce(function (val) { this.afterCallback(val) }, 1000), // 1调用debounce return function 4调用afterCallback
    afterCallback (val) {
      console.log('防抖函数', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  overflow: scroll;
  .form-wrap {
    width: 50%;
    height: 1800px;
    margin: 0 auto;
  }
}
</style>
