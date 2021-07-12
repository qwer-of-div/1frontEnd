<template>
  <div>
    <div class="cinema-list">
      <div class="cinema-list-tag">
        <div class="cinema-list-tag-name">
          <label class @click="isShow.splice(0,1,!isShow[0])">
            {{area}}
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAANlBMVEVHcEz/Xxb/Xxb/Xxf/Xxb/bST/ZBv/YBn/Xxb/Xxf/Xxf/Xxb/YBb/Xxb/YBb/YBb/YRb/XxYVPc+mAAAAEXRSTlMA5Z7SygccPfpr6OmSfp9ycXeG0lYAAABPSURBVAjXVY05EsAgDMTM4Zgzif7/2RTABFTtqNCKDCwEk4OcIOVNqAcAr8tcEYgRiNfMFMCr3kCxM7NWB+o8swp0cX9hVJ08run23dz7ASR9A7q9wA9qAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
              style="display: none;"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
            />
          </label>

          <label class>
            APP订票
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAANlBMVEVHcEz/Xxb/Xxb/Xxf/Xxb/bST/ZBv/YBn/Xxb/Xxf/Xxf/Xxb/YBb/Xxb/YBb/YBb/YRb/XxYVPc+mAAAAEXRSTlMA5Z7SygccPfpr6OmSfp9ycXeG0lYAAABPSURBVAjXVY05EsAgDMTM4Zgzif7/2RTABFTtqNCKDCwEk4OcIOVNqAcAr8tcEYgRiNfMFMCr3kCxM7NWB+o8swp0cX9hVJ08run23dz7ASR9A7q9wA9qAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
              style="display: none;"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
            />
          </label>
          <label class>
            最近去过
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAANlBMVEVHcEz/Xxb/Xxb/Xxf/Xxb/bST/ZBv/YBn/Xxb/Xxf/Xxf/Xxb/YBb/Xxb/YBb/YBb/YRb/XxYVPc+mAAAAEXRSTlMA5Z7SygccPfpr6OmSfp9ycXeG0lYAAABPSURBVAjXVY05EsAgDMTM4Zgzif7/2RTABFTtqNCKDCwEk4OcIOVNqAcAr8tcEYgRiNfMFMCr3kCxM7NWB+o8swp0cX9hVJ08run23dz7ASR9A7q9wA9qAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
              style="display: none;"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="filter-wrap">
      <ul class="district-list clearfix" v-if="dataLists" v-show="isShow[0]">
        <li @click="wholeCity">
          <div>全城</div>
        </li>
        <li v-for="item in areaLists" :key="item" @click="selectArea(item)">
          <div>{{item}}</div>
        </li>
      </ul>
    </div>
    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show" get-container=".cinema-list" >dsadsadss</van-popup>-->
  </div>
</template>

<script>
import { getCinemaList } from '@/api/cinema'
import bus from '@/assets/js/bus.js'

export default {
  data () {
    return {
      isShow: [false, false, false],
      area: '全城',
      dataLists: [],
      areaLists: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getCinemaList().then(res => {
        this.dataLists = res.data.cinemas
        res.data.cinemas.forEach(item => {
          if (this.areaLists.indexOf(item.districtName) === -1) {
            this.areaLists.push(item.districtName)
          }
        })
      })
    },
    selectArea (val) {
      this.area = val
      let dataLists = []
      dataLists = this.dataLists.filter(item => {
        return item.districtName === val
      })
      bus.$emit('getData', dataLists)
      this.isShow.splice(0, 1, false)
      // console.log(this.dataLists)
    },
    wholeCity () {
      this.area = '全城'
      bus.$emit('getData', this.dataLists)
      this.isShow.splice(0, 1, false)
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.cinema-list {
  border: 0.02rem solid #69f;
}
.cinema-list .cinema-list-tag {
  position: fixed;
  height: 1rem;
  width: 100%;
  top: 0.88rem;
  right: 0;
  text-align: center;
  background-color: #fff;
  z-index: 2000;
}
.cinema-list {
  position: relative;
  height: 1rem;
}
.cinema-list .cinema-list-tag .cinema-list-tag-name label {
  float: left;
  width: 33.3%;
  line-height: 0.98rem;
  font-size: 0.28rem;
  color: #191a1b;
  letter-spacing: -0.2px;
}
.cinema-list .cinema-list-tag .cinema-list-tag-name img {
  vertical-align: middle;
  padding-left: 0.04rem;
}
img {
  width: 0.12rem;
  height: 0.06rem;
}

//删选
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.district-list {
  position: fixed;
  top: 1.88rem;
  background-color: #fff;
  padding: 0.2rem 0 0 0.2rem;
}
.district-list li {
  float: left;
  margin: 0 0.1rem 0.3rem 0;
}
.district-list li div {
  width: 1.63rem;
  height: 0.6rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.6rem;
  border: 0.01rem solid #ededed;
  // border-bottom: 1px solid #ededed;
  border-radius: 0.06rem;
}
</style>
