<template>
  <div class="page-container">
    <div class="page-content">
      <h3>浏览器相关</h3>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      console.log('window', window)
      console.log('地址', location)
      console.log('浏览器版本', navigator)
      console.log('设备', navigator.userAgent)
    }
  }
}
</script>
