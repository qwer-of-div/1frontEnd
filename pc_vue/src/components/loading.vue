<template>
  <div class="page-container">
    <div class="page-content relative">
      <div class="init-data"
           v-show="show === 'initData'">初始数据</div>
      <div class="loading"
           v-show="show === 'loading'"
           v-loading="true"
           element-loading-background="transparent">加载中...</div>
      <div class="no-data"
           v-show="show === 'noData'">暂无数据</div>
      <div class="error"
           v-show="show === 'error'">请求失败</div>
      <div v-show="show === 'content'">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myLoading',
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    show: {
      type: String,
      default: 'initData'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  .init-data,
  .loading,
  .no-data,
  .error {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background: url("~@/assets/logo.png") #69f no-repeat center center;
  }
}
</style>
