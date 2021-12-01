<template>
  <div class="page-container">
    <div class="page-content">
      <h3 ref="h3El">ref</h3>
      {{ n }}
      <ul>
        <li v-for="(item, index) in n"
            :key="item"
            :ref="
            (el) => {
              liEl[index] = el;
            }
          ">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";

const list = [
  { label: '变量定义', path: '/vue3/variate' },
]

export default {
  setup (props, context) {
    const n = ref(10)
    const h3El1 = ref(null)
    const liEl = ref([])
    function addN () {
      n.value++
    }
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
      console.log(h3El1.value, 'h3')
      console.log(liEl.value, 'el')
    })
    return {
      n,
      form, // 这样写那么外面就要都基于page来调取, 类型{{form.age}}
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      h3El: h3El1,
      liEl,
      addN
    }
  }
}
</script>