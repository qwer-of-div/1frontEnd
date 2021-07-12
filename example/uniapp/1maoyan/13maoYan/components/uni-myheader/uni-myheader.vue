<template>
	<view class="page-container my-header-comp">
		<view class="page-content">
			<uni-nav-bar title="猫眼电影" color="#fff" background-color="#E54847" @clickRight="onMenu">
				<view slot="right">
					<uni-icons type="bars" size="22" color="#fff"></uni-icons>
				</view>
			</uni-nav-bar>
			<view class="maoYan-app">
				<navigator url="/pages/city/city" hover-class="navigator-hover">
				    <view class="title flex">
						<image src="/static/images/logo.png" mode=""></image>
				    	<view class="desc flex-col">
							<text>猫眼</text>
							<text>在线选座，热门影讯，爱上看电影</text>
				    	</view>
				    </view>
					<button type="default">打开App</button>
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	export default {
		components: {uniNavBar, uniIcons},
		props: {
			type: {
				type: String,
				default: 'normal'
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 右侧菜单点击事件
			onMenu () {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-header-comp {
		height: 241rpx;
	}
	.page-content {
		position: fixed;
		z-index: 1;
		height: auto;
		background-color: #fff;
		border-bottom: 1px solid #ccc;
	}
	.maoYan-app {
		padding: 30rpx;
		navigator {
			display: flex;
			justify-content: space-between;
			align-items: center;
			button {
				padding: 15rpx;
				font-size: 26rpx;
				line-height: 26rpx;
				color: #fff;
				border-radius: 5rpx;
				background-color: #E54847;
			}
		}
		image {
			width: 100rpx;
			height: 100rpx;
		}
		.desc {
			justify-content: center;
			text {
				display: block;
				padding-left: 10rpx;
				font-size: 26rpx;
				&:first-of-type {
					font-size: 35rpx;
					color: #000;
				}
			}
		}
	}
</style>
