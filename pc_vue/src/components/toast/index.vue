<!-- main.vue 可配置版 -->
<template>
  <div class="toast"
       :class="type ? `toast--${type}` : ''">
    <p>{{ content }}</p>
  </div>
</template>

<script>
// 主要就改了 data
export default {
  name: 'Toast',
  data () {
    return {
      type: '',
      content: '',
      duration: 3000
    }
  },
  mounted () {
    setTimeout(() => {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el) // 当前组件this.$el
    }, this.duration)
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  width: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background: transparent;
  > p {
    padding: 12px 22px;
    text-align: center;
    font-size: 18px;
    border-radius: 4px;
    background: rgba(17, 17, 17, 0.7);
  }
  &--error p {
    background: rgba(255, 0, 0, 0.5);
  }
  &--success p {
    background: rgba(0, 255, 0, 0.5);
  }
}
</style>
