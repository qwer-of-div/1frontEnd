<template>
	<view class="page-container">
		<view class="page-content page-ifdef">
			<uni-navbar :isBack="true" title="条件编译">
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
			<br />
			<view class="if-wrap">
				条件编译
			</view>
			<!-- #ifdef H5 -->
			<view class="if-wrap">
				H5
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="if-wrap">
				微信
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// #ifdef H5 || APP-PLUS
			console.log('H5 APP条件编译')
			// #endif
			// #ifndef APP-PLUS || MP-WEIXIN
			console.log('非APP 微信条件编译')
			// #endif
			// #ifdef MP-WEIXIN
			console.log('微信条件编译')
			// #endif
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page-ifdef {

		/* #ifdef H5 */
		.if-wrap {
			color: #69f;
		}

		/* #endif */
		/* #ifdef MP-WEIXIN */
		.if-wrap {
			color: #096;
		}

		/* #endif */
	}
</style>
