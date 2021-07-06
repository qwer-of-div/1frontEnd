<template>
  <div>
    <h3>ref</h3>
    <el-button @click="addN">增加</el-button>
    <div>n++{{n}}</div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  // 1: 这个版本基本逻辑都在setup里面完成了, 有人说把他当成2.x的data.
  setup () {
    // 2: 定义一个追踪的变量,也就是双向绑定.
    const n = ref(1); // 生成的n是一个对象, 这样方便vue去监控它

    const addN = () => {
      n.value++; // 注意这里要使用.value的形式, 因为n是对象↑, value才是他的值
    }
    return {
      n,   // 返回出去页面的template才可以使用它, {{n}} 不需要.value
      addN
    }
  }
}
</script>
