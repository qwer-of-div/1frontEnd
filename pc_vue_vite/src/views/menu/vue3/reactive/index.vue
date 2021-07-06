<template>
  <div>
    <h3>reactive</h3>
    <el-button @click="addPrev">前增加</el-button>
    <el-button @click="addObj">增加</el-button>
  </div>
</template>

<script>
// 全局方法
// 全局mixin
import { reactive, toRefs, getCurrentInstance, onMounted } from "vue";

const fromInit = {
  name: "金毛Init",
  age: 14,
  high: 175,
  sex: '2'
}

export default {
  setup () {
    const { proxy, ctx } = getCurrentInstance()
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      name: "金毛",
      age: 4
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
      console.log(proxy.$g, "proxy全局方法", ctx.$g, 'ctx无法获取');
      proxy.$g.objAssign(form, fromInit)
      console.log(form, "form", fromInit, 'fromInit');
      proxy.$g.objAssign(formAccident, fromInit)
      console.log(formAccident, "formAccident", fromInit, 'fromInit');
    })

    const addObj = () => {
      proxy.onMixShow()
      console.log(page.age++, 'page.age++')
    }


    const addPrev = () => console.log(++page.age, '++page.age')

    return {
      ...page, // 这样写不好, 里面会失去响应式
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      form,
      formAccident,
      init,
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      addObj,
      addPrev
    }
  }
}
</script>
