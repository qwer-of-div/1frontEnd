<template>
  <el-scrollbar class="virtualList z-h-100"
                ref="scrollbar">
    <div ref="list"
         :style="{height:contentHieghtS+'px'}"
         class="infinite-list-container">
      <div ref="content"
           class="infinite-list">
        <div class="infinite-list-item"
             ref="items"
             :id="item._index"
             :key="item._index"
             v-for="item in visibleData">
          <slot ref="slot"
                :item="item.item"></slot>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'VirtualList',
  props: {
    // 所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    // 预估高度
    estimatedItemSize: {
      type: Number,
      required: true
    },
    // 缓冲区比例
    bufferScale: {
      type: Number,
      default: 1
    },
    // 容器高度 100px or 50vh
    height: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    _listData () {
      return this.listData.map((item, index) => ({
        _index: `_${index}`,
        item
      }))
    },
    visibleCount () {
      console.log(Math.ceil(this.screenHeight / this.estimatedItemSize))
      return Math.ceil(this.screenHeight / this.estimatedItemSize)
    },
    aboveCount () {
      return Math.min(this.start, this.bufferScale * this.visibleCount)
    },
    belowCount () {
      return Math.min(this.listData.length - this.end, this.bufferScale * this.visibleCount)
    },
    visibleData () {
      const start = this.start - this.aboveCount
      const end = this.end + this.belowCount
      console.log(this.belowCount)
      console.log(start)
      console.log(end)
      return this._listData.slice(start, end)
    }
  },
  created () {
    console.log('created')
    this.initPositions()
  },
  mounted () {
    this.screenHeight = this.$el.clientHeight
    this.start = 0
    this.end = this.start + this.visibleCount
    this.handleScroll()
  },
  updated () {
    console.log('updated')
    this.$nextTick(() => {
      if (!this.$refs.items || !this.$refs.items.length) {
        return
      }
      // 获取真实元素大小，修改对应的尺寸缓存
      this.updateItemsSize()
      // 更新列表总高度
      const height = this.positions[this.positions.length - 1].bottom
      // this.$refs.phantom.style.height = height + 'px'
      this.contentHieghtS = height
      // 更新真实偏移量
      this.setStartOffset()
    })
  },
  data () {
    return {
      // 可视区域高度
      screenHeight: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: 0,
      contentHieghtS: 0
    }
  },
  methods: {
    handleScroll () {
      this.$nextTick(() => {
        const scrollbarEl = this.$refs.scrollbar.wrap
        scrollbarEl.onscroll = () => {
          var st = this.$refs.scrollbar.$refs.wrap.scrollTop
          this.scrollEvent(st)
        }
      })
    },
    initPositions () {
      console.log(this.estimatedItemSize)
      this.positions = this.listData.map((d, index) => ({
        index,
        height: this.estimatedItemSize,
        top: index * this.estimatedItemSize,
        bottom: (index + 1) * this.estimatedItemSize
      })
      )
    },
    // 获取列表起始索引
    getStartIndex (scrollTop = 0) {
      // 二分法查找
      return this.binarySearch(this.positions, scrollTop)
    },
    binarySearch (list, value) {
      let start = 0
      let end = list.length - 1
      let tempIndex = null
      while (start <= end) {
        const midIndex = parseInt((start + end) / 2, 10)
        const midValue = list[midIndex].bottom
        if (midValue === value) {
          return midIndex + 1
        } else if (midValue < value) {
          start = midIndex + 1
        } else if (midValue > value) {
          if (tempIndex === null || tempIndex > midIndex) {
            tempIndex = midIndex
          }
          end = end - 1
        }
      }
      return tempIndex
    },
    // 获取列表项的当前尺寸
    updateItemsSize () {
      const nodes = this.$refs.items
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect()
        const height = rect.height
        const index = +node.id.slice(1)
        const oldHeight = this.positions[index].height
        const dValue = oldHeight - height
        // 存在差值
        if (dValue) {
          this.positions[index].bottom = this.positions[index].bottom - dValue
          this.positions[index].height = height
          for (let k = index + 1; k < this.positions.length; k++) {
            this.positions[k].top = this.positions[k - 1].bottom
            this.positions[k].bottom = this.positions[k].bottom - dValue
          }
        }
      })
    },
    // 获取当前的偏移量
    setStartOffset () {
      let startOffset
      if (this.start >= 1) {
        const size = this.positions[this.start].top - (this.positions[this.start - this.aboveCount] ? this.positions[this.start - this.aboveCount].top : 0)
        startOffset = this.positions[this.start - 1].bottom - size
      } else {
        startOffset = 0
      }
      this.$refs.content.style.transform = `translate3d(0,${startOffset}px,0)`
    },
    // 滚动事件
    scrollEvent (scrollTop) {
      // 当前滚动位置
      // const scrollTop = this.$refs.list.scrollTop
      // const startBottom = this.positions[this.start - ]
      // 此时的开始索引
      this.start = this.getStartIndex(scrollTop)
      // 此时的结束索引
      this.end = this.start + this.visibleCount
      // 此时的偏移量
      this.setStartOffset()
    }
  }
}
</script>

<style  lang='scss'>
.z-h-100 {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
// .virtualList{
//   .el-scrollbar__wrap{
//     overflow-x: hidden
//   }
// }
.infinite-list-container {
  overflow: hidden;
  position: relative;
  height: 900px;
  // -webkit-overflow-scrolling: touch
}
.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
.infinite-list-item {
  padding: 5px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
/* .infinite-list-scrollItem{
  padding: 5px
  color: #555
  box-sizing: border-box
  border-bottom: 1px solid #999
} */
</style>
