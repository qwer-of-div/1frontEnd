<template>
  <div class="page-container">
    <div class="page-content">
      <el-button v-debounce="directive">自定义指令</el-button>
      <el-button v-longPress="directive">多自定义指令</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

const list = [
  { label: '变量定义', path: '/vue3/variate' },
]

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