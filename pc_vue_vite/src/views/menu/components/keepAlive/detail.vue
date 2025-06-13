<template>
  {{ name }}
  <br>
  <el-button @click="onBack()">点击返回</el-button>
</template>

<script>
export default {
  name: 'keepAliveDetail',
  data () {
    return {
      name: 'keepAlive详情页'
    }
  },
  methods: {
    onBack () {
      this.$router.back()
    }
  }
}
</script>