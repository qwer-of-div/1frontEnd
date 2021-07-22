<!--
 * @Description:
 * @Author: xihong
 * @Date: 2019-09-17 09:55:12
 * @LastEditors: xihong
 * @LastEditTime: 2019-10-28 15:05:54
 -->
<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column v-if="isShowCheckbox"
                       type="selection"
                       width="50"
                       align="center">
      </el-table-column>
      <el-table-column type="index"
                       label="序号"
                       width="50"
                       align="center"
                       v-if="isShowOrder">
      </el-table-column>
      <el-table-column v-for="(type,index) in tableType"
                       :key="index"
                       :prop="type.prop"
                       :label="type.label"
                       :min-width="type.width"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       width="150"
                       fixed="right"
                       align="center"
                       v-if="btnType">
        <template slot-scope="scope">
          <el-button type="success"
                     plain
                     size="small"
                     @click="editTable(scope.row)">编辑</el-button>
          <el-button type="danger"
                     plain
                     size="small"
                     @click="deleteTable(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'szr-table',
  props: ['btnType', 'tableType', 'isShowCheckbox', 'tableData', 'isShowOrder'],
  methods: {
    handleSelectionChange (val) {
      this.$emit('handle-selection-change', val)
    },
    editTable (val) {
      this.$emit('edit-table', val)
    },
    deleteTable (val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('delete-table', val)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style scoped lang="stylus">
.pageContainer {
  margin: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
