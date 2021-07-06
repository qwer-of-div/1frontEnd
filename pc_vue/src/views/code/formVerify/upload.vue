<template>
  <div class="page-container">
    <div class="page-content">
      <div class="form-wrap">
        <div class="toast-wrap">
          <el-button @click="onToast">自写$toast</el-button>
        </div>
        <hr>
        <el-upload :action="'none'"
                   :auto-upload="false"
                   drag
                   ref='upload'
                   :on-change="onChange"
                   :on-remove="onRemove"
                   multiple
                   show-file-list>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button icon="el-icon-upload"
                   type="primary"
                   style="margin-top: 20px;"
                   @click="submitUpload">上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 可通过action、data上传文件
import api from '@/api/files'

export default {
  data () {
    return {
      // 文件列表
      fileList: []
    }
  },
  created () {
    this.$api.localLogin({ from: 'common api' }).then((res) => {
      console.log(res, 'nodeJS api')
    })
  },
  methods: {
    // 自写js调用toast
    onToast () {
      // this.$toast1({
      //   content: '哈哈哈哈，消失的贼快',
      //   duration: 1000
      // })
      this.$myToast.error({ content: '竟然失败了' })
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange (file, filelist) {
      // file.raw 才是真实的 file 对象
      this.fileList.push(file.raw)
      console.log(file, filelist, this.fileList)
    },
    // 文件列表移除文件时的钩子
    onRemove (file, fileList) {
      // file.raw 才是真实的 file 对象
      this.fileList.splice(this.fileList.indexOf(file.raw), 1)
      console.log(this.fileList)
    },
    // 上传文件
    async submitUpload () {
      console.log('提交文件')
      const formData = new FormData()
      // 向 formData 对象中添加文件
      if (!this.fileList.length) {
        console.log('上传文件不能为空')
        return
      }
      this.fileList.forEach(file => {
        formData.append('file', file)
      })
      // 设置文件保存路径
      // formData.append('path', this.path)
      formData.append('desc', '额外参数')
      const res = await api.uploadElement(formData)
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  overflow: scroll;
  .form-wrap {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
