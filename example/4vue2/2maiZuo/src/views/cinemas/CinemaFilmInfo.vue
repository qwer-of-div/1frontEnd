<template>
    <div>
        <div class="filmName">
            <p class="filmName1">
                <span>{{filmInfo.name}}</span>
                <span class="sorce">{{filmInfo.grade}}分</span>
            </p>
            <p class="filmType">
                <span>{{filmInfo.category}}</span>
            </p>
        </div>
        <hr />
        <div class="dateList">
           
                <template v-for="(item) in filmInfo.showDate">
           
            <router-link class="date" :to="`/cinema/${$route.params.cid}/film/${$route.params.fid}/${item}`"  :key="item" style="margin-left:0.15rem;">{{item | dateFormat}}</router-link>
            <!-- <br :key="item+'-'+index"/> -->
                </template>
            
           
        </div>
        <ul class="timeList">
            <!-- {{item.hallName}} -->
            <li v-for="item in schedules" :key="item.scheduleId">
                <div class="left">
                    <p class="startTime">{{item.showAt | filmsTime}}</p>
                    <p class="endTime">{{item.endAt | filmsTime}}散场</p>
                </div>
                <div class="center">
                    <p class="language">{{item.filmLanguage + item.imagery}}</p>
                    <p class="hall">{{item.hallName}}</p>
                </div>
                <div class="right">
                    <span class="price">￥{{(item.salePrice + '').slice(0, -2)}}</span>
                    <router-link to="">购票</router-link>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

// import Swiper from 'swiper'
import { getCinemaFilmSchedule } from '@/api/cinema'

export default {
  props: ['filmInfo'],
  data () {
    console.log(this.filmInfo)
    return {
      schedules: []
    }
  },
  updated () {
    //   this.initSwiper()
  },
  watch: {
    $route: {
      handler (val) {
        this.getData()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getData () {
      getCinemaFilmSchedule({ cid: this.$route.params.cid, fid: this.$route.params.fid, date: this.$route.params.date }).then(res => {
        console.log('当前时间安排是：', res)
        this.schedules = res.data.schedules
      })
    },
    initSwiper() {
      let _this = this;
      var swiper = new Swiper(".swiper1", {
        slidesPerView: 4,
        spaceBetween: 10
        
      });
    }
  },
   
}
</script>

<style lang="scss" scoped>
    .filmName {
        text-align: center;

        .filmName1 {
             margin: 0.3rem 0;
            font-size: 0.3rem;
    color: #191a1b;
    padding-right: 0.1rem;
        }
        .sorce {
                font-size: 0.32rem;
    font-style: italic;
    color: #ffb232;
        }
        .filmType {
            text-align: center;
    height: 0.36rem;
    color: #797d82;
    font-size: 0.26rem;
    padding: 0 12%;
    overflow: hidden;
        text-overflow: ellipsis;
    white-space: nowrap;
        }
    }
    .dateList {

        margin-top: -0.5rem;
         overflow: hidden;
        text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #ededed;
    .date {
         margin-left: 0 !important;
            color: #191a1b;
    text-align: center;
    height: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.28rem;
    cursor: pointer;
        padding: 0 0.3rem;
    }
    }

    .timeList {
        li {
                height: 0.88rem;;
    padding: 0.3rem;;
    position: relative;
    background: #fff;
    border-bottom: 1px solid #ededed;
    .left {
        float: left;
    width: 2rem;
        .startTime {
                font-size: 0.3rem;
    color: #191a1b;
        }
        .endTime {
               font-size: 0.26rem;
    color: #797d82;
    margin-top: 0.2rem;
        }
    }
    .center {
        float: left;
        width: 2.1rem;

        .language {
                font-size: 0.3rem;
    color: #191a1b;
        }
        .hall {
               font-size: 0.26rem;
    color: #797d82;
    margin-top: 0.2rem;
    overflow: hidden;
        text-overflow: ellipsis;
    white-space: nowrap;
        }
    }
    .right {
            float: right;
    padding: 0.2rem 0;
    line-height: 0.5rem;
    font-size: 0.3rem;
    color: #ff5f16;
    .price {
        float: left;
        padding-right: 0.4rem;
    }
    a{
        color: #ff5f16;
    float: right;
    height: 0.5rem;
    width: 1rem;
    border-radius: 0.04rem;
    border: 1px solid #ff5f16;
    position: relative;
    text-align: center;
    }
    }
        }
    }
</style>
