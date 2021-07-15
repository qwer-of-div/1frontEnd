<template>
	<view>
		<view class="picker-wrap">
			<u-picker mode="time" v-model="option.show" :title="option.title" :default-time="option.defaultTime" :start-year="option.startYear" :end-year="option.endYear" @confirm="onConfirm" @cancel="onCancel"></u-picker>
		</view>
	</view>
</template>

<script>
	
	const optionDefault = {
		show: false,
		title: '日期', //标题
		defaultTime: '2025-07-02',
		startYear: '2000',
		endYear: '2030'
	}
	export default {
		data() {
			return {
				option: {
					show: false,
					title: '', //标题
					defaultTime: '',
					startYear: '1900',
					endYear: '2030'
				},
				timer: null
			}
		},
		methods: {
			// 显示弹窗事件（处理传参）
			show(option) {
				this.option = {...optionDefault,...option,show: true}
				// 自动关闭
				// if (this.opts.time) {
				// 	this.timer = setTimeout(() => {
				// 		this.close()
				// 	}, this.opts.time * 1000)
				// }
			},
			onConfirm(date) {
				this.option.onConfirm(date)
			},
			onCancel() {
				this.option.onCancel()
			}
		}
	}
</script>

<style lang="scss">
	.unipop__ui_panel {
		background-color: #69f;
	}
</style>
