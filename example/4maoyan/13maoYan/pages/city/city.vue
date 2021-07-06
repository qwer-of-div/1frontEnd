<template>
	<view>
		<city-select
		            @cityClick="onCityChoose"
		            :formatName="formatName"
		            :activeCity="activeCity"
		            :hotCity="hotCity"
		            :obtainCitys="obtainCitys"
		            :isSearch="true"
		            ref="citys"
		        ></city-select>
	</view>
</template>

<script>
	import citys from '../../static/js/citys.js'
	import {  
	 mapState,   
	 mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return {
				formatName: 'cityName',		//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				//当前城市
				activeCity: {cityName: '成都', cityCode: 510100},
				//热门城市
				hotCity: [{cityName: '成都', cityCode: 510100}],
				//显示的城市数据
				obtainCitys: citys
			};
		},
		methods: {
			// 城市选择
			onCityChoose (obj) {
				uni.setStorageSync('city', JSON.stringify(obj))
				this.$store.commit("setCity", obj)
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">

</style>
