<template>
	<view class="page-container">
		<view class="page-content">
			<br />
			<view v-for="(it,idx) in rows" :key="it">
				<view class="space"></view>
				<scroll-view class="btn-scroll" scroll-x="true">
					<view class="btn-wrap" v-for="(item,index) in parentValue" :key="item.path">
						<u-button v-if="index > (idx*6 - 1) && index < (idx+1)*6" type="primary"
							@click="onRoute(item.path)">{{item.label}}</u-button>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	const parentValue = [{
		label: '组件',
		path: '/pages/components/components'
	}, {
		label: '代码',
		path: '/pages/code/code'
	}]

	export default {
		props: {
			type: { // 标识识别
				type: String,
				default: 'normal'
			},
			parentValue: { // 父组件传值
				type: Array,
				default: () => parentValue
			}
		},
		data() {
			return {
				current: 0, // 当前index
				rows: 0 // 多少行
			}
		},
		// created() {
		// 	this.rows = this.parentValue.length % 6 ? (parseInt(this.parentValue.length / 6) + 1) : this.parentValue
		// 		.length / 6
		// },
		watch: {
			parentValue: {
				handler(newVal, oldVal) {
					this.rows = newVal.length % 6 ? (parseInt(newVal.length / 6) + 1) : newVal.length / 6
					console.log(this.rows)
				},
				immediate: true
			}
		},
		methods: {
			// tabs切换
			handleChange(index) {
				this.current = index
				this.onMixRouter(this.parentValue[index].path)
			},
			// 路由跳转
			onRoute(path) {
				this.$u.route(path)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-content {
		.btn-scroll {
			white-space: nowrap;

			.btn-wrap {
				display: inline-block;
				padding: 0 10rpx;
			}
		}

	}
</style>
