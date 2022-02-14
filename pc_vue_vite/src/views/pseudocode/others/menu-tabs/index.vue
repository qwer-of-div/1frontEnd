<template>
  <div class="page-container">
    <div class="page-content">
      <h3>menu</h3>
      <div class="flex">
        <div class="menu-wrap"
             style="width:15%">
          <menu-self :menuList="$store.state.dic.menuList"></menu-self>
        </div>
        <div class="tabs-wrap"
             style="width:85%">
          <tabs-self></tabs-self>
        </div>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import menuSelf from './menu.vue'
import tabsSelf from './tabs.vue'

export default {
  components: { menuSelf, tabsSelf },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.tabs-wrap {
  padding: 0 20px;
  box-sizing: border-box;
}
</style>