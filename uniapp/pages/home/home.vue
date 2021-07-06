<template>
	<view class="page-container">
		<view class="page-container">
			<!-- navBar -->
			<uni-navbar :customBack.sync="navBar.customBack" :isBack="false" title="home">
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
			<view class="btn-wrap">
				<u-button type="primary" @click="onMixRouter('/pages/login/login')">登录</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navBar: {
					customBack: false
				}
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
