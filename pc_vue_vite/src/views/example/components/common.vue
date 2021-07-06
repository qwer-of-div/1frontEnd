<template>
  <div class="page-container">
    <div class="page-content">
      <el-button @click="onBack"
                 type="primary">common</el-button>
      <div class="header">header</div>
      <div class="main">
        main
        <div class="search"></div>
        <div class="form"></div>
        <div class="list"></div>
      </div>
      <div class="footer">footer</div>
    </div>
  </div>
</template>

<script>
// reactive默认结构
import { reactive, onMounted } from 'vue'

export default {
  setup (props, { emit }) {
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      test: ''
    })
    const copy = reactive({
      page: null
    })
    const form = reactive({
      name: "金毛",
      age: 4
    })
    // 隐藏或被被改变form
    const formAccident = reactive({
      name: "金毛1",
      age: 41,
      high: 170,
      sex: '1'
    })
    const flag = reactive({
      isShow: false,
      popupShow: false,
      isNumber: '1' // 非隐藏显示标识
    })
    const init = reactive({
      minDate: new Date(),
      maxDate: new Date()
    })

    onMounted(() => {
      copy.page = JSON.parse(JSON.stringify(page))
      console.log(copy.page, 'onMounted')
    })

    const onBack = () => {
      emit('fromChild')
    }

    return {
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      copy,
      flag,
      form,
      formAccident,
      init,
      onBack
    }
  }
}
</script>
