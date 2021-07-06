<template>
	<view class="page-container">
		<view class="page-content">
			<uni-navbar :isBack="true" title="tabs">
				<template slot="right">
					<view class="message-box right-item">
						<u-icon name="chat" size="38"></u-icon>
						<u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
					</view>
					<view class="dot-box right-item">
						<u-icon name="calendar-fill" size="38"></u-icon>
						<u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
					</view>
				</template>
			</uni-navbar>
			<view class="tabs-wrap">
				<u-tabs name="cate_name" count="cate_count" :list="list" :current="current" @change="change"></u-tabs>
			</view>
		</view>
	</view>
</template>

<script>
	// 简易tabs
	export default {
			data() {
				return {
					list: [{
						cate_name: '待付款1'
					},{
						cate_name: '待付款2'
					},{
						cate_name: '待付款3'
					},{
						cate_name: '待付款4'
					},{
						cate_name: '待付款5'
					},{
						cate_name: '待评价6',
	                    cate_count: 5
					}],
					current: 0
				}
			},
			methods: {
				change(index) {
					this.current = index;
				}
			}
		}
</script>

<style>
</style>
