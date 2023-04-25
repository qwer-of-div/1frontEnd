<template>
  <div class="page-container">
    <div class="page-content">
      <el-pagination :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     :page-sizes="[10, 20, 50, 100]"
                     layout="total, sizes, prev, pager, next, jumper"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"></el-pagination>
    </div>
  </div>
</template>
<script>
// <pagination-self :total="table.total" @paginationListen="paginationListen" ></pagination-self>

// 详情监听
// paginationListen ({currentPage, pageSize}) {
//   this.table.currentPage = currentPage
//   this.table.pageSize = pageSize
//   this.getTable()
// },

export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pCurrentPage: {
      type: Number,
      default: 1
    },
    pPageSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      currentPage: 1, // 当前页
      pageSize: 10 // 每页条数
    }
  },
  watch: {
    pCurrentPage (newVal, oldVal) {
      this.currentPage = newVal
    },
    pPageSize (newVal, oldVal) {
      this.pageSize = newVal
    }
  },
  methods: {
    // 条数切换
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.$emit('paginationListen', { currentPage: this.currentPage, pageSize: this.pageSize })
    },
    // 页码切换
    handleCurrentChange (val) {
      this.currentPage = val
      this.$emit('paginationListen', { currentPage: this.currentPage, pageSize: this.pageSize })
    }
  }
}
</script>
