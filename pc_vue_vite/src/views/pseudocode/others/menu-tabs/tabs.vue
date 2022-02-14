<template>
  <div class="page-container">
    <div class="page-content tabs-common-wrap">
      <div class="header flex">
        <el-tabs class="flex1"
                 v-model="$store.state.menu.actived"
                 type="card"
                 @tab-remove="removeTab"
                 @tab-click="onTabs">
          <el-tab-pane v-for="item in $store.state.menu.list"
                       :key="item.path"
                       :label="item.label"
                       :name="item.path"
                       :closable="item.path !==$store.state.menu.list[0].path"></el-tab-pane>
        </el-tabs>
        <el-dropdown placement="bottom"
                     @command="onCommand">
          <span class="el-dropdown-link">
            标签
            <el-icon class="el-icon--right">
              <el-icon-delete />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="all">关闭所有</el-dropdown-item>
              <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    menuActived () {
      return this.$store.state.menu.actived
    }
  },
  watch: {
    menuActived: {
      handler (newVal) {
        this.$router.push({
          path: `/others/menuTabs/${newVal}`
        })
      }
    }
  },
  methods: {
    onTabs (item) {
      this.$store.commit('menuSet', { actived: item.props.name, list: JSON.parse(JSON.stringify(this.$store.state.menu.list)) });
    },
    removeTab (name) {
      let actived = this.$store.state.menu.actived
      const list = JSON.parse(JSON.stringify(this.$store.state.menu.list))
      if (name === actived) actived = list[list.findIndex(item => item.path === name) - 1].path
      list.splice(list.findIndex(item => item.path === name), 1)
      this.$store.commit('menuSet', { actived, list });
    },
    onCommand (item) {
      let actived = this.$store.state.menu.actived
      const list = JSON.parse(JSON.stringify(this.$store.state.menu.list))
      if (item === 'all') {
        this.$store.commit('menuSet', { actived: list[0].path, list: [list[0]] });
        return
      }
      if (actived === 'menu1') {
        this.$store.commit('menuSet', { actived: list[0].path, list: [list[0]] });
        return
      }
      this.$store.commit('menuSet', { actived, list: [list[0], list.find(item => item.path === actived)] });
    }
  }
}
</script>

<style lang="less">
.tabs-common-wrap {
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs--card > .el-tabs__header {
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #ccc;
  }
  .el-tabs__item {
    height: auto;
    line-height: 30px;
    &:last-child {
      border-right: 1px solid #ccc;
    }
  }
  .is-scrollable {
    .el-tabs__item {
      &:last-child {
        border-right: none;
      }
    }
  }
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    line-height: 35px;
    border-right: 1px solid #ccc;
  }
  .el-tabs__nav-next {
    border-left: 1px solid #ccc;
  }
}
</style>

<style lang="less" scoped>
.tabs-common-wrap {
  .header {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .el-dropdown {
    width: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>