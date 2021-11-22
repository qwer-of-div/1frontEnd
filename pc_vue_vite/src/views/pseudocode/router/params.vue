<template>
  <div class="page-container">
    <div class="page-content">
      <h3>router</h3>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';

const list = [
  { label: '变量定义', path: '/vue3/variate' },
]

export default {
  setup (props, context) {
    const router = useRouter();
    //router是全局路由对象，route= userRoute()是当前路由对象
    let route = useRoute();
    let query = route.query
    let params = route.params
    const page = reactive({
      name: "金毛111",
      age: 4,
      list
    })
    const form = reactive({
      name: "金毛",
      age: 4
    })
    onMounted(() => {
      console.log(router, route.query, route.params)
    })
    return {
      form, // 这样写那么外面就要都基于page来调取, 类型{{form.age}}
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      query,
      params
    }
  }
}
</script>