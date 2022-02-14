<template>
  <div class="page-container">
    <div class="page-content">
      <iframe class="iframe-wrap"
              ref="iframe"
              :src="page.src"
              frameborder="0"
              scrolling="yes"
              @load="onLoad"></iframe>
    </div>
  </div>
</template>

<script>

// window.addEventListener('message', (event) => {
//             this.a = event.data.src
//             console.log(event,'message')
//         }, false)

import { reactive, ref, onMounted } from "vue";

const list = [
  { label: '变量定义', path: '/vue3/variate' },
]

export default {
  setup (props, context) {
    const iframe = ref(null)
    const page = reactive({
      src: 'http://127.0.0.1:5502/pages/keyPointProjectKunpeng/kppMain1.html'
    })

    // onMounted与onLoad先后问题
    onMounted(() => {
    })

    const onLoad = () => {
      const cookie = document.cookie
      // iframe.value.contentWindow.postMessage({src:page.src},page.src)
      iframe.value.contentWindow.postMessage({ src: page.src }, '*')
      // iframe.value.contentWindow.postMessage({src:page.src},'http://127.0.0.1:5502')
    }
    return {
      iframe,
      page,
      onLoad
    }
  }
}
</script>

<style lang="less" scoped>
.page-content {
  .iframe-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>