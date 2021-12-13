<template>
  <div class="page-container">
    <div class="page-content">
      <h3>vuex</h3>
      <el-button @click="
          $router.push({
            path: '/vue3/mapState',
          })
        ">mapState</el-button>
      <p>流水号:{{ store.state.transNo }}</p>
      <p>证件类型:{{ g.idType }}</p>
      <p>模块state:{{ store.state.dic.deep.type }}</p>
      <el-button @click="nameChange">commit姓名切换</el-button>
      <el-button @click="setType">modules改变</el-button>
      <el-button @click="resetState('modules')">modules重置</el-button>
      <el-button @click="resetState('root')">root重置</el-button>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  setup (props, context) {
    const store = useStore()
    const page = reactive({
      name: "金毛",
      age: 4,
    })
    const form = reactive({
      name: "金毛",
      age: 4
    })
    const g = computed(() => store.state.g)
    const nameChange = () => {
      store.commit('userInfoSet', {
        name: store.state.userInfo.name === '李四' ? '王五' : '李四'
      })
    }
    const setType = () => {
      store.commit('dic/setType', store.state.dic.deep.type === 'new模块' ? 'old模块' : 'new模块')
    }
    const resetState = (type) => {
      if (type === 'modules') {
        store.commit(`dic/resetState`)
        return
      }
      store.dispatch(`resetState`)
    }
    return {
      g,
      store,
      form, // 这样写那么外面就要都基于page来调取, 类型{{form.age}}
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      nameChange,
      setType,
      resetState
    }
  }
}
</script>