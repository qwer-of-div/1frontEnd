const location = {
  initMap (id, cb) {
    let mapObj = new AMap.Map(id, {})
    mapObj.plugin(['AMap.CitySearch'], function () {
      // 实例化城市查询类
      var citysearch = new AMap.CitySearch()
      // 自动获取用户IP，返回当前城市
      citysearch.getLocalCity()
      AMap.event.addListener(citysearch, 'complete', function (result) {
        if (result && result.city && result.bounds) {
          var cityinfo = result.city
          console.log('当前城市是：', cityinfo)
          cb(cityinfo.slice(0, -1))
        }
      })
      AMap.event.addListener(citysearch, 'error', function (result) { console.log(result.info) })
    })
  }
}
export default location
