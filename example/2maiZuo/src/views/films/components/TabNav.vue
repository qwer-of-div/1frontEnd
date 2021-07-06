<template>
  <div class="tab-bar-wrap">
    <ul class="tab-bar-nav">
      <li>
        <router-link to="/films/nowPlaying">正在热映</router-link>
      </li>
      <li>
        <router-link to="/films/comingSoon">即将上映</router-link>
      </li>
    </ul>
    <div class="tab-bar-line-wrap" :style="{transform:`translate3d(${translateX}%, 0px, 0px)`}">
      <span class="tab-bar-line"></span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      translateX: 0
    }
  },
  watch: {
    $route: {
      handler (val) {
        // this.translateX = val.path == '/films/nowPlaying' ? 0 : 100
        this.translateX = val.meta.lineX
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.tab-bar-wrap{
    height: .88rem;
    background: #fff;
    width: 100%;
    font-size:0.28rem;
    position: relative;
    z-index:199;
}
.tab-bar-wrap:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    color: #ededed;
    -webkit-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(.5);
    -ms-transform: scaleY(.5);
    transform: scaleY(.5);
}
.tab-bar{
    position: fixed;
    top:.98rem;
}
.tab-bar-nav{
    display: flex;
    flex-direction: row;
    background-color: #fff;
}
.tab-bar-nav li{
    flex:1;
    text-align: center;
}
.tab-bar-nav a{
    display: block;
    line-height: 0.88rem;
    color: #191a1b;
}
.tab-bar-nav .router-link-exact-active{
    color: #ff5f16;
}
.tab-bar-line-wrap{
    position: absolute;
    bottom: 0;
    width: 50%;
    z-index: 200;
    left:0;
    transition: transform .2s;
    /* transform: translate3d(100%, 0px, 0px); */
}
.tab-bar-line{
    border-bottom: 2px solid #ff5f16;
    border-radius: 20px;
    display: block;
    margin: auto;
    width: 1.12rem;
}
</style>
