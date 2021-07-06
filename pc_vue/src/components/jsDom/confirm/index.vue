<template>
  <!-- 自定义确认弹窗样式 -->
  <el-dialog width="600px"
             :title="content.title"
             :visible.sync="content.show"
             v-if="isShow">
    <span>{{ content.message }}</span>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="close">
        取 消
      </el-button>
      <el-button type="primary"
                 @click="ok">
        确 定
      </el-button>
    </div>
  </el-dialog>

</template>

<script>
export default {
  data () {
    return {
      // 弹窗内容
      isShow: true,
      content: {
        title: '',
        message: '',
        data: '',
        show: false
      }
    }
  },
  methods: {
    // 要把方法定义出来
    close () {

    },
    ok () {

    }
  }
}
</script>

<style>
</style>
