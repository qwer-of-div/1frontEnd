<template>
	<view class="page-container">
		<view class="page-content">
			<!-- navBar -->
			<uni-navbar :isBack="true" title="userinfo">
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
				<u-button type="primary" @click="appLoginWx">小程序登录授权</u-button>
				<view class="space"></view>
				<u-button type="primary" @click="onCameraShow">摄像头权限</u-button>
				<view class="space"></view>
				<u-button type="primary" @click="onCamera">无权限相机</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	// 权限和微信小程序授权登录

	export default {
		data() {
			return {}
		},
		methods: {
			appLoginWx() {
				uni.getUserProfile({
					desc: '登录',
					success: (res) => {
						console.log(res);
						let info = JSON.parse(res.rawData);
						console.log(info);
					}
				})
			},
			// 无权限相机 无需权限
			onCamera() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				})
			},
			// 获取权限
			onCameraShow() {
				uni.authorize({
					scope: 'scope.camera',
					success: (res) => {
						uni.chooseImage({
							count: 6, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['camera'], //从相册选择
							success: (res) => {
								console.log(JSON.stringify(res.tempFilePaths));
							}
						})
					},
					fail: (res) => {
						uni.showModal({
							content: '检测到您没打开摄像头权限，是否去设置打开？',
							confirmText: "确认",
							cancelText: '取消',
							success: (res) => {
								if (res.confirm) {
									uni.openSetting({
										success: (res) => {
											console.log(res);
										}
									})
								} else {
									// uni.navigateBack({
									// 	delta: 1
									// })
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
