<template>
  <div class="page-container">
    <div class="page-content">
      <div>孩子</div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      eg: 'egChild'
    }
  },
  // beforeCreate () {
  //   console.log('beforeCreate孩子')
  // },
  created () {
    console.log('created孩子', this.eg)
  },
  // beforeMount () {
  //   console.log('beforeMount孩子')
  // },
  mounted () {
    console.log('mounted孩子', this.eg)
  },
  // beforeUpdate () {
  //   console.log('beforeUpdate孩子')
  // },
  // updated () {
  //   console.log('updated孩子')
  // },
  beforeDestroy () {
    console.log('beforeDestroy孩子', this.eg)
  },
  destroyed () {
    console.log('destroyed孩子', this.eg)
  }
}
</script>
