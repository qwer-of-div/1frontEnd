<template>
	<view class="page-container">
		<view class="page-content">
			<!-- navBar -->
			<uni-navbar :isBack="true" title="code">
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
			<view class="navList-wrap">
				<uni-navList :parentValue="navList"></uni-navList>
			</view>
		</view>
	</view>
</template>

<script>
	const navList = [{
		label: 'upload',
		path: '/pages/code/form/upload'
	}, {
		label: 'emptyVerify',
		path: '/pages/code/form/emptyVerify'
	}, {
		label: 'idVerify',
		path: '/pages/code/form/idVerify'
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
