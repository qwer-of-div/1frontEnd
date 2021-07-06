<template>
	<view class="content">
		<uni-navbar></uni-navbar>
		<image class="logo" src="/static/img/common/js_select.png"></image>
		<u-tabbar :list="tabBar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	
	export default {
		data() {
			return {
				title: '工具',
			}
		},
		computed: {
			// ...mapState('dic',['tabBar'])
			...mapState(['tabBar'])
		},
		onLoad() {
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
