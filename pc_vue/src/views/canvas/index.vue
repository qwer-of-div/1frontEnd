<template>
  <div class="page-container">
    <div class="page-content">
      <h2>canvas</h2>
      <hr />
      <canvas id="mycanvas"
              ref="mycanvas"
              width="500"
              height="500"></canvas>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  mounted () {
    this.drawCanvas()
  },
  methods: {
    drawCanvas () {
      const elMycanvas = this.$refs.mycanvas
      const ctx = elMycanvas.getContext('2d') // 可选2d和3d
      ctx.fillStyle = 'rgba(200, 0, 0, 1)' // 填充色
      ctx.fillRect(10, 10, 55, 50) // 画矩形的方法，四个参数含义，前两个表示x,y坐标（相对于canvas的位置，并不是相对于窗口），从哪里开始画，后面表示长宽。
      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
      ctx.fillRect(30, 30, 55, 50)

      // 绘制一个矩形,清除特定矩形，绘制边框
      ctx.fillRect(100, 100, 100, 100)
      ctx.clearRect(112.5, 112.5, 75, 75) // 清除矩形
      ctx.strokeRect(125, 125, 50, 50) // 矩形边框
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  //为了突出画布效果可以在css中设置一个边框。
  #mycanvas {
    border: 1px solid rgb(199, 198, 198);
  }
}
</style>
