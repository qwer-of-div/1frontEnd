<template>
  <div class="page-container">
    <div class="page-content">
      <el-table :data="parentValue"
                style="width: 100%">
        <el-table-column v-for="item in colData"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

const parentValue = [
  { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
  { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
  { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄' }
]
const colData = [
  { label: '日期', prop: 'date', width: '180' },
  { label: '姓名', prop: 'name', width: '180' },
  { label: '地址', prop: 'address', width: '180' }
]

export default {
  name: 'myTable',
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    parentValue: {
      type: Array,
      default: () => parentValue
    },
    colData: { // 列值
      type: Array,
      default: () => colData
    }
  },
  data () {
    return {

    }
  }
}
</script>
