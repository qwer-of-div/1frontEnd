<template>
  <div>
    <h3 @dblclick="onPageCount">menu</h3>
    <my-nav-list :parentValue="init.navList" />
    <div class="router-wrap">
      <router-view />
    </div>
  </div>
</template>

<script>
const navList = [
  { label: '组件', name: 'components' },
  { label: '代码', name: 'code' },
  { label: '工具', name: 'utils' },
  { label: 'vue3', name: 'vue3' }
]

import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const route = useRouter()
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      count: 0
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
      navList
    })

    onMounted(() => {
      console.log('onMounted')
    })

    const onPageCount = () => {
      page.count++
      if (page.count === 5) {
        route.push({ name: 'example' })
      }
    }

    return {
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      form,
      formAccident,
      init,
      onPageCount
    }
  }
}
</script>
