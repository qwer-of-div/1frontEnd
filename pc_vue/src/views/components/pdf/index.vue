<template>
  <div class="page-container">
    <div class="page-content">
      <el-button-group>
        <el-button type="primary"
                   icon="el-icon-arrow-left"
                   size="mini"
                   @click="prePage">上一页</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
      <div style="marginTop: 10px; color: #409EFF">{{ pageNum }} / {{ pageTotalNum }}</div>
      <pdf class="pdf-wrap"
           :page="pageNum"
           :src="url"
           @progress="loadedRatio = $event"
           @num-pages="pageTotalNum=$event"></pdf>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  name: 'Pdf',
  components: {
    pdf
  },
  data () {
    return {
      url: 'http://image.cache.timepack.cn/nodejs.pdf',
      pageNum: 1,
      pageTotalNum: 1, // 总页数
      loadedRatio: 0 // 当前页面的加载进度，范围是0- 1 ，等于1的时候代表当前页已经完全加载完成了
    }
  },
  methods: {
    // 上一页
    prePage () {
      let page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },

    // 下一页
    nextPage () {
      let page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    }
  }
}
</script>

<style lang="scss" scoped>
.pdf-wrap {
  width: 80%;
  margin: 0 auto;
}
</style>
