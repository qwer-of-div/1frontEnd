<template>
	<view>
		<uni-navbar :isBack="true" title="customCarema">
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
		<camera device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
		<button type="primary" @click="takePhoto">拍照</button>
		<br />
		<view>预览</view>
		<br />
		<image mode="widthFix" :src="src"></image>
	</view>
</template>


<script>
	// 原生plus相机
	export default {
		data() {
			return {
				src: ""
			}
		},
		onLoad() {
			this.ctxPlus = plus.camera.getCamera();
		},
		methods: {
			takePhoto() {
				const _this = this
				var res = this.ctxPlus.supportedImageResolutions[0];
				var fmt = this.ctxPlus.supportedImageFormats[0];
				this.ctxPlus.captureImage(function(path) {
						_this.src = path
						console.log("Capture image success: " + path);
					},
					function(error) {
						console.log("Capture image failed: " + error.message);
					}, {
						resolution: res,
						format: fmt
					}
				);
				return
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						_this.src = res.tempImagePath
					}
				});
			},
			error(e) {
				console.log(e.detail);
			}
		}
	}
</script>
