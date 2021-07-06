<template>
  <div class="page-container">
    <div class="page-content example">
      <div>
        <div class="list-view"
             ref="container"
             @scroll="handleScroll">
          <div class="list-view-phantom"
               ref="clientHeight"
               :style="{ height: contentHeight + 'px' }"></div>
          <ul ref="content"
              class="list-view-content">
            <li class="list-view-item"
                :key="index"
                v-for="(val, index) in list">
              <!-- :style="{ height: itemHeight + 'px' }" -->
              <el-row>
                <el-col>
                  <el-input :value="val"
                            placeholder="请输入身份证"></el-input>
                  {{val}}
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-input :value="val"
                            placeholder="请输入身份证"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-input :value="val"
                            placeholder="请输入身份证"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-input :value="val"
                            placeholder="请输入身份证"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-input :value="val"
                            placeholder="请输入身份证"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-input :value="val"
                            placeholder="请输入身份证"></el-input>
                </el-col>
              </el-row>
              <div v-if="!(index % 2)">{{val}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  computed: {
    contentHeight () {
      // 计算滚动条高度
      return this.data.length * this.itemHeight
    }
  },

  mounted () {
    this.getData()
    this.update()
  },

  data () {
    return {
      data: [], // 总数据
      itemHeight: 280, // 单个高度
      list: [] // 渲染数据
    }
  },

  methods: {
    update (scrollTop = 0) {
      // 获取当前可展示数量 $el.clientHeight当前内容高度
      const count = Math.ceil(this.$el.clientHeight / this.itemHeight)
      // 取得可见区域的起始数据索引
      const start = Math.floor(scrollTop / this.itemHeight)
      // 取得可见区域的结束数据索引
      const end = start + count

      // 计算出可见区域对应的数据，让 Vue.js 更新
      this.list = this.data.slice(start, end)

      // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
      this.$refs.content.style.webkitTransform = `translate3d(0, ${start * this.itemHeight}px, 0)`
    },
    handleScroll (e) { // 获取当前滚动条滚动位置
      const scrollTop = this.$refs.container.scrollTop
      this.update(scrollTop)
    },
    getData () { // 创建模拟数据
      const data = []
      for (let i = 0; i < 50; i++) {
        data.push(`第 ${i} 个数据`)
      }
      this.data = [...data]
    }
  }
}
</script>

<style>
.list-view {
  margin: 100px auto;
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #c1c1c1;
  box-shadow: 3px 3px 5px #ccc;
}

.list-view-phantom {
  background-color: #ccc;
  /* position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1; */
}

.list-view-content {
  background-color: #ccc;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-view-item {
  padding: 6px;
  color: #999;
  line-height: 30px;
  width: 50%;
  margin: 20px 0;
}
</style>
