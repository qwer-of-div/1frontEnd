<template>
  <div class="page-container">
    <div class="page-content">
      <div class="search">
        <el-form :inline="true"
                 :model="form"
                 ref="form">
          <el-row>
            <el-col>
              <el-form-item label="团队:">
                <el-cascader ref="cascaderEL"
                             v-model="page.teamCode"
                             :options="init.options"
                             :show-all-levels="false"
                             :props="init.propsOption"
                             filterable
                             @change="onCascaderChange"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// 一次全部加载options 点击圆圈选中 弹出框消失上
import { contractQuery } from '@/api/service-spareparts';

const defaultOptions = [
  {
    code: 'level1-1',
    name: '第一级1',
    children: []
  }
]

export default {
  data () {
    return {
      page: {
        teamCode: [], // cascader的值
        apiParams: { // 保存表格请求参数
          "teamLevel": "1",
          "teamCode": "",
          "proCode": "",
          "beginPowNumber": 0,
          "endPowNumber": 11
        },
      },
      init: {
        propsOption: { // 格式后台数据
          checkStrictly: true,
          value: 'code',
          label: 'name',
          children: 'children'
        },
        options: []
      }
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    // 初始化
    handleInit () {
      this.getTeamInfoMenu()
    },

    onCascaderChange (val) {
      this.getListLineNumber({ "teamLevel": this.$refs.cascaderEL.getCheckedNodes()[0].level, "teamCode": val[val.length - 1], "proCode": '133277' })
      // 点击圆圈消失
      this.$refs.cascaderEL.dropDownVisible = false
    },

    // 团队信息查询接口 api
    async getTeamInfoMenu () {
      this.flag.pageLoading = 1
      const res = await contractQuery.getTeamInfoMenu()
      this.flag.pageLoading = 2
      this.init.options = [res.payload]
      this.page.teamCode = [res.payload.code]
      this.getListLineNumber({ ...this.page.apiParams, proCode: res.payload.code, teamCode: res.payload.code })
    },
  }
}
</script>
