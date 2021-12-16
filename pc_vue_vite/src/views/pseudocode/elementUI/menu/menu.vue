<template>
  <div class="side-menu-wrapper">
    <slot />
    <el-scrollbar ref="menu-scrollbar"
                  class="menu-scrollbar">
      <el-menu class="menu-root"
               :collapse="collapsed"
               :unique-opened="accordion"
               background-color="#1f2d3d"
               text-color="rgba(255, 255, 255, 0.7)"
               active-text-color="#409eff"
               :default-active="activeName"
               :default-openeds="openedNames"
               @select="handleSelect">
        <template v-for="item in menuList">
          <side-menu-item v-if="item.children && item.children.length > 0"
                          :parent-item="item"
                          :key="item.name" />
          <el-menu-item v-else
                        :index="item.path"
                        :key="item.name">
            <el-icon>
              <component v-bind:is="'el-icon-'+item.iconType"></component>
            </el-icon>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { nextTick } from 'vue'
// import { getOpenedNamesByActiveName } from '@/libs/tools'
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
      default: true
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
  methods: {
    handleSelect (path) {
      console.log(path, 333)
      this.$router.push({
        path: `/others/menuTabs/${path}`
      })
    }
  },
}
</script>