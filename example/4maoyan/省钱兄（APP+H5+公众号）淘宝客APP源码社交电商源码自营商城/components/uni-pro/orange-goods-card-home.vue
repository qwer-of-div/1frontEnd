<template>
	<view>
		<view @click="open(itemid)" class="itemInfo1" v-bind:key='itemid'>
			<view style="position: relative">
				<image :src="itempic" style="border-radius: 10upx;width: 100%;height: 400upx"></image>
			</view>
			<view>
				<!-- <view class="dianpu">店铺</view> -->
				<view style="display: flex">
					<image v-if="logo != null" style="margin-left:8upx;height: 28upx;width: 6%;margin-top: 8upx;margin-right: 4upx"
					 :src="logo" mode="aspectFit"></image>
					<view class="twolist-hidden" style="height: 80upx;font-size: 28upx;margin-right: 4upx;margin-left: 4upx;width: 95%;max-lines:2;overflow: hidden">
						{{ itemtitle }}
					</view>
				</view>

				<view>
					<view v-if="isEnable!='否'" style="display: flex;color: white;margin-left: 16px;font-size: 20upx;margin-top: 8upx;">
						<view style="background: #e10a07;padding: 4upx 8upx 4upx 8upx;">预估返￥{{ tkmoney }}</view>
						<view style="background: #FF927C;margin-left: 12upx;padding: 4upx 8upx 4upx 8upx;" v-if="tkmoneys != tkmoney">升级返￥{{ tkmoneys }}</view>
					</view>
					<view style="margin-top: 2px;display: flex">
						<view style="display: flex;width: 42%;margin-left: 12upx;">
							<!--  #ifndef APP-PLUS -->
							<view style="margin-bottom: 8upx;font-size: 20upx;color: grey;margin-left: 20upx">
								<view style="text-align: center;text-decoration:line-through;margin-top: 10upx">{{ itemprice }}</view>
							</view>
							<!--  #endif -->
							<!--  #ifdef APP-PLUS -->
							<view style="margin-bottom: 8upx;font-size: 20upx;color: grey;margin-left: 20upx">
								<view style="text-align: center;text-decoration:line-through;margin-top: 10upx">{{ itemprice }}</view>
							</view>
							<!--  #endif -->
						</view>
						<!--  #ifndef APP-PLUS -->
						<view style="width: 40%;font-size: 24upx;margin-top: 8upx;margin-left:16upx;color: grey; text-overflow: ellipsis;overflow: hidden">{{ itemsale }}</view>
						<!--  #endif -->
						<!--  #ifdef APP-PLUS -->
						<view style="width: 40%;font-size: 22upx;margin-top: 8upx;margin-left:12upx;color: grey; text-overflow: ellipsis;overflow: hidden">{{ itemsale }}</view>
						<!--  #endif -->
					</view>

					<view style="display: flex;margin-left: 12upx;">
						<!--  #ifndef APP-PLUS -->
						<view style="width: 40%;margin-bottom: 8upx;margin-left: 20upx;font-size: 32upx;color: #FF563A;padding-top: 4upx;text-align: left;">
							<text style="font-size: 20upx;margin-right: 4upx">¥</text>
							<text style="text-align: left;font-weight: bold">{{ itemendprice }}</text>
						</view>
						<!--  #endif -->
						<!--  #ifdef APP-PLUS -->
						<view style="width: 40%;margin-bottom: 4upx;margin-left: 16upx;font-size: 28upx;color: #FF563A;padding-top: 4upx;text-align: left;">
							<text style="font-size: 20upx;margin-right: 4upx">¥</text>
							<text style="text-align: left;font-weight: bold">{{ itemendprice }}</text>
						</view>
						<!--  #endif -->
						<!--  #ifdef APP-PLUS -->
						<view style="width: 60%;text-align: center;margin-bottom: 8upx;margin-left: 16upx">
							<view style="width: 80%;font-size: 24upx;text-align: center;background-image: url(../../static/img/home/youhuiquan.png);background-repeat: round;height: 44upx;padding-top:4upx;color: white;padding-left: 16upx;padding-right: 16upx">
								{{ couponmoney }}元券
							</view>
						</view>
						<!--  #endif -->
						<!--  #ifndef APP-PLUS -->
						<view style="width: 60%;text-align: center;margin-bottom: 8upx;margin-left: 16upx">
							<view style="width: 80%;font-size: 28upx;text-align: center;background-image: url(../../static/img/home/youhuiquan.png);background-repeat: round;height: 44upx;color: white;padding-left: 16upx;padding-right: 16upx">
								{{ couponmoney }}元券
							</view>
						</view>
						<!--  #endif -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'orange-goods-card',
		props: ['isEnable', 'itempic', 'itemtitle', 'tkmoneys', 'itemprice', 'itemsale', 'itemendprice', 'couponmoney',
			'itemid', 'logo',
			'index', 'tkmoney', 'isInvitation'
		],

		methods: {

			open(itemid) {
				if (this.logo == '../../static/img/maos.png') {
					this.$emit("success", this.itemid)
				} else if(this.logo == '../../static/img/jd.png'){
					this.$emit("success", this.index)
				} else{
					let relation_id = this.$queue.getData('relation_id');
					if (relation_id) {
						if (this.logo == '../../static/img/pinduoduo.png') {
							uni.navigateTo({
								url: '/pages/detail/pdd?itemid=' + itemid + '&relation_id=' + relation_id
							});
						} else if (this.logo == '../../static/img/jd.png') {
							uni.navigateTo({
								url: '/pages/detail/jd?itemid=' + itemid + '&relation_id=' + relation_id
							});
						} else {
							uni.navigateTo({
								url: '/pages/detail/goodsinfo?itemid=' + itemid + '&relation_id=' + relation_id
							});
						}

					} else {
						if (this.logo == '../../static/img/pinduoduo.png') {
							uni.navigateTo({
								url: '/pages/detail/pdd?itemid=' + itemid
							});

						} else if (this.logo == '../../static/img/jd.png') {
							uni.navigateTo({
								url: '/pages/detail/jd?itemid=' + itemid
							});
						} else {
							uni.navigateTo({
								url: '/pages/detail/goodsinfo?itemid=' + itemid
							});
						}

					}
				}

			}
		}
	};
