<template>
  <div class="page-container">
    <div class="page-content my-navList">
      <!-- <h3>导航_全局组件</h3> -->
      <ul>
        <li v-for="(item,index) in parentValue"
            :key="item.path">
          <router-link :to="{name:item.name}">{{item.label}}</router-link>
          <span v-if="index !== (parentValue.length - 1)">|</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const parentValue = [
  { label: '组件', name: 'components' },
  { label: '代码', name: 'code' },
  { label: '工具', name: 'utils' }
]

export default {
  name: 'myNavList',
  props: {
    type: { // 标识识别
      type: String,
      default: 'normal'
    },
    parentValue: { // 父组件传值
      type: Array,
      default: () => parentValue
    }
  }
}
</script>

<style lang="scss" scoped>
.my-navList {
  ul {
    display: flex;
    justify-content: center;
  }
}
</style>
