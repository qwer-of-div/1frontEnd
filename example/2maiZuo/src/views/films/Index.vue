<template>
  <div class="film-list">
     <banner :data="bannerLists" v-if="bannerLists.length"></banner>
     <van-sticky @scroll="onScroll">
    <film-header v-show="isShow"></film-header>

    <tab-nav></tab-nav>
     </van-sticky>
     <!-- <keep-alive include="NowPlaying,ComingSoon"> -->
    <router-view></router-view>
     <!-- </keep-alive> -->
  </div>
</template>

<script>

import Banner from './components/Banner'
import TabNav from './components/TabNav'
import FilmHeader from './components/Header'
import { getFilmBannerList } from '@/api/film'

export default {
  data () {
    return {
      bannerLists: [],
      isShow: false
    }
  },
  created () {
    this.getBannerData()
  },
  components: {
    Banner,
    TabNav,
    FilmHeader
  },
  methods: {
    getBannerData () {
      getFilmBannerList().then((res) => {
        if (res.status == 0) {
          this.bannerLists = res.data
        }
      })
    },
    onScroll (obj) {
      this.isShow = obj.isFixed
    }
  }
}
</script>

<style lang="scss" scoped>
  .film-list {
    background-color: #fff;
  }
</style>
