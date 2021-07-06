<template>
    <div>
        <header>
            <!-- <h2>当前城市---{{$store.state.cityName}}</h2> -->
        </header>
        <hh-location @changeCity="selectCity" v-show="false"></hh-location>
        <div>
            <!-- 热门城市 -->
        </div>
        <hh-index-bar @changeCity="selectCity2" v-if="cityList.length" :indexes="indexes" :dataList="cityData" :cityList="cityList"></hh-index-bar>
    </div>
</template>
<script>
import HhLocation from '@/components/Localtion'
import HhIndexBar from './IndexBar'
import { setCityId, setCityName } from '@/utils/local-data'
import { getCityList } from '@/api/city'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      cityList: [],
      gpsCityName: '', // 定位城市名称
      gpsCityId: '',
      indexes: [] // 存储的是所有城市拼音的首字母
    }
  },
  computed: {
    cityData () {
      // {A:[{}],B:[{}]}
      let result = {} // 存储所有城市，是按城市的拼音首字母分类
      this.cityList.forEach(element => {
        let key = element.pinyin.charAt(0).toUpperCase()
        if (!result[key]) {
          result[key] = []
          this.indexes.push(key)
        }
        result[key].push(element)
      })
      this.indexes.sort()
      console.log(this.indexes)
      return result
    }
  },
  components: {
    HhLocation,
    HhIndexBar
  },
  created () {
    this.getCityData()
  },
  methods: {
    ...mapMutations(['setCityId', 'setCityName']),
    selectCity (name) {
      // 根据当前城市名称获取相应的城市id
      // 将城市id以及名称存放在localStorage中和vuex中
      console.log('父组件拿到的城市....', name)
      this.gpsCityName = name
      this.getCityIdByName()
      this.setCity(this.gpsCityId, this.gpsCityName)
    },
    getCityData () {
      getCityList().then(result => {
        if (result.status == 0) {
          this.cityList = result.data.cities
          console.log('获取数据', this.cityList)
        }
      })
    },
    getCityIdByName () {
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].name == this.gpsCityName) {
          this.gpsCityId = this.cityList[i].cityId
          break
        }
      }
    },
    // 存储当前城市的id以及名称
    setCity (id, name) {
      console.log('存储当前城市信息....')
      setCityId(id)
      setCityName(name)
      this.setCityId(id)
      this.setCityName(name)
    },
    selectCity2 (id, name) {
      this.setCity(id, name)
      this.$router.push('/films')
    }
  }
}
</script>
