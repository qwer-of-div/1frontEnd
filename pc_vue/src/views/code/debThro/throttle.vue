<template>
  <div class="page-container">
    <div class="page-content throttle">
      <div class="form-wrap">

      </div>
    </div>
  </div>
</template>

<script>
// 节流 每隔多久一次
import { throttle } from '@/utils'

export default {
  data () {
    return {
      page: {
        label: 1
      }
    }
  },
  mounted () {
    console.log('节流函数')
    // 监听屏幕变化事件
    window.addEventListener('resize', this.listen)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.listen)
  },
  methods: {
    // 移除具名函数，匿名函数无法移除
    listen () {
      console.log('resize')
      this.handleThrottle(this.page.label) // 2调用return function this arguments
    },
    // 定义节流方法
    // 方法赋值
    handleThrottle: throttle(function (val) { this.afterCallback(val) }, 1000), // 1调用throttle return function 4调用afterCallback
    afterCallback (obj) {
      console.log('节流函数', obj)
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
