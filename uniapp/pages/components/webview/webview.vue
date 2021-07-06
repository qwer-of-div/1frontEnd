<template>
	<view class="page-container">
		<view class="page-content">
			<!-- navBar -->
			<!-- <uni-navbar :isBack="true" title="webview">
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
			</uni-navbar> -->
			<!-- <web-view src="http://localhost:8888/#/components/webview" @message="handleMessage" @onPostMessage="handleMessage"></web-view> -->
			<web-view src="http://localhost:8888/#/components/webview" @message="handleMessage" ></web-view>
			<!-- <web-view src="http://localhost:8888/#/components/webview"></web-view> -->
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
			console.log('onLoad返回不会触发')
		},
		onShow() {
			console.log('onShow返回会触发')
		},
		onReady() {
			console.log('onReady返回不会触发')
			window.addEventListener("message",  (MessageEvent)=>{
			  console.log(MessageEvent)
			  }, false);
		},
		onHide() {
			console.log('触发onUnload不会触发onHide')
		},
		onUnload() {
			console.log('onUnload')
		},
		methods: {
			handleMessage(e) {
				console.log('h5不支持')
			} 
		}
	}
</script>

<style>

</style>
