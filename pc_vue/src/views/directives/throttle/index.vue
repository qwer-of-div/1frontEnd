<template>
  <div class="page-container">
    <div class="page-content code">
      <h2>节流</h2>
      <hr />
      <div class="longPress-wrap">
        <el-button v-throttle:[args]="[handleThrottle, 'click', 1000]">节流</el-button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      navList: [],
      args: '节流参数'
    }
  },
  created () {
  },
  methods: {
    handleThrottle (args) {
      console.log(args)
    }
  }
}
</script>
