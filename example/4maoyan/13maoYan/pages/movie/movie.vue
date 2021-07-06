<template>
	<view>
		<view class="header-box">
			<uni-myheader></uni-myheader>
		</view>
		<view class="my-nav flex">
			<view class="left" @tap="onCityTap">
				{{city}}
				<uni-icons type="arrowdown" size="20" color="#ccc"></uni-icons>
			</view>
			<view class="center">
				<uni-mynav @fromChild="onMyNav"></uni-mynav>
			</view>
			<view class="right">
				<uni-icons type="search" size="22" color="#E54847"></uni-icons>
			</view>
		</view>
		<view class="hot-show" v-show="curNav === 'reying'">
			<myHotShow @fromChild="handleMyHotShow"></myHotShow>
		</view>
	</view>
</template>

<script>
	import myHotShow from './components/HotShow.vue'

	export default {
		components: {
			myHotShow
		},
		data() {
			return {
				curCity: '成都', 	// 当前城市
				curNav: 'reying', 	// 当前nav
				hotShow: {			// 热映
					movieMethod: null, // 触底方法
				}
			};
		},
		computed: {
			city() {
				let city = this.$store.state.city.cityName.replace('市', '')
				if (city.length > 3) {
					return `${city.slice(0,2)}...`
				}
				return city
			}
		},
		//使用uni-app生命周期函数，滑动到页面底部的时候执行方法
		onReachBottom() {
			console.log('888')
			this.hotShow.movieMethod()
		},
		onLoad() {
			this.init()
			console.log(uni.getStorageSync('city'))
		},
		methods: {
			// 初始化
			init() {},
			// 子传父
			handleMyHotShow (callBack) {
				this.hotShow.movieMethod = callBack
			},
			// 城市选择
			onCityTap() {
				uni.navigateTo({
					url: '/pages/city/city',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 导航选择
			onMyNav(item) {
				this.curNav = item.value
				console.log(item)
		},
	}
	}
</script>

<style lang="scss" scoped>
	.my-nav {
		position: fixed;
		z-index: 1;
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		border-bottom: 1px solid #ccc;
		background-color: #fff;
		.left {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			width: 20%;
			font-size: 30rpx;
			// padding: 10rpx;
		}

		.center {
			box-sizing: border-box;
			width: 60%;
			// padding: 10rpx;
		}

		.right {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			box-sizing: border-box;
			width: 20%;
			// padding: 10rpx;
		}
	}
	.hot-show {
		padding-top: 80rpx;
	}
</style>
