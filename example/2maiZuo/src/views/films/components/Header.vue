<template>
  <header class="header-title">
    <div class="header-title-left">
      <router-link to="/city">
      <span class="city">
        <i>{{$store.state.cityName}}</i>
        <img src="@/assets/imgs/down-arrow.png" />
      </span>
      </router-link>
    </div>
    <div class="header-title-center">电影</div>
    <div class="header-title-right"></div>
  </header>
</template>
<style scoped>
.header-title{
    /* position: fixed; */
    top:0;
    width:100%;
    height: 1rem;
    line-height: 0.98rem;
    z-index: 9000;
    background-color: #fff;
    display: flex;
    padding:0 0.3rem;
    box-sizing: border-box;
}
.header-title-left{
    width:18%;
    flex:none;
    margin-top: -0.2rem;
}
.city{
    font-size:0.26rem;
    color: #000;

}
.city img{
    width: .12rem;
    height: .06rem;
    margin-left:.06rem;
}
.header-title-center{
    flex:1;
    font-size:0.34rem;
    text-align: center;
}
.header-title-right{
    width:18%;
    flex:none;
    font-size:0.26rem;
}
.header-title:after{
    display: block;
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
</style>
