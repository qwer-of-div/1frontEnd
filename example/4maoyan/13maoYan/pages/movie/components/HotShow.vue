<template>
	<view class="page-container">
		<view class="page-content">
			<view class="praise part-bg">
				<text class="title">最受好评电影</text>
				<scroll-view scroll-x="true" class="scroll-x">
					<view class="scroll-item" v-for="item in praiseList " :key="item.id" :id="item.id" >
						<view class="img-box relative">
							<image :src="item.img" mode=""></image>
							<text class="score">观众评分 {{item.sc}}</text>
						</view>
						<text class="desc">{{item.nm}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="movie-list part-bg">
				<view class="item flex" v-for="item in movieList" :key="item.id" @tap="onItemTap(item.id)">
				<image :src="item.img" mode=""></image>
				<view class="flex1 flex">
				<view class="desc flex7">
					<view class="name-box">
						<text class="name">{{item.nm}}</text>
					</view>
					<text class="score-box" v-if="item.sc">
						观众评 <text class="score">{{' ' + item.sc}}</text>
					</text>
					<text class="score-box" v-else>
						暂无评分
					</text>
					<text class="star" v-if="item.star">主演：{{item.star}}</text>
					<text class="showInfo">{{item.showInfo}}</text>
				</view>
				<button class="flex1" type="default" v-if="item.sc">购票</button>
				<button class="flex1 presell" type="default" v-else>预售</button>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				praiseList: [],	// 好评列表
				movieList: [],	// 电影列表
				movieIdList: [] // 所有电影id列表
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				this.apigetmovieOnInfoList()
				this.$emit('fromChild', this.apigetmoreComingList)
			},
			// item 点击
			onItemTap (id) {
				uni.navigateTo({
				    url: `/pages/movieCinema/movieCinema?id=${id}`
				});
			},
			
			// api
			// 好评电影
			apigetmovieOnInfoList () {
				this.praiseList = []
				this.movieList = []	
				this.movieIdList = []
				this.$api.api.getmovieOnInfoList().then(res => {
					let resData = res.data
					this.praiseList = resData.movieList.map( item => {
						return {
							...item,
							img: item.img.replace('/w.h', '')
						}
					})
					this.movieList = JSON.parse(JSON.stringify(this.praiseList))
					this.movieIdList = resData.movieIds
					this.movieIdList = this.movieIdList.slice(this.movieIdList.indexOf(this.movieList[this.movieList.length - 1].id) + 1) // 删除已有电影id
				})
			},
			// 电影列表
			apigetmoreComingList () {
				let tempList = []
				let movieIds = ''
				if(this.movieIdList.length >= 10) {		// 参数获取
					tempList = this.movieIdList.slice(0,10)
					movieIds = tempList.join(',')
					this.movieIdList = this.movieIdList.slice(10)
				} else {
					tempList = this.movieIdList
					movieIds = tempList.join(',')
					this.movieIdList = []
				}
				this.$api.api.getmoreComingList({movieIds}).then(res => {
					let resData = res.data
					resData.coming.forEach(item => {
						item.img = item.img.replace('/w.h', '')
						this.movieList.push(item)
					})
				})
			}
				
		}
	}
</script>

<style lang="scss" scoped>
	.praise {
		padding: 20rpx 30rpx;
		.title {
			display: block;
			padding-bottom: 10rpx;
			color: #333;
		}
	}
	.scroll-x {
		width: 100%;
		white-space: nowrap; // 滚动必须加的属性
		.scroll-item {
			display: inline-block;
			padding: 10rpx;
			width: 25%;
			font-weight: 700;
			.img-box {
				width: 100%;
				image {
					width: 100%;
					height: 250rpx;
				}
			}
			.desc {
				display: block;
				width: 100%;
				color: #000;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.score {
				position: absolute;
				left: 0;
				bottom: 0;
				color: #E7A301;
			}
		}
	}
	.movie-list {
		margin-top: 20rpx;
		.item {
			>image {
				width: 20%;
				height: 200rpx;
				padding: 30rpx;
				padding-right: 20rpx;
			}
			.flex1 {
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;
				padding-left: 0;
				border-bottom: 1px solid #ccc;
				button {
					padding: 15rpx;
					font-size: 26rpx;
					line-height: 26rpx;
					color: #fff;
					border-radius: 10rpx;
					background-color: #E54847;
				}
				.presell {
					background-color: #3C9FE6;
				}
			}
			.desc {
				padding-right: 30rpx;
				font-size: 24rpx;
				line-height: 40rpx;
				>text {
					display: block;
				}
				.name {
					font-size: 35rpx;
					font-weight: 700;
					color: #333;
				}
				.score {
					font-weight: 700;
					color: #FAAF00;
					white-space: pre-wrap;
				}
				.star {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}
</style>
