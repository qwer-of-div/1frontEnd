<template>
  <div class="page-container">
    <div class="page-content">
      <div ref="chart"
           class="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

// 默认值
const parentValue = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar'
  }]
}

export default {
  name: 'myEcharts',
  props: {
    parentValue: {
      type: Object,
      default: () => parentValue
    },
    noData: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      chart: null // echarts
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.chart)
      // this.chart.setOption(this.parentValue, true)
      this.chart.setOption(this.parentValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
