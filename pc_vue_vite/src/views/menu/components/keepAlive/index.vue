<template>
  {{ name }}
  <br>
  <el-button @click="name = '已点击keepAlive列表页'" type="primary">点击切换</el-button>
  <el-button @click="onPush('keepAliveDetail')" type="primary">详情页</el-button>
  <el-button @click="onPush('keepAliveNoCache')" type="primary">noCache</el-button>
</template>

<script>
export default {
  name: 'keepAlive',
  data () {
    return {
      name: 'keepAlive列表页',
      isKeepAlive: false
    }
  },
  watch: {
    $route: {
      handler: function (to, from) {
        console.log(to, from, 'watch')
        if (!from || !['keepAliveDetail', 'keepAlive'].includes(from.name)) { // keepAlive离开组件时触发
          // Object.assign(this.$data, this.$options.data.call(this));
          Object.assign(this.$data, this.$options.data());
          this.isKeepAlive = false
        } else {
          this.isKeepAlive = true
        }
        console.log(this.isKeepAlive, '是否缓存状态')
      },
      immediate: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.name !== 'keepAliveDetail') {
        // Object.assign(vm.$data, vm.$options.data());
      }
    });
  },
  activated () {
    if (!this.isKeepAlive) {
      console.log('keepAlive列表页activated,重新请求数据')
      return
    }
    console.log('keepAlive列表页activated', this.$route)
  },
  deactivated () {
    console.log('keepAlive列表页deactivated')
  },
  methods: {
    onPush (name) {
      this.$router.push({ name })
    },
  }
}
</script>