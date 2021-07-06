<template>
  <div class="page-container">
    <div class="page-content flex-col">
      <h3>表格</h3>
      <div>
        <el-button type="primary"
                   @click="$router.go(-1)">返回</el-button>
      </div>
      <div class="table-wrap flex1">
        <my-table></my-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  }
}
</script>
