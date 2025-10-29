<template>
  <div>
    sameName
    <el-button @click="onTest">console</el-button>
  </div>
</template>

<script>
// worker不能和路由同名文件夹
export default {
  name: 'sameName',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    onTest () {
      this.worker = new Worker('./worker1/hash-worker1.js')
      console.log('sameName')
    }
  }
}
</script>