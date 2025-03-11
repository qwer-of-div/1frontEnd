<template>
  <div>
    <img alt="Vue logo"
         src="./assets/logo.png" />
    1
  </div>
</template>

<script>

export default {
  name: 'App',
  created () {
    this.handleInit('2')
    this.handleInit(2)
  },
  methods: {
    // 对象判断
    handleInit (type) {
      const judgeObj = { 0: '00', 1: '01', 2: '02' }
      console.log(judgeObj[type], '对象判断')
    }
  }
}
</script>
