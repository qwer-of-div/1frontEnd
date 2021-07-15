<template>
	<view>
		<view class="picker-wrap">
			<u-picker mode="selector" v-model="option.show" :title="option.title"  :default-selector="option.index" :range="option.selectorObj" range-key="label" @confirm="onConfirm" @cancel="onCancel"></u-picker>
		</view>
	</view>
</template>

<script>
	// col date area singlePop doublePop
	
	const optionDefault = {
		show: false,
		title: 'picker组件', //标题
		selectorObj: []
	}
	export default {
		data() {
			return {
				option: {
					show: false,
					title: '', //标题
					index: [0], // 数组
					selectorObj: []
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
			onConfirm(index) {
				this.option.onConfirm(...index)
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
