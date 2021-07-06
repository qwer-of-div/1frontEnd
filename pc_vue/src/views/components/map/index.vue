<template>
  <baidu-map class="map"
             :center="center"
             :zoom="14"
             @ready="handler"
             style="height:100%"
             :scroll-wheel-zoom="true">
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                    :showAddressBar="false"
                    :autoLocation="true">
    </bm-geolocation>
    <!-- 自定义定位图标覆盖物 -->
    <bm-marker :position="autoLocationPoint"
               v-if="initLocation">
    </bm-marker>
  </baidu-map>
</template>

<script>
export default {
  data () {
    return {
      // 省略一部分
      center: '北京',
      autoLocationPoint: { lng: 0, lat: 0 },
      initLocation: false
    }
  },
  methods: {
    handler ({ BMap, map }) {
      const _this = this// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        console.log(r)
        _this.center = { lng: r.longitude, lat: r.latitude }// 设置center属性值
        _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }// 自定义覆盖物
        _this.initLocation = true
        console.log('center:', _this.center)// 如果这里直接使用this是不行的
      }, { enableHighAccuracy: true })
    }
  }
}
</script>
