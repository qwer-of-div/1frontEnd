<template>
  <div>
    <h3>login</h3>
    <el-button type="primary"
               @click="onMenu(1)">菜单</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    onMenu (index) {
      console.log(index, 'index')
      this.$router.push({
        path: 'menu',
        query: {
          index
        }
      })
    }
  }
}
</script>


