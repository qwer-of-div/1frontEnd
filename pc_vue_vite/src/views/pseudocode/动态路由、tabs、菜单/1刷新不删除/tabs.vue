<template>
  <div class="page-container">
    <div class="page-content tabs-common-wrap">
      <div class="header flex">
        <el-tabs
          class="flex1"
          v-model="$store.state.user.tabs.actived"
          type="card"
          @tab-remove="removeTab"
          @tab-click="onTabs"
        >
          <el-tab-pane
            v-for="item in $store.state.user.tabs.list"
            :key="item.path"
            :label="item.label"
            :name="item.path"
            :closable="item.path !==$store.state.user.tabs.list[0].path"
          ></el-tab-pane>
        </el-tabs>
        <el-dropdown placement="bottom" @command="onCommand">
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
    tabsActived () {
      return this.$store.state.user.tabs.actived
    },
    tabList () {
          return this.$store.state.user.tabs.list
    }
  },
  watch: {
    tabsActived: {
      handler (newVal) {
        this.$router.push({
          path: newVal
        })
      }
    }
  },
  methods: {
    // 点击
    onTabs (item) {
      this.$store.commit('user/tabSet', { actived: item.paneName, list: JSON.parse(JSON.stringify(this.tabList)) });
    },
    // 删除
    removeTab (name) {
      let actived = this.tabsActived
      const list = JSON.parse(JSON.stringify(this.tabList))
      if (name === actived) actived = list[list.findIndex(item => item.path === name) - 1].path
      list.splice(list.findIndex(item => item.path === name), 1)
      this.$store.commit('user/tabSet', { actived, list });
    },
    // 右侧按钮点击
    onCommand (item) {
      let actived = this.tabsActived
      const list = JSON.parse(JSON.stringify(this.tabList))
      if (item === 'all') {
        this.$store.commit('user/tabSet', { actived: list[0].path, list: [list[0]] });
        return
      }
      if (actived === this.$store.state.user.dic.homeRouter.path) {
        this.$store.commit('user/tabSet', { actived: list[0].path, list: [list[0]] });
        return
      }
      this.$store.commit('user/tabSet', { actived, list: [list[0], list.find(item => item.path === actived)] });
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
