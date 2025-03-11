<template>
  <div>
    <h3>hook</h3>
    <el-button @click="page.age++">增加</el-button>
    <div>{{ page.age }}</div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,// 在组件挂载之前执行的函数
  onMounted,
  onBeforeUpdate,// 在组件修改之前执行的函数
  onUpdated,
  onBeforeUnmount,// 在组件卸载之前执行的函数
  onUnmounted
} from "vue";

export default {
  setup () {
    console.log("1-开始创建组件-----setup()");
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      name: "金毛",
      age: 4
    })
    const flag = reactive({
      isShow: false,
      popupShow: false
    })

    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行-----onBeforeMount()");
    })
    onMounted(() => {
      console.log("3-组件挂载到页面之后执行-----onMounted()");
    })
    onBeforeUpdate(() => {
      // 值更新不算
      console.log("4-**视图**更新之前-----onBeforeUpdate()");
    })
    onUpdated(() => {
      console.log("5-**视图**更新之后-----onUpdated()");
    })
    onBeforeUnmount(() => {
      console.log("6-视图卸载之前-----onBeforeUnmount()");
    })
    onUnmounted(() => {
      console.log("7-视图卸载之后-----onUnmounted()")
    })

    return {
      ...page, // 这样写不好, 里面会失去响应式
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
    }
  }
}
</script>
