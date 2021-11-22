<template>
  <div class="page-container">
    <div class="page-content">
      <div>
        <menu-self :list="list"></menu-self>
      </div>
      <el-button @click="onPush('query')">router-query</el-button>
      <el-button @click="onPush('params')">router-params</el-button>
      <el-button @click="onPush('id')">动态参数</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from 'vue-router';

const list = [
  { label: '变量定义', path: '/vue3/variate' },
  { label: '全局变量', path: '/vue3/commonVariate' },
  { label: '依赖/注入', path: '/vue3/provide' },
  { label: 'vuex', path: '/vue3/vuex' },
  { label: 'ref', path: '/vue3/ref' },
  { label: 'router', path: '/vue3/router' },
  { label: '其他', path: '/others' }
]

export default {
  setup (props, context) {
    const router = useRouter();
    const page = reactive({
      name: "金毛",
      age: 4,
      list
    })
    const form = reactive({
      name: "金毛",
      age: 4
    })
    function onPush (type) {
      if (type === 'query') {
        router.push({
          path: '/vue3/router',
          query: {
            name: 'query'
          }
        })
        return
      }
      if (type === 'id') {
        router.push({
          path: '/vue3/router/7',
        })
        return
      }
      router.push({
        name: 'router',
        params: {
          name: 'params'
        }
      })
    }
    return {
      form, // 这样写那么外面就要都基于page来调取, 类型{{form.age}}
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      onPush
    }
  }
}
</script>