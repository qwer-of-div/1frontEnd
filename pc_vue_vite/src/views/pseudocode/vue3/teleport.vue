<template>
  <div>
    <el-button type="primary"
               @click="page.show=!page.show">展示teleport</el-button>
    <teleport to="#modal-wrapper">
      <h3 v-if="page.show">你好 teleport</h3>
    </teleport>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup () {
    const page = reactive({
      show: false
    })

    return {
      page
    }
  }
}
</script>