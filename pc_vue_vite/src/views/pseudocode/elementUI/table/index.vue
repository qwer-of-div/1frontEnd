<template>
  <div class="page-container">
    <div class="page-content flex-col table-max-height-wrap">
      <div class="table-wrap flex1"
           ref="table-wrap">
        <el-table :data="table.data"
                  :border="true"
                  stripe
                  :header-cell-style="{background: 'rgb(245, 247, 250)',color:'#555'}"
                  width="100%"
                  height="540px"
                  @sort-change="sortChange">
          <el-table-column type="index"
                           label="序号"
                           width="80"
                           align="center" />
          <!-- <template slot-scope="scope">{{ scope.$index + (form.pageNum - 1) * 10 + 1 }}</template> -->
          <el-table-column v-for="item in init.tableCol"
                           :prop="item.property"
                           :label="item.label"
                           :sortable="item.sortable"
                           align="center"
                           :key="item.property"
                           show-overflow-tooltip
                           min-width="150"
                           :width="item.width"></el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrap">
        <el-pagination @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       :current-page="form.pageNum"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="table.total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// table序号 pagination分页查询
// import { contractQuery } from '@/api/service-spareparts';

const tableCol = [
  { property: "contractNumber", label: "合同号", sortable: 'custom' },
  { property: "customerName", label: "客户", sortable: 'custom' },
  { property: "engagement", label: "项目", sortable: 'custom' },
]

export default {
  data () {
    return {
      page: {
        apiParams: { // 保存表格请求参数
          "teamLevel": "1",
          "teamCode": "",
          "proCode": "",
          "beginPowNumber": 0,
          "endPowNumber": 11
        },
      },
      form: {
        pageNum: 1,
      },
      table: {
        data: [],
        total: 0, // 表格总条数
      },
      flag: {
        tableLoading: 0 // 0无数据 1加载中 2有数据 初始化 失败
      },
      init: {
        tableCol,
      }
    }
  },
  created () {
    this.handleInit()
  },
  mounted () {
  },
  methods: {
    // 初始化
    handleInit () {
      console.log(import.meta.env, 852)
      this.table.data = res.building.data.list.filter((item, index) => {
        return index < 100
      })
      // this.getListLineNumber({ ...this.page.apiParams, proCode: res.payload.code, teamCode: res.payload.code })
    },

    indexMethod (index) {
      return index * 2
    },
    // 分页
    handleCurrentChange (val) {
      this.form.pageNum = val
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.getListDetail({ ...this.page.apiParams, "beginPowNumber": (val - 1) * 10, "endPowNumber": val * 10 + 1 })
    },// 分页
    handleSizeChange (val) {
      this.page.pageNo = 1
      this.page.pageSize = val;
      this.queryDoaDataByMonth({ ...this.fromParent, ...this.page }, 'page')
    },
    // 后端排序
    // 排序
    sortChange ({ prop, order }) {
      console.log(prop, order)
      //降序
      let sort = 'DESC'
      let prop1 = prop
      //升序
      if (order === "ascending") {
        sort = "ASC";
      } else if (!order) {
        prop1 = 'ticketCreationTime'
      }
      this.form.pageNo = 1
      this.getDoaDataTableInfo({ ...this.page.apiParams, pageNo: 1, sort, order: prop1 })
    },
    // 数据总量查询 api
    async getListLineNumber (params) {
      this.table.total = 0
      const res = await contractQuery.getListLineNumber(params)
      this.table.total = res.payload.lineNumber
      this.form.pageNum = 1
      this.getListDetail({ ...params, beginPowNumber: 0, endPowNumber: 11 })
    },
    // 列表明细查询 api
    async getListDetail (params) {
      this.page.apiParams = { ...params }
      this.table.data = []
      this.flag.tableLoading = 1
      const res = await contractQuery.getListDetail(params)
      if (res.success) {
        this.flag.tableLoading = 2
        this.table.data = res.payload
      } else {
        this.flag.tableLoading = 0
        this.$message({
          showClose: true,
          message: '获取数据失败',
          type: 'error'
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
.page-content {
  .table-wrap {
    margin: 0 auto;
  }
}
</style>
