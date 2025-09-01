<template>
  <div class="page-container">
    <div class="page-content">
      <el-button v-debounce="directive">防抖</el-button>
      <p v-tooltip="3" style="width:100px;">vue 自定义指令实现指定文本行数溢出自动 Tooltip | vue 自定义指令实现指定文本行数溢出自动 Tooltip</p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup (props, context) {
    const page = reactive({
      desc: '防抖自定义指令',
      directive: {
        delay: 500,
        fn: null
      }
    })

    page.directive.fn = () => {
      console.log(page.desc)
    }

    return {
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
    }
  }
}
</script>