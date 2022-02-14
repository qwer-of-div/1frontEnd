<template>
  <el-select placeholder="è¯·é€‰æ‹©"
             filterable
             v-model="value"
             @change="change">
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
      value: ''
    }
  },
  props: {
    defaultValue: String,
    options: {
      type: Array,
      default: () => [],
    },
    id: {
      default: () => ''
    }
  },
  watch: {
    defaultValue (newVal, oldVal) {
      this.value = newVal;
    }
  },
  created () {
    this.value = this.defaultValue;
  },
  methods: {
    change (val) {
      this.$emit('selectSingleListen', val, this.id)
    }
  }
}
</script>