</script>

<style>
	.dianpu {
		background: rgba(0, 0, 0, 0.1);
		color: #333333;
		position: absolute;
		margin-top: -38upx;
		width: 49%;
		padding-left: 8upx;
	}

	.itemInfo1 {
		float: left;
		width: 49%;
		border-radius: 20upx;
		background-color: #fff;
		margin-top: 16upx;
		padding-bottom: 8upx;
		margin-right: 6upx;
		box-shadow: 2upx 0 2upx 2upx rgba(0, 0, 0, 0.1);
	}

	.quan {
		z-index: 1;
		zoom: 1;
		top: 0;
		overflow: hidden;
		float: right;
		background: -moz-linear-gradient(left, #e10a07 0, #ff927c 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #e10a07), color-stop(100%, #ff927c));
		background: -webkit-linear-gradient(left, #e10a07 0, #ff927c 100%);
		background: -o-linear-gradient(left, #e10a07 0, #ff927c 100%);
		background: -ms-linear-gradient(left, #e10a07 0, #ff927c 100%);
		background: linear-gradient(to left, #e10a07 0, #ff927c 100%);
		position: relative;
		font-style: normal;
		display: block;
		border-radius: 3px;
		-moz-border-radius: 3px;
		-webkit-border-radius: 3px;
		-o-border-radius: 3px;
		-ms-border-radius: 3px;
		font-size: 14px;
		margin-left: 10px;
		min-width: 20px;
		text-align: center;
		padding: 1px 10px;
		margin-bottom: 4px;
		color: #fff;
	}

	.quan:before {
		position: absolute;
		z-index: 1;
		zoom: 1;
		top: 50%;
		margin-top: -3px;
		background: #fff;
		display: block;
		width: 5px;
		height: 5px;
		content: '';
		border-radius: 10px;
		border: 1px solid #fff;
		left: auto;
		right: -4px;
	}

	.quan:after {
		position: absolute;
		z-index: 1;
		zoom: 1;
		top: 50%;
		margin-top: -3px;
		background: #fff;
		display: block;
		width: 5px;
		height: 5px;
		content: '';
		border-radius: 10px;
		border: 1px solid #fff;
		left: -4px;
	}

	.twolist-hidden {
		max-height: 40px;
		color: #333;
		font-weight: 400;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
