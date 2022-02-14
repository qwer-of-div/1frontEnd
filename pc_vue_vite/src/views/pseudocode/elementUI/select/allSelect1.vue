<template>
  <el-select v-model="value"
             size="small"
             multiple
             filterable
             collapse-tags
             placeholder="请选择"
             @change="change"
             clearable>
    <el-checkbox v-model="checked"
                 @change="flagAll"
                 v-if="isCheckbox">ALL</el-checkbox>
    <el-option v-for="item in options"
               :key="item.value || item"
               :label="item.label || item"
               :value="item.value || item"></el-option>
  </el-select>
</template>
<script>
export default {
  data () {
    return {
      value: [],
      checked: false
    }
  },
  props: {
    defaultValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    id: {
      default: () => ''
    },
    isCheckbox: {
      type: Boolean,
      default: () => true
    }
  },
  watch: {
    defaultValue (newVal, oldVal) {
      this.value = [...newVal];
    },
    value (newVal, oldVal) {
      // select全选按钮是否选中
      if (this.options.length > 0) {
        if (newVal.length === this.options.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      }
      // this.$emit('selectAllListen', newVal, this.id)
    },
  },
  created () {
    this.value = [...this.defaultValue];
  },
  methods: {
    // 点击全选
    flagAll () {
      this.value = []
      if (this.checked) {
        this.options.map((item) => {
          this.value.push(item.value || item)
        })
      } else {
        this.value = []
      }
      this.$emit('selectAllListen', this.value, this.id)
    },
    change (val) {
      this.$emit('selectAllListen', val, this.id)
    }
  }
}
</script>
<style lang="less" scoped>
.el-checkbox {
  padding-left: 20px !important;
  line-height: 34px !important;
  width: 190px !important;
}
</style>
