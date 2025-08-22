<template>
    <div class="main" v-if="getData" v-html="getData">

    </div>
</template>

<script>

import { getNews } from '@/api/news'

export default {
  data () {
    return {
      getData: null
    }
  },
  created () {

  },
  mounted () {
    getNews().then((res) => {
      if (res.status == 0) {
        this.getData = res.data.data.content
        //   console.log(res.data.data.content)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
    .main {
        // margin-top: -0.7rem;
        background-color: #fff;

    }
</style>
