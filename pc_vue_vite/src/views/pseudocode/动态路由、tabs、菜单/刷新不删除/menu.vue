<template>
  <div class="side-menu-wrapper">
    <slot />
    <el-scrollbar ref="menu-scrollbar" class="menu-scrollbar">
      <el-menu
        class="menu-root"
        :collapse="collapsed"
        :unique-opened="accordion"
        background-color="#1f2d3d"
        text-color="rgba(255, 255, 255, 0.7)"
        active-text-color="#409eff"
        :default-active="$store.state.user.tabs.actived"
        :default-openeds="openedNames"
        @select="handleSelect"
      >
        <template v-for="item in menuList">
          <side-menu-item
            v-if="item.children && item.children.length > 0"
            :parent-item="item"
            :key="item.path"
          />
          <el-menu-item v-else :index="item.path" :key="item.path">
            <el-icon>
              <component v-bind:is="'el-icon-'+item.iconType"></component>
            </el-icon>
            <template #title>{{ item.label }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { nextTick } from 'vue'
import SideMenuItem from './menuItem.vue'

export default {
  name: 'SideMenu',
  components: {
    SideMenuItem
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: String,
    accordion: {
      type: Boolean,
      default: false
    },
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  computed: {
      tabList () {
          return this.$store.state.user.tabs.list
      }
  },
  methods: {
    findItem (list = [], id = 'test', key = 'path') {
      for (let item of list || []) {
          // 递归函数层级内的 return 只会结束本层级函数
        if (item[key] === id) return item
        const item1 = this.findItem(item.children, id)
        if (item1) return item1
      }
    },
    handleSelect (path) {
      const list = JSON.parse(JSON.stringify(this.tabList))
      !this.tabList.find(item => item.path === path) && list.push(this.findItem(this.menuList, path))
      this.$store.commit('user/tabSet', { actived: path, list });
      // this.$router.push({
      //   path: `/others/menuTabs/${path}`
      // })
    }
  }
}
</script>
