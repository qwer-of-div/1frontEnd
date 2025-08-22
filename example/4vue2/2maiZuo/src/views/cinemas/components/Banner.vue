<template>
  <div class="swiper-container cinema-detail-banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in data" :key="item.filmId">
        <img :src="item.poster" />
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  props: ["data"],
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      let _this = this;
      var swiper = new Swiper(".cinema-detail-banner", {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: true,
        on: {
          transitionEnd: function() {
            // activeIndex获取到当前播放的swiper-slide在列表中的下标
            console.log(this.activeIndex);
            _this.$emit("selectEvt", this.activeIndex);
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import url("~@/assets/css/swiper.min.css");
.cinema-detail-banner {
  height: 3.2rem;
  background-color: #ccc;
  .swiper-wrapper {
    align-items: center;
  }
  .swiper-slide {
    height: 2.6rem;
    width: 1.8rem;
    transition: 300ms;
    transform: scale(0.8);

    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-slide-active,
  .swiper-slide-duplicate-active {
    transform: scale(1);
  }
}
</style>
