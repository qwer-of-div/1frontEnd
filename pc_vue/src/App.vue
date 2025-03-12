<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created () {
    console.log('createdApp')
  },
  mounted () {
    /* 区分关闭和刷新，关闭退出登录 start */
    window.onload = () => {
      if (!window.sessionStorage.getItem('tempFlag')) {
        // 首次
        localStorage.setItem('queryData', JSON.stringify({ a: '1' }))
      } else {
        window.sessionStorage.removeItem('tempFlag')
        localStorage.setItem('queryData', JSON.stringify({ a: '2' }))
      }
    }
    window.onunload = () => {
      window.sessionStorage.setItem('tempFlag', true)
    }
    window.onbeforeunload = () => {
      window.sessionStorage.setItem('tempFlag', true)
    }
  },
  derstoryed () {
    console.log('derstoryedApp', this)
  }
}
</script>

<style lang="scss">
@import "./assets/style/common.scss";
@import "./assets/style/page.scss";
@import "./assets/style/reset.css";
</style>
