<template>
	<view>
		<view class="header-box">
			<uni-myheader></uni-myheader>
		</view>
		<view class="movie-wrap relative flex">
			<image :src="movie.img" class="image"></image>
			<view class="info flex-col flex1">
				<text class="name">{{movie.nm}}</text>
				<text class="enm">{{movie.enm}}</text>
				<text class="sc" v-if="movie.sc">
					<text class="score">{{movie.sc + ' '}}</text>
					<text class="snum">({{movie.snum}}万人评)</text>
				</text>
				<text class="wish" v-else>
					{{movie.wish}}人想看
				</text>
				<text class="cat">{{movie.cat}}</text>
				<text class="src">
					<text class="src">{{movie.src}}/</text>
					<text class="episodeDur">{{movie.episodeDur}}分钟</text>
				</text>
				<text class="pubDesc">{{movie.pubDesc}}</text>
			</view>
			<view class="movie-bg" :style="{'backgroundImage': 'url(' + movie.img + ')'}"></view>
			<view class="icon-wrap">
				<uni-icons type="arrowright" size="22" color="#fff"></uni-icons>
			</view>
		</view>
		<view class="cinema">
			<scroll-view class="scroll-x" scroll-x="true">
				<view id="demo1" class="">A</view>
				<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
				<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movie: {	
					id: '',			// 电影id
					nm: '',			// 名字
					enm: '', 		// 英文名
					img: '', 		// 图片
					sc: '', 		// 评分
					snum: '', 		// 评价人数
					wish: '', 		// 想看人数
					cat: '', 		// 类别
					src: '', 		// 上映地
					episodeDur: '', // 时长
					pubDesc: '', 	// 上映时间
				}
			};
		},
		onLoad (option) {
			this.movie.id = option.id
			this.init()
		},
		methods: {
			init () {
				this.apigetdetailmovie()
				this.getmovie()
			},
			// api
			// 影院电影信息
			apigetdetailmovie () {
				this.$api.api.getdetailmovie({movieId:this.movie.id}).then(res => {
					let resData = res.data.detailMovie
					this.movie.nm = resData.nm
					this.movie.enm = resData.enm
					this.movie.img = resData.img.replace('/w.h', '')	// 图片处理
					this.movie.sc = resData.sc	
					let tampSnum = resData.snum.toString().split('')	// 评价人数处理
					tampSnum.splice(-4,0,'.')
					let tampSnum1 = tampSnum.join('')
					this.movie.snum = (tampSnum1 * 1).toFixed(1)
					this.movie.wish = resData.wish
					console.log(this.movie.wish,999)
					this.movie.cat = resData.cat
					this.movie.src = resData.src
					this.movie.episodeDur = resData.episodeDur
					this.movie.pubDesc = resData.pubDesc
				})
			},
			// 影院 当天电影信息
			getmovie () {
				this.$api.api.getmovie({movieId: '346210', cityId: '59', day: '2020-09-14'}).then(res => {
					let resData = res.data
					console.log(resData,888)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.movie-wrap {
	padding: 30rpx;
	.movie-bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		filter:blur(25px) brightness(0.5);
		background-size: cover;
		background-repeat: no-repeat;
	}
	.image {
		width: 230rpx;
		height: 300rpx;
	}
	.info {
		box-sizing: border-box;
		padding-left: 20rpx;
		line-height: 50rpx;
		color: #bbb;
		.name {
			font-size: 40rpx;
			font-weight: 700;
			color: #fff;
		}
		.enm {
			// width: 90%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.sc {
			font-weight: 700;
			.score {
				font-size: 35rpx;
				color: #FFCC00;
			}
		}
		.wish {
			color: #FFCC00;
		}
	}
	.icon-wrap {
		position: absolute;
		top: 50%;
		right: 30rpx;
		transform: translateY(-50%);
	}
}

.scroll-item {
	
}
</style>
