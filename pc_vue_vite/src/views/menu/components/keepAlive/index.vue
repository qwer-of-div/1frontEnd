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
      name: 'keepAlive列表页'
    }
  },
  watch: {
    $route: {
      handler: function (to, from) {
        console.log(to, from, 'watch')
        if (from && !['keepAliveDetail', 'keepAlive'].includes(from.name)) {
          // Object.assign(this.$data, this.$options.data.call(this));
          Object.assign(this.$data, this.$options.data());
        }
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
    console.log('keepAlive列表页activated', this.$route)
  },
  deactivated () {
    console.log('keepAlive列表页deactivated')
  },
  methods: {
    onPush (name) {
      this.$router.push({ name })
    }
  }
}
</script>