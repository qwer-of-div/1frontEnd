<template>
	<view class="page-container">
		<view class="page-content">
			<!-- navBar -->
			<uni-navbar :customBack.sync="navBar.customBack" :isBack="true" title="menu">
				<template slot="right">
					<view class="message-box right-item">
						<u-icon name="chat" size="38"></u-icon>
						<u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
					</view>
					<view class="dot-box right-item" @click="count++">
						<u-icon name="calendar-fill" size="38"></u-icon>
						<u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
					</view>
				</template>
			</uni-navbar>
			<br/>
			<view class="btn-wrap">
				<u-button type="primary" @click="onMixRouter('','navigateBack')">返回</u-button>
			</view>
			<uni-navList></uni-navList>
			<br/>
			<br/>
			<view class="example-btn" v-if="count > 5">
				<u-button type="primary" @click="$u.route('/pages/example/example')">测试模块</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 0,
				navBar: {
					customBack: 'menu'
				}
			}
		},
		watch: {
			'navBar.customBack': {
				handler() {
					console.log('公共组件单独方法')
				}
			}
		},
		onLoad() {
			console.log(this.$g,this.$input,this.$res,'g，模拟输入，模拟返回')
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
