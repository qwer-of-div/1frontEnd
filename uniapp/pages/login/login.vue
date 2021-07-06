<template>
	<view class="page-container">
		<view class="page-content">
			<!-- navBar -->
			<uni-navbar :isBack="true" title="login">
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
				<u-button type="primary" @click="onLogin('1')">用户1登录</u-button>
				<br />
				<u-button type="primary" @click="onLogin('2')">用户2登录</u-button>
				<br />
				<u-button type="primary" @click="onLogin('userCloud1')">用户1云登录</u-button>
				<br />
				<u-button type="primary" @click="onLogin('userCloud2')">用户2云登录</u-button>
				<br />
				<u-button type="primary" @click="$u.route('/pages/menu/menu')">不登录</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 登录 async await 正确才会执行下方语句
			async onLogin(type) {
				if (['1','2'].includes(type)) {
					this.mixApiParams = { username: `管理员${type}`, password: '123456', type }
					      const res = await this.$u.api.login(this.mixApiParams)
						  console.log(res,'请求返回')
						  this.$u.route('/pages/menu/menu')
					return
				}
				if (type === 'userCloud1') {
					return
				}
				if (type === 'userCloud2') {
				}
			}
		}
	}
</script>

<style>

</style>
