<template>
  <div>
    <div id="map-container"></div>
  </div>
</template>
<script>
import location1 from '@/utils/location'
export default {
  data () {
    return {}
  },
  methods: {
    /** 获取地图定位 */
    getLocation () {
      let _that = this
      let geolocation = location1.initMap('map-container', (cityName) => {
        console.log('location.js中拿到的', cityName)
        this.$emit('changeCity', cityName) // 向父组件传递当前城市
      }) // 定位
    }
  },
  mounted () {
    this.getLocation()
  }
}
</script>
