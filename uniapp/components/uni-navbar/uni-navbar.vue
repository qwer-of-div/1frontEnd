<template>
	<view class="uni-navbar">
		<view class="">
			<u-navbar :height="height" :is-back="isBack" back-icon-color="#fff" :title="title" title-color="#fff" :background="background" :custom-back="onBack">
				<view class="navbar-right" slot="right" v-if="slotRight">
					<!-- <view class="message-box right-item">
							<u-icon name="chat" size="38"></u-icon>
							<u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
						</view>
						<view class="dot-box right-item">
							<u-icon name="calendar-fill" size="38"></u-icon>
							<u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
						</view> -->
					<!-- 插槽内插入插槽 -->
					<slot name="right"></slot>
				</view>
			</u-navbar>
		</view>
	</view>
</template>

<script>
	const initFromParent = {
		type: 'normal',
		title: '标题',
		height: 44,
		background: {
			// backgroundColor: '#001f3f',

			// 导航栏背景图
			// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
			// 还可以设置背景图size属性
			// backgroundSize: 'cover',

			// 渐变色
			backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
		},
		isBack: true,
		backIconColor: '#606266',
		customBack: 'normal',
		slotRight: true
	}
	export default {
		props: {
			type: {
				default: initFromParent.type
			},
			title: {
				default: initFromParent.title
			},
			height: {
				default: initFromParent.height
			},
			background: {
				default: () => initFromParent.background
			},
			isBack: {
				default: initFromParent.isBack
			},
			backIconColor: {
				default: initFromParent.backIconColor
			},
			customBack: {
				default: initFromParent.customBack
			},
			slotRight: {
				default: () => initFromParent.slotRight
			},
		},
		data() {
			return {

			}
		},
		methods: {
			// 左侧按钮
			onBack() {
				if (this.customBack === 'normal') {
					console.log('navBar公用返回')
					this.onMixRouter('', 'navigateBack')
					return
				}
				this.$emit('update:customBack', !this.customBack)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		//height: 200vh;
		height: calc(100% - 44px);
		height: calc(100% - 44px - constant(safe-area-inset-top));
		height: calc(100% - 44px - env(safe-area-inset-top));
	}

	.wrap {
		padding: 24rpx;
	}

	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}

	.message-box {}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240, 240, 240, 0.35);
		color: #fff;
		font-size: 22rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
	}

	.map-wrap-text {
		padding: 0 6rpx;
	}
</style>
