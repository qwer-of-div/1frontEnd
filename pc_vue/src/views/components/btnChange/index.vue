<template>
  <div class="page-container">
    <div class="page-content">
      <my-btn-change :type="singleBar.type"
                     @fromChild="handlemyBtnChange"></my-btn-change>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      singleBar: {
        type: 'oneBar'
      }
    }
  },
  methods: {
    // 子传父
    handlemyBtnChange (obj) {
      // if (obj.type === this.singleBar.type) {
      //   console.log(obj.item)
      // }
      this.$myToast({
        content: '哈哈哈哈，消失的贼快',
        duration: 1000
      })
      // this.$myToast.error({ content: '竟然失败了' })
      console.log(obj)
    }
  }
}
</script>
