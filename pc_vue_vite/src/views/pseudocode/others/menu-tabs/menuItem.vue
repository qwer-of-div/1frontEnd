<template>
  <!-- this.parentItem.id 点击el-sub-menu展开哪一个 -->
  <el-sub-menu :index="`${this.parentItem.path}`">
    <template #title>
      <el-icon>
        <component v-bind:is="'el-icon-'+this.parentItem.iconType"></component>
      </el-icon>
      <span>{{ this.parentItem.label }}</span>
    </template>
    <template v-for="item in this.parentItem.children">
      <side-menu-item v-if="item.children && item.children.length > 0"
                      :parent-item="item"
                      :key="item.path" />
      <el-menu-item v-else
                    :index="item.path"
                    :key="item.path">
        <el-icon>
          <component v-bind:is="'el-icon-'+item.iconType"></component>
        </el-icon>
        <template #title>{{ item.label }}</template>
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props: {
    parentItem: {
      type: Object,
      default: () => {
      }
    }
  },
  created () {
    console.log(this.parentItem)
  }
}
</script>