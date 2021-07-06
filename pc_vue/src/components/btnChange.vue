<template>
  <div class="page-container">
    <div class="page-content">
      <ul class="flex">
        <li v-for="(item,index) in parentValue"
            :key="item.path">
          <el-button :class="[{'active-btn':index===active}]"
                     @click="onChange(item,index)">{{item.label}}</el-button>
        </li>
      </ul>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

const parentValue = [
  { label: '按钮切换', path: '/components/btnChange' },
  { label: '按钮切换1', path: '/components/btnChange1' },
  { label: '按钮切换2', path: '/components/btnChange2' }
]

export default {
  name: 'myBtnChange',
  props: {
    type: { // 标识识别
      type: String,
      default: 'normal'
    },
    parentValue: { // 父组件传值
      type: Array,
      default: () => parentValue
    }
  },
  data () {
    return {
      active: 0 // 激活的index
    }
  },
  methods: {
    // 按钮切换
    onChange (item, index) {
      this.active = index
      // this.$emit('fromChild', { ...item })
      // this.$emit('fromChild', { type: this.type, item })
      this.$emit('fromChild', { type: this.type, item, index })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  ul {
    justify-content: center;
    .active-btn {
      background-color: #096;
    }
  }
}
</style>
