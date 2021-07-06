<template>
	<view>
		<view class="navBar-wrap">
			<uni-navbar :isBack="true" title="customCaremaSelf">
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
		</view>
		<camera device-position="back" flash="off" style='width:100%; height:100vh;'>
			<cover-view class="camera-view">
				<cover-view class="title">{{title}}</cover-view>
				<!-- <cover-image class='bgImage' src='@/static/camarebg.png'> </cover-image> -->
				<!-- <cover-image class='takephoto' src='@/static/btn.png' @tap="takePhoto()"> </cover-image> -->
			</cover-view>
		</camera>

		<canvas v-show='showImage' canvas-id="canvas" style='width:1000px; height:1500px;'></canvas>
	</view>
</template>

<script>
	// 不支持createCameraContext相机
	export default {
		data() {
			return {
				title: '',
				ctx: null,
				path: "",
				image: "",
				showImage: false
			}
		},
		onLoad() {
			this.ctx = uni.createCameraContext();
		},
		methods: {
			takePhoto() {
				this.ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.imageChange(res)
					}
				});
			},
			imageChange(options) {
				var that = this
				//原图片信息
				var _width = options.width
				var _height = options.height
				that.path = options.tempImagePath

				//需要的图片信息
				var image_x = parseInt(_width * 0.1);
				var image_y = parseInt(_height * 0.09);
				var image_width = parseInt(_width * 0.8);
				var image_height = parseInt(_height * 0.87);

				uni.getImageInfo({
					src: that.path,
					success: function(res) {
						that.showImage = true
						//将原图画到canvas上面
						that.canvas = uni.createCanvasContext("canvas", that)
						that.canvas.drawImage(that.path, 0, 0, _width, _height)
						uni.showLoading({
							title: '数据处理中...',
							icon: 'loading',
							duration: 10000
						})
						that.canvas.draw()
						setTimeout(function() {
							//导出自己需要的图片
							uni.canvasToTempFilePath({
								canvasId: "canvas",
								x: image_x,
								y: image_y,
								width: image_width,
								height: image_height,
								destWidth: image_width,
								destHeight: image_height,
								success: function(res) {
									that.image = res.tempFilePath //处理好的图片
									uni.hideLoading()

									//TODO........

								},
								fail: function(e) {
									uni.hideLoading()
									uni.showToast({
										title: '出错啦...',
										icon: 'loading'
									})

								}
							});
						}, 1000);
					}
				})
			}
		}
	}
</script>

<style>

</style>
