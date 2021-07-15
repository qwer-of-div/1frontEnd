<template>
	<view class="page-container">
		<view class="page-content">
			<view class="space"></view>
			<!-- navBar -->
			<uni-navbar :isBack="true" title="pay">
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
			<view class="btn-wrap">
				<u-button type="primary" @click="onJsDom('first')">jsDom</u-button>
				<view class="space"></view>
				<u-button type="primary" @click="onJsDom('second')">jsDom-picker</u-button>
				<view class="space"></view>
				<u-button type="primary" @click="onJsDom('firstDate')">jsDom-date</u-button>
				<view class="space"></view>
				<u-button type="primary" @click="onJsDom('secondDate')">jsDom-date-second</u-button>
			</view>
			<view class="js-dom">
				<!-- 弹窗模板 -->
				<uni-picker ref="elPicker"></uni-picker>
				<uni-date ref="elDate"></uni-date>
			</view>
		</view>
	</view>
</template>

<script>
	const option = {
		// type
		first: {
			show: true,
			title: 'picker组件使用',
			selectorObj: [{
					label: 'one',
					id: 1
				},
				{
					label: 'two',
					id: 2
				}
			]
		},
		second: {
			show: true,
			title: 'picker组件重复使用',
			selectorObj: [{
					label: '一',
					id: 1
				},
				{
					label: '二',
					id: 2
				}
			]
		}
	}
	
	const optionDate = {
		firstDate: {
			show: true,
			title: 'first日期', //标题
			startYear: '2001',
			endYear: '2031'
		},
		secondDate: {
			show: true,
			title: 'second日期', //标题
			startYear: '2002',
			endYear: '2032'
		}
	}
	
	export default {
		data() {
			return {
				picker: {
					// type
					first: 0,
					second: 0
				},
				datePicker: {
					firstDate: '2021-01-01',
					secondDate: '2021-01-02'
				}
			}
		},
		methods: {
			onJsDom(type) {
				this.mixType = type
				if (['first', 'second'].includes(type)) {
					this.$refs.elPicker.show({
						...option[type],
						index: [this.picker[type]],
						onConfirm: (index) => {
							this.picker[type] = index
							console.log(index, '已点击index')
						},
						onCancel: () => {
							console.log('点击取消')
						}
					})
					return
				}
				this.$refs.elDate.show({
					...optionDate[type],
					defaultTime: this.datePicker[type],
					onConfirm: (date) => {
						this.datePicker[type] = `${date.year}-${date.month}-${date.day}`
						console.log(date, 'date已点击')
					},
					onCancel: () => {
						console.log('date点击取消')
					}
				})
			}
		}
	}
</script>

<style>

</style>
