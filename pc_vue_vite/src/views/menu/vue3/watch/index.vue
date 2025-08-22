<template>
  <div>
    <h3>watch</h3>
    <el-button @click="addPrev">前增加</el-button>
    <el-button @click="addObj">增加</el-button>
    <el-button @click="addNormal">正常增加</el-button>
    <el-button @click="addList">数组增加</el-button>
    <div>计算属性:{{ newPage.age }}</div>
  </div>
</template>

<script>
import { watch, computed, reactive, toRefs, watchEffect } from "vue";

export default {
  setup () {
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    // 变量
    const page = reactive({
      name: "金毛",
      age: 4,
      list: [],
      a: new Date('2014-12-10')
    })
    const flag = reactive({
      isShow: false,
      popupShow: false
    })

    // 计算属性
    const newPage = computed(() => {
      const page1 = {}
      page1.age = page.age * 2
      return page1
    })

    // 监听
    watch(() => page, (newVal, oldVal) => {
      console.log(page, oldVal.age, newVal.age, '监听对象')
    },
      { deep: true }
      // watch 刚被创建的时候不执行
      // { lazy: true }
    )
    watch([() => page.name, () => page.age], ([name, age], [preName, prevAge]) => {
      console.log(preName, name, prevAge, age, "监听多属性name或age改变了");
    })

    const stop = watchEffect(() => {
      console.log(`watchEffect-age: ${page.age}`)
      console.log(`watchEffect-page: ${JSON.stringify(page) === JSON.stringify(page)}`, page)
    })

    // 方法
    const addObj = () => console.log(page.age++, 'page.age++')

    const addPrev = () => console.log(++page.age, '++page.age')

    const addNormal = () => {
      page.age++
      console.log(page.age, '正常++')
    }

    const addList = () => {
      page.list.push(1)
    }

    return {
      ...page, // 这样写不好, 里面会失去响应式
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      newPage,
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      addPrev,
      addObj,
      addNormal,
      addList
    }
  }
}
</script>
