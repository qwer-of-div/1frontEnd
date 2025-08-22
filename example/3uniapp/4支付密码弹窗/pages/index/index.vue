<template>
	<view>
		<view class="content">
			<button v-for="(item, index) in buttonList" :key="index" @click="showModal(item.mode)">{{item.label}}（mode = {{item.mode}}）</button>
		</view>
		<ssPaymentPassword ref="paymentPassword" :mode="mode" @submit="submitHandle" />
	</view>
</template>

<script>
	import ssPaymentPassword from '../../components/sanshui-payment-password'
	export default {
		data() {
			return {
				mode: 0,
				buttonList: [
					{
						mode: 1,
						label: '安全密码校验'
					},
					{
						mode: 2,
						label: '设置安全密码'
					},
					{
						mode: 3,
						label: '修改安全密码'
					},
					{
						mode: 4,
						label: '找回登录密码'
					},
					{
						mode: 5,
						label: '重置安全密码'
					},
				]
			}
		},
		components: {
			ssPaymentPassword
		},
		methods: {
			showModal(mode){
				this.mode = mode;
				this.$refs.paymentPassword.modalFun('show');
			},
			submitHandle(e){
				console.log(e);
			}
		}
	}
</script>

<style>
	.content{
		height: 80vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.content button{
		padding: 10rpx 20rpx;
		margin-top: 20rpx;
		width: 60%;
		font-size: 28rpx;
		text-align: center;
		background-color: transparent;
	}
</style>
