<template>
  <div class="film" v-if="filmInfo">
    <!-- <div class="fixed">中国机长</div> -->
    <div class="film-header">
      <div class="goBack" @click="goBack()">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
          alt
        />
      </div>

      <div class="title" isShow="false">中国机长</div>
    </div>

    <!-- 图片 -->
    <div class="lazy-img-wrap">
      <img class="target-img" :src="filmInfo.poster" alt />
    </div>

    <!-- 详细信息 -->
    <!-- <van-sticky @scroll="initScroll"> -->
    <div>
      <div class="headerBottem">
        <van-nav-bar v-show="isShow" title="标题" left-arrow @click-left="$router.go(-1)" />
      </div>
    </div>
    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{filmInfo.name}}</span>
          <span class="item">{{filmInfo.filmType.name}}</span>
        </div>
        <div class="film-grade" v-if="filmInfo.grade">
          <span class="grade">{{filmInfo.grade}}</span>
          <span class="grade-text">分</span>
        </div>
      </div>
      <div class="film-category grey-text">{{filmInfo.category}}</div>
      <div class="film-premiere-time grey-text">{{filmInfo.premiereAt | dateFormat}}</div>
      <div class="film-nation-runtime grey-text">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
      <div
        class="film-synopsis grey-text hidde"
        style="transition:.5s"
        ref="hide"
      >{{filmInfo.synopsis}}</div>

      <div class="toggle" @click="toggle()">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg=="
          alt
          class
        />
      </div>
    </div>
    <!-- </van-sticky> -->
    <!-- 演职人员 -->
    <div class="actors">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>
      <div class="swiper-container actors-list">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-slide1" v-for="item in filmInfo.actors" :key="item.name">
            <div class="lazy-img-wrap1">
              <img :src="item.avatarAddress" alt />
            </div>
            <span class="actors-name">{{item.name}}</span>
            <span class="actors-role">{{item.role}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 剧照 -->
    <div class="photos">
      <div class="photos-title-bar">
        <span class="photos-title-text">剧照</span>
        <span class="photos-to-all">
          全部({{filmInfo.photos.length}})
          <i
            class="iconfont icon-quanju_liebiaojiantou"
            style="font-size: 13px;"
          ></i>
        </span>
      </div>
      <div class="swiper-container photos-list">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide lazy-img-wrap2"
            v-for="(item,index) in filmInfo.photos"
            :key="item"
            @click="imgPre(index)"
          >
            <img class="target-img" :src="item" alt />
          </div>
        </div>
      </div>
    </div>

    <!-- 购票 -->
    <router-link class="goSchedule1" to>
      <div class="goSchedule">选座购票</div>
    </router-link>

    <!-- ImagePreview图片预览 -->
  </div>
</template>

<script>
import Swiper from "swiper";
import { getFilmDetail } from "@/api/film";
import { ImagePreview, Sticky, Icon } from "vant";

export default {
  data() {
    return {
      isShow: false,
      filmInfo: null,
      flag: "down"
    };
  },
  created() {
    this.getData();
  },
  watch: {},
  updated() {
    this.initSwiper();
    this.initSwiper1();
    // console.log(this.filmInfo)
  },
  methods: {
    getData() {
      getFilmDetail(this.$route.params.id).then(res => {
        if (res.status == 0) {
          this.filmInfo = res.data.film;
          console.log(res);
        }
      });
    },
    initSwiper() {
      var swiper = new Swiper(".actors-list", {
        slidesPerView: 4,
        spaceBetween: 10
      });
    },
    initSwiper1() {
      var swiper = new Swiper(".photos-list", {
        slidesPerView: 2.3,
        spaceBetween: 20
      });
    },
    toggle() {
      // this.$refs.hide.style.transition = '1.3s'
      if (this.flag === "down") {
        this.$refs.hide.style.height = "auto";
        this.flag = "up";
        return;
      }
      this.$refs.hide.style.height = "0.76rem";
      this.flag = "down";
      // console.log(this.$refs.hide)
    },
    goBack() {
      this.$router.go(-1);
    },
    imgPre(val) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: val,
        showIndex: true,
        onClose() {
          // do something
        }
      });
    },
    initScroll(val) {
      console.log(val);
      this.isShow = val.isFixed;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("~@/assets/css/swiper.min.css");
.film {
  width: 7.5rem;
  line-height: 1.5;
  overflow-x: hidden;
  background-color: #f4f4f4;
}

//顶部
.film .film-header .goBack {
  height: 0.6rem;
  position: absolute;

  top: 0.1rem;
  left: 0.1rem;
  img {
    position: absolute;
    z-index: 1;
  }
}
.film .film-header .goBack img {
  width: 30px;
}
.film .film-header .title {
  display: none;
  font-size: 0.34rem;
  line-height: 0.88rem;
  width: 100vw;
  text-align: center;
}


//图片
.lazy-img-wrap {
  position: relative;
  width: 7.5rem;
  height: 4.2rem;
  overflow: hidden;
  .target-img {
    position: absolute;
    top: -0.4rem;
    width: 7.5rem;
    height: 5rem;
  }
}

//电影详细信息
.film .film-detail {
  font-size: 0.26rem;
  padding: 0.3rem;
  padding-top: 0.24rem;
  background-color: #fff;
}
.film .film-detail .col {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 0.54rem;
}
.film .film-detail .film-name {
  width: 256px;
}
.film .film-detail .film-name .name {
  color: #191a1b;
  font-size: 0.36rem;
  height: 0.48rem;
  line-height: 0.48rem;
  margin-right: 0.14rem;
}
.film .film-detail .film-name span {
  vertical-align: middle;
}
.film .film-detail .film-grade span {
  vertical-align: middle;
}
.film .film-detail .film-name .item {
  font-size: 0.18rem;
  color: #fff;
  background-color: #d2d6dc;
  height: 0.28rem;
  line-height: 0.28rem;
  padding: 0 0.04rem;
  border-radius: 0.04rem;
  display: inline-block;
}
.film .film-detail .film-grade {
  width: calc(100% - 5rem);
  text-align: right;
  color: #ffb232;
}
.film .film-detail .film-grade .grade {
  font-size: 0.36rem;
  font-style: italic;
}
.film .film-detail .film-grade .grade-text {
  font-size: 0.2rem;
}
.film .film-detail .grey-text {
  font-size: 0.26rem;
  color: #797d82;
  margin-top: 0.08rem;
}
.film .film-detail .film-synopsis {
  margin-top: 0.24rem;
}
.film .film-detail .hidde {
  height: 0.76rem;
  overflow: hidden;
  // transition:  1.3s;
}
.film .film-detail .toggle {
  position: relative;
  text-align: center;
  display: block;
  height: 0.32rem;
  width: 0.4rem;
  margin: auto;
  line-height: normal;
}
.film .film-detail .toggle img {
  position: absolute;
  top: 50%;
  width: 0.16rem;
  height: 0.08rem;
  margin: auto;
}

// 演职人员
.film .actors {
  margin-top: 0.2rem;
  background-color: #fff;
}
.film .actors .actors-title-bar {
  position: relative;
  width: 100%;
  height: 1.05rem;
  padding: 0.3rem;
  box-sizing: border-box;
}
.film .actors .actors-title-bar .actors-title-text {
  position: absolute;
  font-size: 0.32rem;
  text-align: left;
  color: #191a1b;
}
.film .actors .actors-title-bar span {
  display: inline-block;
  height: 0.45rem;
  line-height: 0.44rem;
}
.actors-list {
  height: 3rem;
  margin-left: 0.3rem;
  background: rgb(255, 255, 255);
}
.lazy-img-wrap1 {
  width: 1.7rem;
  height: 1.7rem;
  background: rgb(249, 249, 249);
  opacity: 1;
  display: block;
  img {
    height: 100%;
    width: 100%;
  }
}
.film .actors span {
  display: block;
  text-align: center;
}
.film .actors .actors-name {
  padding-top: 0.2rem;
  font-size: 0.24rem;
  color: #191a1b;
  width: 1.9rem;
  height: 0.36rem;
  display: block;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.film .actors .actors-item span {
  display: block;
  text-align: center;
}
.film .actors .actors-role {
  width: 1.9rem;
  font-size: 0.2rem;
  color: #797d82;
}
.swiper-slide1 {
  width: 1.7rem;
  // padding-left: 0.3rem;
}

//剧照
.film .photos {
  margin-top: 0.2rem;
  margin-bottom: 1.2rem;
  background-color: #fff;
}
.film .photos .photos-title-bar {
  height: 1.24rem;
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
}
.film .photos .photos-title-bar .photos-title-text {
  font-size: 0.32rem;
  text-align: left;
  color: #191a1b;
}
.film .photos .photos-title-bar span {
  display: inline-block;
  height: 0.45rem;
  line-height: 0.44rem;
}
.film .photos .photos-title-bar .photos-title-text {
  float: left;
  font-size: 0.32rem;
  text-align: left;
  color: #191a1b;
}
.film .photos .photos-title-bar .photos-to-all {
  font-size: 0.26rem;
  color: #797d82;
  float: right;
}
.photos-list {
  height: 2.3rem;
  padding-left: 0.3rem;
  background: rgb(255, 255, 255);
}
.lazy-img-wrap2 {
  background: rgb(249, 249, 249);

  .target-img {
    opacity: 1;
    display: block;
    width: 3rem;
    height: 2rem;
  }
}

//购票
.goSchedule1 {
  height: 0.98rem;
  position: fixed;
  bottom: 0px;
  z-index: 500;
  width: 100%;
}
.film .goSchedule {
  position: fixed;
  bottom: 0;
  left: 0;

  height: 0.98rem;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 0.32rem;
  line-height: 0.98rem;
}
</style>
