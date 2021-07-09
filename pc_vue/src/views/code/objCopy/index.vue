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
  name: '李四'
  // info: {
  //   age: '19',
  //   aiHao: ['跳远', '跳高', '田径']
  // }
}

export default {
  data () {
    return {
      page: {
        name: '张三',
        info: {
          age: '18',
          aiHao: ['足球', '篮球', '羽毛球']
        }
      },
      form: {
      },
      formParent: {
      },
      copy: {
        page: null,
        form: null,
        formParent: null
      },
      flag: {
      },
      init: {
      }
    }
  },
  computed: {
    pageWatch () {
      return JSON.parse(JSON.stringify(this.page))
    },
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
    pageWatch: {
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
      // 重置数据
      for (const key in this.copy) {
        this.copy[key] = JSON.parse(JSON.stringify(this[key]))
      }
      console.log(this.copy, '重置数据')
      // 先设置成正确的数据结构
      // const pageTemp = JSON.parse(JSON.stringify(page))
      const pageTemp = page
      pageTemp.info = pageTemp.info || {}
      pageTemp.info.age = pageTemp.info.age || ''
      this.page = pageTemp
    },
    onChange () {
      this.page.info.age = 20
      this.page.new = '未定义属性'
    }
  }
}
</script>
