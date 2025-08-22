<template>
  <div>
    <div class="search1">
      <van-icon class="se" name="search" />
      <input type="text" placeholder="请输入城市名或拼音" v-model="text" />
    </div>
    <div class="startbanner">
      <div>
        <div class="dvdv1">
          <p>GPS定位你所在城市</p>
          <div class="dv1" @click="$emit('changeCity','510100','成都')">{{$store.state.cityName}}</div>
          <p style="margin-top:0.35rem">热门城市</p>
          <ul>
            <li v-for="item in ishot" :key="item.cityId">
              <div class="dv1" @click="$emit('changeCity',item.cityId,item.name)">{{item.name}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  <van-index-bar :index-list="indexes">
    <template v-for="(char) in indexes">
        <van-index-anchor :index="char" :key="char"/>
        <van-cell @click="$emit('changeCity',city.cityId,city.name)" :title="city.name" v-for="(city) in dataList[char]" :key="city.cityId"/>
    </template>
     <!-- <van-index-anchor index="A" />
    <van-cell title="文本" />
    <van-cell title="文本" />

    <van-index-anchor index="B" />
    <van-cell title="文本" />
    <van-cell title="文本" /> -->
    <!-- <van-cell title="文本" /> -->
  </van-index-bar>
   </div>
</template>
<script>
// {A:[{},{}]}
export default {
  props: ['dataList', 'indexes', 'cityList'],
  data () {
    return {
      text: '',
      ishot: []
    }
  },
  created () {
    this.cityList.forEach(ele => {
      if (ele.isHot === 1) {
        this.ishot.push(ele)
      }
    })
    console.log('index-bar组件中的城市数据', this.cityList)
  }
}
</script>

<style scoped lang="scss">
.search1 {
  height: 1rem;
  background-color: #f4f4f4;
  text-align: center;
  .se {
    font-size: 0.536667rem;
    background: #ffff;
  }
  input {
    font-size: 0.366667rem;
    width: 85%;
    text-align: center;
    border-radius: 5%;
  }
}
.startbanner {
  // width: 100%;
  height: 3.7rem;

  padding: 0.266667rem;
  padding-left: 0;
  div {
    margin-left: 0.266667rem;
    font-size: 0.283rem;
    color: #ccc;
    .dvdv1 {
      .dv1 {
        width: 1.7rem;
        height: 0.6rem;
        text-align: center;
        line-height: 0.666rem;
        color: #000;
            background-color: #f4f4f4;
        margin-top: 0.35rem;
      }
      ul {
        li {
          float: left;
        }
      }
    }
  }
}
</style>
