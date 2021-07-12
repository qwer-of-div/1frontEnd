<template>
	<view class="page-container">
		<view class="page-content flex">
			<view  type="default" v-for="(item,index) in parentValue" :class="['relative','li',{'active-li':index === active}]" :key="item.value" @tap="onNavChoose(item,index)">{{item.label}}
			<view :class="['mark']"></view>
			</view>
		</view>
	</view>
</template>

<script>
	
	let parentValue = [
		{ label: "热映", value:"reying" },
		{ label: "影院", value:"yingyuan" },
		{ label: "待映", value:"daiying" },
		{ label: "经典电影", value:"jingdian" },
	]
	
	export default {
		props: {
			parentValue: {
				type: Array,
				default: () => { return parentValue }
			}
		},
		data() {
			return {
				active: 0	// 激活的index
			};
		},
		methods: {
			// 导航选择
			onNavChoose (item, index) {
				this.active = index
				this.$emit('fromChild', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-content {
	background-color: #fff;
	text-align: center;
	.li {
		flex: 1;
		padding: 10rpx;
		font-size: 30rpx;
		font-weight: 700;
		color: #555;
		  //消除默认点击蓝色边框效果
		&:last-of-type {
			flex: 2;
		}
		.mark {
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 50%;
			height: 5rpx;
			transform: translateX(-50%);
			opacity: 0;
			background-color: red;
		}
	}
	.active-li {
		font-size: 32rpx;
		.mark {
			opacity: 1;
		}
	}
}
</style>
