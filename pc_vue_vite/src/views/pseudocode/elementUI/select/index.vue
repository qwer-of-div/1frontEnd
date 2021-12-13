<template>
  <div class="page-container">
    <div class="page-content">
      <div class="title-wrap">
        <all-select placeholder="状态"
                    :selectOptions="plan.options"
                    :mulSelecteds="plan.mulSelecteds"
                    @update:updateMultipleSelect="(val) => (plan.mulSelecteds = val)"></all-select>
      </div>
    </div>
  </div>
</template>

<script>
import allSelect from './allSelect'
import { planLine } from '@/api/service-buglist2';

const options = [
  {
    value: "submittedList",
    label: '待提交'
  },
  {
    value: "reviewedList",
    label: '待评审'
  },
  {
    value: "rehearsedList",
    label: '待演练'
  },
  {
    value: "archivedList",
    label: '待归档'
  },
  {
    value: "cancelList",
    label: '已取消关闭'
  },
  {
    value: "reviewClosureList",
    label: '已评审关闭'
  },
  {
    value: "archiveClosureList",
    label: '已归档关闭'
  }
]

export default {
  components: { allSelect },
  data () {
    return {
      page: {
        apiParams: '', // 保留上级请求参数
      },
      plan: { // 预案
        options,
        allNumber: 0,
        mulSelecteds: [], // 已选中项
        mulSelectedslabel: [] // 选中label
      }
    }
  },
  computed: {
    pageNew () {
      const planMulSelecteds = {
        apiParams: this.page.apiParams,
        mulSelecteds: this.plan.mulSelecteds
      }
      return {
        planMulSelecteds
      }
    },
  },

  watch: {
    'pageNew.planMulSelecteds': {
      handler (newVal) {
        newVal.apiParams && this.planLine(newVal.apiParams)
      },
      deep: true
    }
  },
  methods: {
    // 预案 api
    async planLine (params) {
      let state = 'all'
      this.plan.mulSelectedslabel = []
      if (this.plan.mulSelecteds.length) {
        for (let item of this.plan.mulSelecteds) {
          for (let it of this.plan.options) {
            if (item === it.value) {
              this.plan.mulSelectedslabel.push(it.label)
              break
            }
          }
        }
        state = this.plan.mulSelectedslabel.join(',')
      } else {
        this.plan.mulSelectedslabel = options.map(item => {
          return item.label
        })
      }
      let tempParams = `${params}&state=${state}`
      const res = await planLine(tempParams)
      this.plan.allNumber = res.data[0].allNumber
    },
  }
}
</script>
