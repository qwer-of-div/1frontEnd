<template>
  <div>
    <h3>vue3</h3>
    <my-nav-list :parentValue="init.navList" />
    <div class="router-wrap">
      <router-view />
    </div>
  </div>
</template>

<script>
const navList = [
  { label: "ref变量定义", name: 'ref' },
  { label: 'reactive变量定义', name: 'reactive' },
  { label: '计算属性', name: 'computed' },
  { label: '监听', name: 'watch' },
  { label: '钩子函数', name: 'hook' },
  { label: 'refs元素', name: 'refs' },
  { label: 'hooks函数', name: 'hooks' },
  { label: 'pinia', name: 'pinia' },
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