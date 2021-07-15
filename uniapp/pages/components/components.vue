<template>
	<view class="page-container">
		<view class="page-content">
			<!-- navBar -->
			<uni-navbar :isBack="true" title="components">
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
			<view class="space"></view>
			<uni-navList :parentValue="navList"></uni-navList>
			<!-- <template v-if="navList.length">
				<uni-navList :parentValue="navList"></uni-navList>
			</template> -->
		</view>
	</view>
</template>

<script>
	const navList = [{
		label: 'webview',
		path: '/pages/components/webview/webview'
	}, {
		label: '底部导航栏',
		path: '/pages/components/tabBar/uViewUI/index'
	}, {
		label: 'tabs',
		path: '/pages/components/tabs/tabs'
	}, {
		label: 'tabs_简易刷新',
		path: '/pages/components/tabs/goodTabs'
	},{
		label: '刷新',
		path: '/pages/components/refresh/refresh'
	},{
		label: '第三方登录',
		path: '/pages/components/threeLogin/threeLogin'
	},{
		label: '验证码',
		path: '/pages/components/authCode/authCode'
	},{
		label: '定位',
		path: '/pages/components/location/location'
	},{
		label: '相机',
		path: '/pages/components/camera/camera'
	},{
		label: '条件编译',
		path: '/pages/components/ifdef/ifdef'
	},{
		label: '云函数',
		path: '/pages/components/cloud/cloud'
	},{
		label: '权限和用户信息',
		path: '/pages/components/userInfo/userInfo'
	},{
		label: '支付',
		path: '/pages/components/pay/pay'
	},{
		label: 'jsDom',
		path: '/pages/components/jsDom/jsDom'
	}]

	export default {
		data() {
			return {
				navList: []
			}
		},
		onLoad() {
			this.handleInit()
		},
		methods: {
			handleInit() {
				this.navList = navList
			}
		}
	}
</script>

<style>

</style>
