<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad () {
			try {
				let city = JSON.stringify({'cityName': '成都', 'cityCode': '510100'})
			    uni.setStorageSync('city', city);
			} catch (e) {
			    // error
			}
		},
		onReady () {
			uni.switchTab({
			    url: '/pages/movie/movie'
			});
		}
	}
</script>

<style lang="scss">

</style>
