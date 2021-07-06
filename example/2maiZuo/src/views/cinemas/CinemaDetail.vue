<template>
  <div v-if="cinemaInfo">
    <!-- 影院详情页{{$route.params.cid}} -->
    <div class="header">
      <div class="back" @click="$router.push('/cinema')">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA2CAMAAACRK2tAAAAAkFBMVEVHcEwcHBwZGhsaGhwZHBwqKioZGhv///8bGxs/Pz8ZGhseHh4eHh4cHBwZGxsaGhsZGxsfHx8ZGhwZGhsZGhsdHR0ZGhsZGhsaGhwbGxsZGhsbGxsZGxseHh4ZGxsZGhsaGhskJCQZGxsaGhwZGxsZGhwaGhwZGhwZGhsZHh4fHx8aGhsZGhsZGhsZGhsZGhteFmxMAAAAL3RSTlMAEv1YdgzJAUsE+hkhP5WksQi+0/c08uWGStxnZirs3c0HsoeWo4W91DMp6+T28faGh4gAAADjSURBVDjLxZXZkoJADEUbVxBQlG1AYRZ3Z/T8/9/5gK9JqgZL83puVVd3TjrO/bumfjVVA3PwNf4BVAofAXvliA2QBDIfDuD4LXN/BpOxzOMMUk/meQF1KPOmhb9I5lEJvxeZhzXczjL3UrjGMh9PYKZ0YLmCwVDmQQJsFAEWwEgXgIMhwNwQYNFTgNXyfQK4Lygj1yeQF/CpHeHiDE6elrCuaT+Uc2vgJ3A9mtW1e2f9GGzVP8dSrpN2rSUs7e3B6UYvi7VEWEORa4mohLbREk37HD3Sl+iRPEGPqtdCsVfSo+6AByDPg79r1AAAAABJRU5ErkJggg=="
          width="11px"
          height="18px"
          style
        />
      </div>
      <!-- 影院基本信息(名字+地址){{cid}} -->
      <div>
        <h2>{{cinemaInfo.name}}</h2>
      </div>
      <div>
        <p v-if="cinemaInfo" class="services">
            <span v-for="item in cinemaInfo.services" :key="item.name">{{item.name}}</span>
        </p>
      </div>
      <div class="address">{{cinemaInfo.address}}</div>
    </div>
    <div>
      <cinema-banner :data="cinemaFilms" v-if="cinemaFilms.length" @selectEvt="changeFilm($event)"></cinema-banner>
      <router-view :filmInfo="activeFilmInfo" v-if="activeFilmInfo"></router-view>
    </div>
  </div>
</template>
<script>
import CinemaBanner from './components/Banner'
import { getCinemaInfo, getCinemaFilms } from '@/api/cinema'
// import filmsData from './mock'
export default {
  data () {
    return {
      cid: 0,
      cinemaInfo: null,
      cinemaFilms: [],
      activeFilmInfo: null
    }
  },
  watch: {
    '$route.params.cid': {
      handler (value) {
        this.cid = value
        this.getCinemaDetail()
        this.getCinemaFilmLists()
      },
      immediate: true
    }
  },
  methods: {
    getCinemaDetail () {
      getCinemaInfo({ cid: this.cid }).then(res => {
        console.log('当前影院的信息是', res)
        this.cinemaInfo = res.data.cinema
      })
    },
    getCinemaFilmLists () {
      getCinemaFilms({ cid: this.cid }).then(res => {
        console.log('当前影院的电影有', res)
        // this.cinemaInfo = res.data.cinema
        this.cinemaFilms = res.data.films
      })
    },
    getCinemaFilmLists1 () {
      this.cinemaFilms = filmsData
    },
    changeFilm (index) {
      console.log('当前选择的电影下标是', index)
      console.log(this.cinemaFilms[index].showDate)
      this.activeFilmInfo = this.cinemaFilms[index]
      let date = this.activeFilmInfo.showDate[0]
      this.$router.push(
        `/cinema/${this.cid}/film/${this.activeFilmInfo.filmId}/${date}`
      )
    }
  },
  components: {
    CinemaBanner
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 0.3rem;
  h2 {
    font-size: 0.34rem;
    text-align: center;
    margin: 0.3rem 0;
  }
  .services  {
      margin-top: -0.5rem;
      padding-bottom: 0.4rem;
    //   height: 0.4rem;
    text-align: center;
      vertical-align: top;
      border-bottom: 1px solid #ededed;
  }
  .services span {
      font-size: 0.2rem;
      color: #ffb232;
      padding: 0 0.12rem;
      margin: 0 0.05rem;
      border: 1px solid #ffb232;
  }
  .address {
      width: 5.55rem;
      font-size: 0.28rem;
      text-align: center;
      margin: 0.3rem auto;
      overflow: hidden;

    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
