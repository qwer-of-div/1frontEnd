<template>
  <div>
    <h3>reactive</h3>
  </div>
</template>

<script>
// reactive默认结构
import { reactive, onMounted } from 'vue'

export default {
  setup () {
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      test: ''
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
      popupShow: false
    })
    const init = reactive({
      minDate: new Date(),
      maxDate: new Date()
    })

    onMounted(() => {
      console.log('onMounted')
    })


    return {
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      form,
      formAccident,
      init
    }
  }
}
</script>
