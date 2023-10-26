<template>
  <div id="app">
    <router-view v-if="isRefresh" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isRefresh: true
    }
  },
  watch: {
    '$store.state.refreshNum' () {
      this.reload()
    }
  },
  methods: {
    reload () {
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
      })
    }
  }
}
</script>