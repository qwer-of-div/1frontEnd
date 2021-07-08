<template>
  <div class="page-container">
    <div class="page-content">
      <div>
        <div>第一层</div>
        <el-input v-model="page.name"></el-input>
      </div>
      <div>
        <div>第二层</div>
        <el-input v-model="page.info.age"></el-input>
      </div>
      <div>
        <div>未定义属性</div>
        <el-input v-model="page.new"></el-input>
      </div>
      <el-button type="primary"
                 @click="onChange">切换</el-button>
    </div>
  </div>
</template>

<script>
const page = {
  name: '李四',
  info: {
    age: '19',
    aiHao: ['跳远', '跳高', '田径']
  }
}

export default {
  data () {
    return {
      page: {
        name: '张三',
        info: {
          // age: '18',
          aiHao: ['足球', '篮球', '羽毛球']
        }
      },
      form: {
      },
      formParent: {
      },
      flag: {
      },
      init: {
      }
    }
  },
  computed: {
    pageNew () {
      const page = {
        idTypeName: 'code转name'
      }
      return page
    },
    formNew () {
      const form = {}
      return form
    },
    flagNew () {
      const flag = {}
      return flag
    }
  },
  watch: {
    page: {
      handler (newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      deep: true
    }
  },
  created () {
    console.log(this.page, page, '对象复制')
    this.handleInit()
  },
  methods: {
    handleInit () {
      // this.page = JSON.parse(JSON.stringify(page))
    },
    onChange () {
      this.page.info.age++
      this.page.new = '未定义属性'
    }
  }
}
</script>
