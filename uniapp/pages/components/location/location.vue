<template>
	<view class="page-container">
		<view class="page-content">
			<uni-navbar :isBack="true" title="location">
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
			<button type="primary" @click="onLocation">获取当前位置</button>
			<br />
			<button type="primary" @click="onMapLocation">获取地图位置</button>
			<br />
			<button type="primary" @click="onGetLocation">打开地图</button>
			<br />
			<view>
				<view class="page-body">
					<view class="page-section page-section-gap">
						<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers" @tap="onMap"
						 @anchorpointtap="onAnchorpointtap"></map>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/icon-yes.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '/static/icon-yes.png'
				}]
			}
		},
		onLoad() {
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					this.latitude = res.latitude
					this.longitude = res.longitude
					let location = {
						latitude: res.latitude,
						longitude: res.longitude
					}
					this.covers.push(location)
					console.log(res);
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			})
		},
		methods: {
			// 地图点击
			onMap (e) {
				console.log(e)
			},
			// 点击定位标时触发
			onAnchorpointtap (e) {
				console.log(e.detail)
			},
			// 获取当前位置
			onLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log(res);
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				})
			},
			// 获取地图位置
			onMapLocation() {
				uni.chooseLocation({
					success(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			onGetLocation() {
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						// 打开地图
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success() {
								console.log('success');
							}
						});
					}
				});
			},
		}
	}
</script>

<style>

</style>
