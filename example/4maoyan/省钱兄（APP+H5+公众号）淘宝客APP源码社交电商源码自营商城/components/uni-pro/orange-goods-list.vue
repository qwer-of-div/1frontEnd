<template>

	<view class="coupon-page s-row" @tap="open(itemid)" v-bind:key='itemid' style="margin:16upx 16upx 8upx 16upx;background: white;border-radius: 32upx;">
		<view class="image">
			<image :src="itempic"></image>
		</view>
		<view class="content">
			<view style="display: flex">
				<image v-if="logo!=null" style="margin-left:8upx;height: 24upx;width: 5%;margin-top: 8upx;margin-right: 4upx" :src="logo"></image>
				<view class="twolist-hidden" style="height: 80upx;font-size: 28upx;margin-right:4upx;margin-left: 2px;width: 95%;max-lines:2;overflow: hidden">
					{{ itemtitle }}
				</view>
			</view>
			<view v-if="isEnable!='否'" style="display: flex;color: white;margin-left: 32upx;font-size: 24upx;margin-top: 8upx;">
				<view style="background: #e10a07;padding: 4upx 12upx 4upx 12upx;">预估返￥{{ tkmoney }}</view>
				<view style="background: #FF927C;margin-left: 20upx;padding: 4upx 12upx 4upx 12upx;" v-if="tkmoneys!=tkmoney">升级返￥{{ tkmoneys }}</view>
			</view>
			<view class="num s-row" style="font-size: 24upx;margin-top: -6px;margin-left: 28upx;margin-right: 32upx;">
				<text class="tmprice">{{itemprice}}</text>
				<text class="volume">{{itemsale}}</text>
			</view>
			<view class="money s-row" style="margin-left: 28upx">
				<text class="coupon-price">券后价
					<text style="font-size: 24upx">¥<text style="font-weight: bold">{{itemendprice}}</text></text>
				</text>

				<text class="quan" v-if="couponmoney!=null" style="font-size: 28upx;">
					<i></i>{{couponmoney}}元券<i></i>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "orange-goods-list",
		props: [
			'isEnable', "itempic", "tkmoneys", "itemtitle", "itemprice", "itemsale", "itemendprice", "couponmoney", "itemid",
			"logo", "tkmoney", "isInvitation"
		],

		methods: {
			open(itemid) {
				let relation_id = this.$queue.getData("relation_id");
				if (relation_id) {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + itemid + "&relation_id=" + relation_id,
					})
				} else {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + itemid,
					})
				}
			},
		}
	}
</script>

<style>
	@import "../../static/css/index.css";
</style>
