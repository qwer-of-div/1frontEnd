<template>
  <div class="page-container">
    <div class="page-content">
      <div>
        <div ref="contentEl">第一步, 在dom上面定义, 他会有一个回调</div>
      </div>
      <ul>
        <li>v-for 出来的ref</li>
        <li>可以写为表达式的形式, 可以推导出vue是如何实现的</li>
        <li>vue2.x的时候v-for不用这么麻烦, 直接写上去会被组装成数组</li>
        <li :ref="el => { itemsEl[index] = el }"
            v-for="(item,index) in 6"
            :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUpdate } from "vue";

export default {
  setup () {
    // 2: 定义一个变量接收dom, 名字无所谓, 但是与dom统一的话会有很好的语义化
    const contentEl = ref(null)
    const itemsEl = ref([])

    // 4: 在生命周期下, 这个值已经完成了变化, 所以当然第一时间就拿到
    onMounted(() => {
      console.log(contentEl.value);
      console.log(itemsEl.value, "li标签组")
    })

    // 5: 确保在每次变更之前重置引用
    onBeforeUpdate(() => {
      itemsEl.value = [];
    })

    // 3: 返出去的名称要与dom的ref相同, 这样就可以接收到dom的回调
    return {
      contentEl,
      itemsEl
    }
  }
}
</script>