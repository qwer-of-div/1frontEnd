<template>
     <ul class="nav-bar"  @click="changeClass">
        <li>
            <router-link to="/">
                <img class="img1" src="@/assets/imgs/film.png" />
                <span>电影</span>
            </router-link>
        </li>
        <li @click="changeClass">
            <router-link to="/cinema">
                <img class="img1" src="@/assets/imgs/download.png" />
                <span>影院</span>
            </router-link>
        </li>
        <li>
            <router-link to="/news">
                <img class="img1" src="@/assets/imgs/news.png" />
                <span>资讯</span>
            </router-link>
        </li>
        <li @click="changeClass">
            <router-link to="/center">
                <img class="img1" src="@/assets/imgs/my.png" />
                <span>我的</span>
            </router-link>
        </li>
    </ul>
</template>

<script>

import film1 from '@/assets/imgs/film1.png'
import download1 from '@/assets/imgs/download1.png'
import my1 from '@/assets/imgs/my1.png'

export default {
  data () {
    return {
      img1: '',
      img: [film1, download1, my1],
      filterClass: [
        {
          flag: 0,
          arr: ['film', 'film1']
        },
        {
          flag: 0,
          arr: ['download', 'download1']
        },
        {
          flag: 0,
          arr: ['my', 'my1']
        },
        
        
      ]
    }
  },
  watch: {
    '$route': {
      handler (value) {
        //   let img = null
        for (var i = 0; i < this.filterClass.length; i++) {
          if (value.path.includes(this.filterClass[i])) {
            this.img1 = this.img[i]
            break
          }
        }
        //   console.log(img)
      },
      immediate: true
    }
  },
  methods: {
    changeClass (evt) {
      // let last = evt.currentTarget.getElementsByClassName("img1")[0].src;
      // evt.currentTarget.getElementsByClassName("img1")[0].src = this.img1;
      console.log(evt.currentTarget)
      // console.log()
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
    span {
        color: #ff5f16;
    }

}
.nav-bar{
    height: .98rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index:100;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: .2rem;
    background-color: #fff;
}
.nav-bar:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #ededed;
    color: #ededed;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
.nav-bar li{
    flex: 1;
    text-align: center;
    height: .98rem;
}
.nav-bar  a{
    color: #797d82;
    display: block;
    height: .98rem;
    line-height: 0.56rem;
    width: 100%;
    position: relative;
    padding-top:0.08rem;
    box-sizing: border-box;
}
.nav-bar img{
    width: 0.42rem;
    height: 0.42rem;
}
.nav-bar span{
    position: absolute;
    top:0.5rem;
    left:50%;
    transform: translateX(-50%);
}
</style>
