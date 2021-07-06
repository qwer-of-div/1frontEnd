<template>
  <div class="page-container">
    <div class="page-content flex-col">
      <div class="echarts-wrap flex1">
        <my-echarts :parentValue="multHorizBar.option"></my-echarts>
      </div>
    </div>
  </div>
</template>

<script>
import { multHorizBarOption } from '@/utils/option.js'

export default {
  data () {
    return {
      multHorizBar: {
        option: multHorizBarOption() // echarts的option
      }
    }
  }
}
</script>
