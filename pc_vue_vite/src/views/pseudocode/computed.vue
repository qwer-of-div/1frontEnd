<template>
  <div>
    <h3>computed</h3>
    <el-button @click="addPrev">前增加</el-button>
    <el-button @click="addObj">增加</el-button>
    <el-button @click="addNormal">正常增加</el-button>
    <el-button @click="addList">数组增加</el-button>
    <el-button @click="onSet">computed-set</el-button>
    <div>{{ page.name }}</div>
    <div>{{ newPage.age }}</div>
    <div>{{ newPage1.list }}</div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watchEffect } from "vue";

export default {
  setup () {
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    // 变量
    const page = reactive({
      name: "金毛",
      age: 4,
      list: []
    })
    const flag = reactive({
      isShow: false,
      popupShow: false
    })

    // 计算属性 set的值不会再次进入computed
    // newPage.value
    const newPage = computed(() => {
      const page1 = {}
      page1.age = page.age * 2
      return page1
    })

    let newPage1 = computed({
      get: () => {
        return { list: page.list }
      },
      set: val => { // set不能作用于引用类型
        // page.name = val === '金毛' ? '哈士奇' : '金毛'
        page.name = '哈士奇'
        // page.list = val.list
      }
    })

    const stop = watchEffect(() => {
      if (page.age) {
        console.log('watchEffect立即监听,无旧值')
      }
      console.log('watchEffect立即监听1111')
    })

    setTimeout(() => {
      stop()
    }, 1000)

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

    const onSet = () => {
      // newPage1.value = '李白'
      // newPage1.value.list = [] 无效
      newPage1.value = {
        list: []
      }
      console.log(newPage1)
    }

    return {
      ...page, // 这样写不好, 里面会失去响应式
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      newPage,
      newPage1,
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      addPrev,
      addObj,
      addNormal,
      addList,
      onSet
    }
  }
}
</script>