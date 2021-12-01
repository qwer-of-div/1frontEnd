<template>
  <div>
    组件:
    <zj :type="type"
        @ok="wancheng"></zj>
  </div>
</template>

<script>
import zj from "./child.vue";
import { ref } from 'vue';
import { provide } from 'vue'

export default {
  components: {
    zj
  },
  setup () {
    provide('name', '向下传值'); // 基础值
    provide('name2', ref('向下传值')); // 监控值
    const type = ref('大多数');

    function wancheng (msg) {
      console.log('父组件-->', msg)
      setTimeout(() => {
        type.value = 'xxxxxxx'
      }, 2000)
    }
    return {
      type,
      wancheng
    }
  }
};
</script>