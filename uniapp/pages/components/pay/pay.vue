<template>
	<view class="page-container">
		<view class="page-content">
			<!-- navBar -->
			<uni-navbar :isBack="true" title="pay">
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
			<view class="btn-wrap">
				<u-button type="primary" @click="onPay">支付</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onPay() {
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: String(Date.now()),
					nonceStr: 'A1B2C3D4E5',
					package: 'prepay_id=wx20180101abcdefg',
					signType: 'MD5',
					paySign: '',
					success: (res) =>{
						console.log('success:' + JSON.stringify(res));
					},
					fail: (err) =>{
						console.log(String(Date.now()),'fail:' + JSON.stringify(err));
					}
				})
			}
		}
	}
</script>

<style>

</style>
