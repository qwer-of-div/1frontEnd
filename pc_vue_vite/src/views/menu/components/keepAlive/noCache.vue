<template>
  {{ name }}
  <br>
  <el-button @click="onBack()">点击返回</el-button>
</template>

<script>
export default {
  name: 'keepAliveNoCache',
  data () {
    return {
      name: 'keepAliveNoCache'
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'keepAlive'
      })
    }
  }
}
</script>