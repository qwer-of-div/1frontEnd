<template>
  <div>
    <h3>asyncAwait</h3>
    <div class="input-wrap">
      <el-input v-model="form.test"></el-input>
      <el-button type="primary"
                 @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
// asyncAwait if判断等待
// mixin
import { reactive, onMounted } from 'vue'

export default {
  setup (props, context) {
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      name: "金毛1",
      age: 41
    })
    const form = reactive({
      test: ''
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

    // 方便打断点
    onMounted(() => {
      console.log('onMounted')
    })

    const onSubmit = () => {
      console.log(props, context)
      list()
    }

    // asyncAwait if有效
    const list = async () => {
      if (form.test === '1') {
        const res = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([1, 2, 3])
          }, 1000)
        })
        console.log(res, 'if asyncAwait内')
      }
      console.log('if asyncAwait后')
    }

    return {
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      form,
      formAccident,
      init,
      onSubmit,
      list
    }
  }
}
</script>
