<template>
  <div>
    <h3>对象判断</h3>
  </div>
</template>

<script>

export default {
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
