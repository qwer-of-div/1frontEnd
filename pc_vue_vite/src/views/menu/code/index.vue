<template>
  <div>
    <h3>code</h3>
    <my-nav-list :parentValue="init.navList" />
    <div class="router-wrap">
      <router-view />
    </div>
  </div>
</template>

<script>
const navList = [
  { label: '对象判断', name: 'judgeObj' },
  { label: 'asyncAwait', name: 'asyncAwait' },
]

export default {
  data () {
    return {
      page: {
      },
      init: {
        navList
      }
    }
  },
  created () {
    // console.log(this.$route, this.$route.query)
  }
}
</script>
