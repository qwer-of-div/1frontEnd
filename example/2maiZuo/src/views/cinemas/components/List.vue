<template>
  <ul class="cinema-lists">
    <li v-for="item in dataLists" :key="item.cinemaId">
      <router-link :to="`/cinema/${item.cinemaId}`">
        <div class="clearfix">
          <div class="cinema-info-lf cinema-info">
            <span class="cinema-name">{{item.name}}</span>
            <span class="cinema-address">{{item.address}}</span>
          </div>
          <div class="cinema-info-rt cinema-info">
            <div class>
              <span class="cinema-lowPrice price-fmt">
                <i>￥</i>
                <span class="interge" style="font-size: 15px;">{{(item.lowPrice + '').slice(0, -2)}}</span>
                <span style="display: none;">.</span>
                <span class="decimal" style="font-size: 10px;"></span>
                <span style="display: none;">.</span>
                <span class="decimal" style="font-size: 10px; display: none;">00</span>
              </span>
              <span class="upon">起</span>
            </div>
            <span class="cinema-gpsAddress">距离未知</span>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { getCinemaList } from '@/api/cinema'
import bus from '@/assets/js/bus.js'

export default {
  props: ['filterCinema'],
  data () {
    return {
      dataLists: [],
      dataLists1: []
    }
  },
  created () {
    this.getData()
    bus.$on('getData', val => {
      // 这里最好用箭头函数，不然this指向有问题
      this.dataLists = val
    })
  },
  watch: {

    filterCinema (val) {
      if (val) {
        this.dataLists = this.dataLists1
        // this.getData();
        this.dataLists = this.dataLists.filter(item => {
          return item.name.includes(val)
        })
      }
    }
  },
  updated () {
    // console.log(this.filterCinema)
  },
  methods: {
    getData () {
      getCinemaList().then(res => {
        this.dataLists = res.data.cinemas
        this.dataLists1 = res.data.cinemas
      })
    }
  }
}
</script>

<style scoped lang="scss">
.cinema-lists {
  padding-left: 0.3rem;
  font-size: 0.3rem;
  background-color: #fff;
  li {
    line-height: 1.8em;
    padding: 0.3rem;
    padding-left: 0;
    background-color: #fff;
  }
}
.cinema-info-lf {
    float: left;
    width: calc(100% - 1.3rem);
    text-align: left;

    span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #191a1b;
        font-size: 0.3rem;
    }
    .cinema-address {
    color: #797d82;
    font-size: 0.24rem;
    margin-top: 0.1rem;
}
}

.cinema-info-rt {
    float: right;
    width: 1.3rem;
        color: #ff5f16;
    text-align: right;
}
.cinema-gpsAddress {
    display: block;
    font-size: 0.22rem;
    color: #797d82;
    margin-top: 0.1rem;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.clearfix {
  zoom: 1;
}
</style>
