<template>
  <div class="page-container">
    <div class="page-content"
         style="padding-top:100px;">
      <el-button @click="onScreenFull">全屏</el-button>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  setup () {
    const onScreenFull = function () {
      if (!screenfull.isEnabled) {
        return false;
      }
      screenfull.toggle();
    }
    return {
      onScreenFull
    }
  },
}
</script>

