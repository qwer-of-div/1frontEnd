<template>
  <div class="page-container">
    <div class="page-content">
      <div class="main relative flex-col flex1"
           v-loading="flag.tableLoading === 1">
        <div class="table-wrap flex1">
          <el-table :data="table.data"
                    :border="true"
                    stripe
                    :header-cell-style="{background: 'rgb(245, 247, 250)',color:'#555'}">
            <el-table-column type="index"
                             label="序号"
                             align="center"
                             width="80">
              <template slot-scope="scope">{{ scope.$index + (form.pageNum - 1) * 10 + 1 }}</template>
            </el-table-column>
            <el-table-column v-for="item in init.tableCol"
                             :property="item.property"
                             :label="item.label"
                             align="center"
                             :key="item.property"></el-table-column>
          </el-table>
        </div>
        <div class="pagination-wrap">
          <el-pagination @current-change="handleCurrentChange"
                         :current-page="form.pageNum"
                         layout="total, prev, pager, next"
                         :total="table.total"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// table序号 pagination分页查询
import { contractQuery } from '@/api/service-spareparts';

const tableCol = [
  { property: "contractNumber", label: "合同号" },
  { property: "customerName", label: "客户" },
  { property: "engagement", label: "项目" },
  { property: "endCustomerName", label: "最终客户" },
  { property: "customerFirst", label: "代理" },
  { property: "customerFinal", label: "最终代理" },
  { property: "saleChannel", label: "渠道" },
  { property: "dataSource", label: "源系统" },
  { property: "country", label: "国家" },
  { property: "lv2RegionCnName", label: "地区部" },
  { property: "lv3RegionCnName", label: "代表处" },
  { property: "naType", label: "NA" },
  { property: "professionType", label: "行业" },
  { property: "startDate", label: "开始时间" },
  { property: "endDate", label: "结束时间" },
  { property: "poNumber", label: "PO编码" },
  { property: "prodCnName", label: "产品" }
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
  methods: {
    // 初始化
    handleInit () {
      this.getListLineNumber({ ...this.page.apiParams, proCode: res.payload.code, teamCode: res.payload.code })
    },


    // 分页
    handleCurrentChange (val) {
      this.form.pageNum = val
      this.getListDetail({ ...this.page.apiParams, "beginPowNumber": (val - 1) * 10, "endPowNumber": val * 10 + 1 })
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