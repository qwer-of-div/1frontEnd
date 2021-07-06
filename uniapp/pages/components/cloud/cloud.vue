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
			<br />
			<uni-navList :parentValue="navList"></uni-navList>
		</view>
	</view>
</template>

<script>
	const navList = [{
		label: 'unicloudDB',
		path: '/pages/components/cloud/unicloudDB/unicloudDB'
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
