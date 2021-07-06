<template>
  <div>
    <h3>reactive</h3>
    <el-button @click="addObj">增加</el-button>
    <el-button @click="addPrev">前增加</el-button>
    <div>{{newPage.age}}</div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";

export default {
  setup () {
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      name: "金毛",
      age: 4
    })
    const flag = reactive({
      isShow: false,
      popupShow: false
    })

    const newPage = computed(() => {
      const page1 = {}
      page1.age = page.age * 2
      return page1
    })

    const addObj = () => console.log(page.age++, 'page.age++')

    const addPrev = () => console.log(++page.age, '++page.age')

    return {
      ...page, // 这样写不好, 里面会失去响应式
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      newPage,
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      addObj,
      addPrev
    }
  }
}
</script>
