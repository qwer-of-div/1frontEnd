<template>
  <div class="swiper-container banner-wrap">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in data" :key="item.bannerId">
        <router-link :to="'/film/'+item.bannerId"><img :src="item.imgUrl" /></router-link>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  props: ['data'],
  mounted () {
    // 在实例化时最好不要用.swiper-container选择器，当项目中出现多个banner时就会互相影响
    var swiper = new Swiper('.banner-wrap', {
      autoplay: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style scoped>
/* 在css中要用@符号需要~转义 */
@import url("~@/assets/css/swiper.min.css");
.banner-wrap {
  height: 4.2rem;
  background-color: #ccc;
}
.banner-wrap img {
  width: 100%;
}
</style>
