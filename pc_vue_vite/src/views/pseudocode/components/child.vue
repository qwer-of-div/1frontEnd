<template>
  <div>props的属性不用setup去return --- {{ type }}</div>
</template>

<script>
import { inject, ref } from 'vue'
// 为了让 TypeScript 正确的推导类型，我们必须使用 createComponent 来定义组件:
export default {
  props: {
    type: String
  },
  // 1: props也是不可以解构的, 会失去响应式
  // 2: context是上下文 = this, 我们可以获取到slots emit 等方法
  // 3: props, context 分开也是为了ts更明确的类型推导
  // setup({type}){
  setup (props, context) {
    // 1: props
    console.log("props子组件", props.type);
    console.log("上下文子组件", context);
    context.emit('ok', '传递完成')

    // 2: 注入
    console.log('inject子组件', inject('name'));
    console.log('inject子组件', inject('xxxx', '我是默认值'))
    inject('name1', ref('默认值')) // 接收方也可以这样
  }
};
</script>
