<template>
	<view class="content">
		<uni-navbar></uni-navbar>
		<image class="logo" src="/static/img/common/component_select.png"></image>
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
				title: 'Hello uView',
			}
		},
		computed: {
			...mapState(['tabBar'])
		},
		onLoad() {
			/**
			 * 示例中为每个tabbar页面都写了一遍tabbar变量，您可以将tabbar数组写入到vuex中，这样可以全局引用
			 */
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

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
