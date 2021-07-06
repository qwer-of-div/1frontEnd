<template>
	<view class="page-container">
		<view class="page-content">
			<uni-navbar :isBack="true" title="carema">
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
			<view style="text-align: center;">
				导航列表
			</view>
			<view class="navList-wrap">
				<uni-navList :parentValue="navList"></uni-navList>
			</view>
			<br />
			<u-button type="primary" @click="onCamera">相机</u-button>
			<br />
			<u-button type="primary" @click="onScan">扫码</u-button>
			<br />
			<view v-for="(item,key) in label" style="text-align: left;">
				{{key}}:{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	const navList = [{
		label: '原生相机',
		path: '/pages/components/camera/customCamera/customCamera'
	}, {
		label: '自定义相机',
		path: '/pages/components/camera/customCamera/customCameraSelf'
	}, {
		label: '自定义扫码',
		path: '/pages/components/camera/customScan/customScan'
	}]
	export default {
		data() {
			return {
				navList: [],
				label: ''
			}
		},
		onLoad() {
			this.handleInit()
		},
		methods: {
			// init
			handleInit() {
				this.navList = navList
			},
			// 简易相机
			onCamera() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				})
			},
			//扫码验证
			onScan() {
				const _this = this;
				uni.scanCode({
					// onlyFromCamera: true, //为true只允许相机扫码，不加允许相册扫码
					success: function(res) {
						_this.label = res
						console.log(res)
						uni.showToast({
							title: '扫码成功'
						})
					},
					fail: function(err) {
						console.log('扫码失败', err)
					}
				})
			}
		}
	}
</script>

<style>

</style>
