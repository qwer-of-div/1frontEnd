<template>
	<view class="container">
		<view class="user-section">
			<view class="bg"></view>
			<view class="user-info-box">
				<view style="width: 20%" class="portrait-box" @click="goLogin">
					<image class="portrait" :src="image_url"></image>
				</view>
				<view style="width: 50%;text-align: left;margin-left: 6px">
					<view class="info-box" @click="goLogin" style="margin-top: 8px">
						<text v-if="relation_id" class="username" style="color: #f7d680">{{mobile}}</text>
						<text v-else="mobile" class="username">{{mobile?mobile:'游客'}}</text>
					</view>
				</view>
				<view v-if="relation_id" style="text-align: center;margin-right:10px;margin-top: 8px;width: 30%">
					<view style="color: #f7d680;margin-bottom: 6px">
						<text style="font-size: 12px">￥</text>
						<text style="font-size: 22px;margin-left: 2px">{{moneys}}</text>
					</view>
					<view @click="getMoneys" style="font-size: 12px;color:#36343c;background: #f7d680;padding: 2px 10px;border-radius: 12px">
						立即提现
					</view>
				</view>
			</view>
			<view class="vip-card-box">
				<view v-if="isEnable!='否'" class="b-btn" @click="copyTklWenAn">
					{{des}}
				</view>
				<view class="tit" v-if="!relation_id">
					<text class="yticon icon-iLinkapp-" style="margin-right: 2px;"></text>
					会员购买商品享省钱+返现
				</view>
				<view class="tit" v-else>
					VIP {{dengji}}
					<text style="margin-left: 12px">{{dengjides}}</text>
					<text @click="shengJiMethod" v-if="grade!='0.7'&&isEnable!='否'" style="font-size: 12px;margin-left: 8px;color:#36343c;background: #f7d680;padding: 2px 10px;border-radius: 12px">
						升级
					</text>
				</view>
			</view>
		</view>

		<view class="cover-container">
			<view style="background: white;border-radius: 8px">
				<list-cell icon="icon-iLinkapp-" iconColor="#e10a07" title="全部订单明细" @eventClick="navToLogins('/pages/order/order?state=0')"></list-cell>
				<image class="arc" src="/static/arc.png"></image>
				<view class="tj-sction" style="margin-top: -8px">
					<view class="tj-item" @click="shangyueyugu()">
						<text class="num">{{lastjiesuan}} 元</text>
						<text>上月预估</text>
					</view>
					<view class="tj-item" @click="benyuejiesuan()">
						<text class="num">{{jiesuan}} 元</text>
						<text>本月结算</text>
					</view>
					<view class="tj-item" @click="benyuefukuan()">
						<text class="num">{{moneyAll}} 元</text>
						<text>本月付款</text>
					</view>
					<view class="tj-item" @click="jinridingdan()">
						<text class="num">{{orderNum}} 笔</text>
						<text>今日订单</text>
					</view>
					<!--                淘客订单状态，12-付款，13-关闭，14-确认收货，3-结算成功;不传，表示所有状态-->
				</view>
			</view>
			<view style="color: grey;font-size: 12px;margin-top:8px;text-align: center" v-if="isEnable!='否'">
				每个月25号结算【上月预估】金额，建议26号进行提现
				<text class="yticon icon-xiaoxi" style="margin-left: 8px" @click="showMessage"></text>
			</view>
			<view class="history-section icon">
				<!-- <view class="sec-header" @click="navTo('/pages/footer/index')">
					<text class="yticon icon-lishijilu"></text>
					<text>浏览历史</text>
				</view>
				<scroll-view scroll-x class="h-list">
					<text v-for="(item,index) in couponlist" :key="index">
						<image @click="navToOrder(item.itemid)" :src="item.itempic+'_310x310.jpg'" mode="aspectFill"></image>
					</text>
				</scroll-view> -->

				<list-cell icon="icon-lishijilu" iconColor="#5eba8f" title="浏览历史" @eventClick="navTo('/pages/footer/index')"></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏" @eventClick="navTo('/pages/footer/like')"></list-cell>
				<view v-if="isEnable!='否'">
					<list-cell icon="icon-tuandui" iconColor="#f7d680" title="推广中心" @eventClick="navToLogins('/pages/member/yao')"
					 tips="邀好友拿高佣"></list-cell>
				</view>
				<list-cell icon="icon-iconfontweixin" iconColor="#9789f7" title="帐号安全" @eventClick="navToLogin('/pages/member/account')"></list-cell>

				<list-cell icon="icon-bangzhu1" iconColor="#FF3333" title="联系客服" @eventClick="navTo('/pages/member/customer')"></list-cell>

				<list-cell icon="icon-xiaoxi" iconColor="#00ff7f" title="意见反馈" @eventClick="navTo('/pages/feedback')"></list-cell>


				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置中心" border="" @eventClick="navTo('/pages/set/set')"></list-cell>

			</view>
		</view>

	</view>
</template>
<script>
	import listCell from '../../components/mix-list-cell';
	import wmPosters from '@/components/wm-poster/wm-posters.vue';
	export default {
		components: {
			listCell,
			wmPosters
		},
		data() {
			return {
				modalName: '',
				couponlist: [],
				des: '会员申请',
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				mobile: '',
				relation_id: '',
				jifen: '0',
				image_url: '/static/logo.png',
				gender: '',
				moneyAll: '0',
				moneys: '0',
				jiesuan: '0',
				grade: '',
				phone: '',
				dengji: 0,
				dengjides: '',
				lastjiesuan: '0',
				lastMoneyAll: '0',
				orderNum: '0',
				orderMonthNum: '0',
				totalMoney: '0',
				isInvitation: 0,
				moving: false,
				isEnable: "否",
				itemendprice: '识别二维码免费领取',
				itemtitle: '',
				itemprice: '',
				erweima: "",
				itempic: '',
				footprintKey: 'orange-sqx-footprint',
			}
		},

		onLoad() {
			let a = this.$queue.getData("isEnable")
			if (a) {
				this.isEnable = a;
			}
			let userId = this.$queue.getData("userId");
			if (userId) {
				this.getUserInfo(userId)
			}
			this.itempic = this.$queue.getData('itempic');
			this.itemtitle = this.$queue.getData('itemtitle');
			if (!this.$queue.getData('itemtitle')) {
				this.itemtitle = '漫花原木纸巾抽纸家用整箱实惠装餐巾纸卫生纸面巾纸抽婴儿擦手纸';
			}
			if (!this.$queue.getData('itempic')) {
				this.itempic = 'https://img.alicdn.com/imgextra/i3/2930255252/O1CN0159ouF21ofSiQ3kPq2_!!2930255252.jpg';
			}
			this.erweima = this.$queue.getData('erweimas');
			if (!this.$queue.getData('erweimas')) {
				this.erweima = this.$queue.publicYuMing() + '/erweimas.jpg';
			}
			//#ifdef H5
			if (window.location.href.indexOf("?invitation=") !== -1 || window.location.href.indexOf("&invitation=") !== -1) {
				if (window.location.href.indexOf("?invitation=") !== -1) {
					this.$queue.setData("relation", window.location.href.split("?invitation=")[1].split("&")[0])
				} else {
					this.invitation = window.location.href.split("&invitation=")[1].split("&")[0];
					this.$queue.setData("relation", window.location.href.split("&invitation=")[1].split("&")[0])
				}
			}
			//#endif
		},
		onShow() {
			let mobile = this.$queue.getData("nickName");
			this.phone = this.$queue.getData("mobile");
			let image_url = this.$queue.getData("image_url");
			let gender = this.$queue.getData("gender");

			if (mobile && mobile !== 'undefined') {
				this.mobile = mobile;
			} else {
				this.mobile = '';
			}
			if (image_url && image_url !== 'undefined') {
				this.image_url = image_url;
			} else {
				this.image_url = '/static/img/common/logo.jpg'
			}
			if (gender) {
				this.gender = gender;
			}
			let relation_id = this.$queue.getData("relation_id");
			if (relation_id && relation_id !== 'undefined') {
				this.des = '我的特权';
				this.relation_id = relation_id;
			} else {
				this.des = '会员申请';
				this.relation_id = '';
			}
			let userId = this.$queue.getData("userId");
			if (userId) {
				this.getMoney();
				this.getUserInfo(userId);
				this.couponlist = this.$queue.get(this.footprintKey);
				this.$Request.getT("/cash/money/" + userId).then(res => {
					if (res.status === 0 && res.data) {
						this.moneys = parseFloat(res.data).toFixed(0);
					} else {
						this.moneys = '0';
					}
				});
			} else {
				this.totalMoney = '0';
				this.orderNum = '0';
				this.moneys = '0';
				this.moneyAll = '0';
				this.lastjiesuan = '0';
				this.lastMoneyAll = '0';
				this.orderMonthNum = '0';
				this.jiesuan = '0';
				this.jifen = '0'
			}

		},

		methods: {
			//升级规则弹框
			shengJiMethod() {
			
				uni.navigateTo({
					url: '/pages/member/yao'
				})
			},
			//邀请码复制
			copyHref() {
				uni.setClipboardData({
					data: this.relation_id,
					success: (r => {
						this.$queue.showToast("邀请码复制成功")
					}),
				})
			},
			//获取用户信息
			getUserInfo(userId) {
				this.$Request.getT("/user/" + userId).then(res => {
					if (res.status === 0) {
						if (res.data.orderJifen) {
							this.jifen = parseFloat(res.data.orderJifen).toFixed(0);
						}
						this.$queue.setData("image_url", res.data.image_url);
						this.$queue.setData("relation_id", res.data.relationId);
						this.$queue.setData("nickName", res.data.nickName);
						this.$queue.setData("isInvitation", res.data.isInvitation);
						let grade = res.data.grade;
						if (grade == 0.3) {
							this.dengji = 0;
							this.dengjides = "还可升级10级";
						} else if (grade == 0.34) {
							this.dengji = 1;
							this.dengjides = "还可升级9级";
						} else if (grade == 0.38) {
							this.dengji = 2;
							this.dengjides = "还可升级8级";
						} else if (grade == 0.42) {
							this.dengji = 3;
							this.dengjides = "还可升级7级";
						} else if (grade == 0.46) {
							this.dengji = 4;
							this.dengjides = "还可升级6级";
						} else if (grade == 0.50) {
							this.dengji = 5;
							this.dengjides = "还可升级5级";
						} else if (grade == 0.54) {
							this.dengji = 6;
							this.dengjides = "还可升级4级";
						} else if (grade == 0.58) {
							this.dengji = 7;
							this.dengjides = "还可升级3级";
						} else if (grade == 0.62) {
							this.dengji = 8;
							this.dengjides = "还可升级2级";
						} else if (grade == 0.66) {
							this.dengji = 9;
							this.dengjides = "还可升级1级";
						} else if (grade == 0.7) {
							this.dengji = 10;
							this.dengjides = "已到达最高等级";
						} else {
							this.dengji = 0;
							this.dengjides = "无法识别当前等级";
						}
						this.grade = res.data.grade;
						this.isInvitation = res.data.isInvitation;
						this.$queue.setData("relation", res.data.invitation);
						this.$queue.setData("gender", parseInt(res.data.gender));
						this.gender = parseInt(res.data.gender);
						if (res.data.image_url) {
							this.image_url = res.data.image_url;
						} else {
							this.image_url = '/static/img/common/logo.jpg'
						}
						if (res.data.relationId) {
							this.relation_id = res.data.relationId;
							this.des = '我的特权';
						} else {
							this.relation_id = '';
							this.des = '会员申请';
						}
						if (res.data.nickName) {
							this.mobile = res.data.nickName;
						} else {
							this.mobile = res.data.phone;
						}
					} else {
						this.$queue.logout();
						uni.showModal({
							title: '用户信息提示',
							content: '本地用户信息失效需要重新授权登录',
							showCancel: false,
							success: (e) => {
								//#ifdef H5
								if (e.confirm) {
									window.location.reload();
								} else {
									window.location.reload();
								}
								//#endif
								//#ifndef H5
								this.navTo('/pages/public/login')
								//#endif
							},
						});
					}
				});
			},

			//会员申请弹框
			copyTklWenAn: function() {
				let relation_id = this.$queue.getData("relation_id");
				let token = this.$queue.getData("token");
				let userId = this.$queue.getData("userId");
				let gradle = this.$queue.getData("gradle");
				if (!token) {
					this.goLoginInfo();
				} else {
					if (!relation_id) {
						this.navTo('/pages/member/publisher?uid=' + userId + '&token=' + token)
					} else {
						if (gradle == '0.7') {
							uni.showModal({
								showCancel: false,
								title: '我的特权',
								content: '1、享受VIP ' + this.dengji +
									'级返现！\n2、购买商品可享受省钱 +返现！\n3、会员分享商品给好友购买拿返现金额！\n4、更多会员特权我们将陆续上线！\n\n注：VIP越高返现越高哦'
							});
						} else {
							uni.showModal({
								cancelText: '关闭',
								confirmText: '我要升级',
								showCancel: true,
								title: '我的特权',
								content: '1、享受VIP ' + this.dengji +
									'级返现！\n2、购买商品可享受省钱 +返现！\n3、会员分享商品给好友购买拿返现金额！\n4、更多会员特权我们将陆续上线！\n\n注：VIP越高返现越高哦',
								success: res => {
									if (res.confirm) {
										this.shengJiMethod();
									}
								}
							});
						}

					}
				}
			},
			//获取付款收入查询
			getMoney() {
				let that = this;
				let token = this.$queue.getData("token");
				let relation_id = this.$queue.getData("relation_id");
				if (token && relation_id && relation_id !== 'undefined') {
					//预估本月付款收入查询
					this.$Request.getT("/order/count?relation_id=" + relation_id + "&tk_status=12").then(res => {
						if (res.status === 0 && res.data) {
							that.moneyAll = parseFloat(res.data).toFixed(1);
						} else {
							that.moneyAll = '0';
						}
					});
					//预估本月结算查询
					this.$Request.getT("/order/count?relation_id=" + relation_id + "&tk_status=3").then(res => {
						if (res.status === 0 && res.data) {
							that.jiesuan = parseFloat(res.data).toFixed(1);
						} else {
							that.jiesuan = '0';
						}
					});

					//预估上月结算查询
					this.$Request.getT("/order/last/count?relation_id=" + relation_id + "&tk_status=3").then(res => {
						if (res.status === 0 && res.data) {
							that.lastjiesuan = parseFloat(res.data).toFixed(1);
						} else {
							that.lastjiesuan = '0';
						}
					});
					//可以提现金额查询预估收入查询


					//今日付款订单数
					this.$Request.getT("/order/paidCount/" + relation_id).then(res => {
						if (res.status === 0 && res.data) {
							that.orderNum = res.data;
						} else {
							that.orderNum = '0';
						}
					});


				} else {
					that.totalMoney = '0';
					that.orderNum = '0';
					that.moneys = '0';
					that.moneyAll = '0';
					that.lastjiesuan = '0';
					that.lastMoneyAll = '0';
					that.orderMonthNum = '0';
					that.jiesuan = '0';
				}

			},
			//立即提现
			getMoneys() {
				let token = this.$queue.getData("token");
				if (token) {
					this.navTo('/pages/member/cash');
				} else {
					this.goLoginInfo();
				}

			},
			//结算弹框
			showMessage() {
				uni.showModal({
					showCancel: false,
					title: '结算提示',
					content: '每个月25号结算上月【确认收货】的订单，结算完成后【可提现金额】才会同步更新金额。因结算订单量大，结算时间会较长，结算会在25号晚上完成，建议您26号进行提现。\n举例：5月份确认收货订单，6月25号才会进行结算，以此类推',
				});
			},
			//上月预估收入弹框
			shangyueyugu() {
				uni.showModal({
					showCancel: false,
					title: '上月预估收入说明',
					content: '上月【确认收货】订单的佣金收入\n本月25号结算',
				});
			},
			//积分说明弹框
			jifenDes() {
				uni.showModal({
					showCancel: false,
					title: '积分说明',
					content: '省钱兄中累计付款金额，积分到达一定数量可免费兑换商品',
				});
			},
			//本月结算收入弹框
			benyuejiesuan() {
				uni.showModal({
					showCancel: false,
					title: '本月结算收入说明',
					content: '本月【确认收货】订单的佣金收入\n下月25号结算',
				});
			},
			//本月付款收入说明弹框
			benyuefukuan() {
				uni.showModal({
					showCancel: false,
					title: '本月付款收入说明',
					content: '本月【已付款】订单的佣金收入\n用户付款未确认收货的订单\n部分也包括付款又退单的',
				});
			},
			//今日订单说明弹框
			jinridingdan() {
				showCancel: false,
				uni.showModal({
					title: '今日订单说明',
					content: '今日用户【已付款】的订单笔数',
				});
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				uni.navigateTo({
					url
				})

			},
			//订单详情跳转
			navToOrder(itemid) {
				let relation_id = this.$queue.getData("relation_id");
				if (relation_id && relation_id !== 'undefined') {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + itemid + "&relation_id=" + relation_id,
					})
				} else {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + itemid,
					})
				}
			},


			downApp() {
				let token = this.$queue.getData("token");
				if (token) {
					let userId = this.$queue.getData("userId");
					this.$Request.getT("/user/" + userId).then(res => {
						if (res.status === 0 && res.data.phone) {
							if (res.data.relationId) {
								uni.showModal({
									showCancel: false,
									title: '下载提示',
									confirmText: '立即安装',
									content: '客户端安装密码为123456',
									success: res => {
										if (res.confirm) {
											window.location.href = this.$queue.getAppDownUrl();
										}
									}
								});
							} else {
								uni.showModal({
									showCancel: true,
									title: '温馨提示',
									cancelText: '关闭',
									confirmText: '开通会员',
									content: '此功能为会员专享功能\n申请成为会员后可使用',
									success: res => {
										if (res.confirm) {
											this.copyTklWenAn();
										}
									}
								});
							}
						} else {
							uni.navigateTo({
								url: '/pages/public/mobile'
							})
						}
					});
				} else {
					this.goLoginInfo();
				}
			},

			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navToLogin(url) {
				let token = this.$queue.getData("token");
				let mobile = this.$queue.getData("mobile");
				let userId = this.$queue.getData("userId");
				if (token) {
					this.$Request.getT("/user/" + userId).then(res => {
						if (res.status === 0 && res.data.phone) {
							uni.navigateTo({
								url
							})
						} else {
							uni.navigateTo({
								url: '/pages/public/mobile'
							})
						}
					});
				} else {
					this.goLoginInfo();
				}
			},
			//统一登录跳转
			goLoginInfo() {
				this.$queue.setData("href", '/pages/member/user');
				//#ifdef H5
				uni.navigateTo({
					url: '/pages/member/register'
				});
				//#endif
				//#ifndef H5
				uni.navigateTo({
					url: '/pages/public/login'
				});
				//#endif
			},
			navToLogins(url) {
				let token = this.$queue.getData("token");
				if (token) {
					let relation_id = this.$queue.getData("relation_id");
					if (relation_id) {
						uni.navigateTo({
							url
						})
					} else {
						uni.showModal({
							showCancel: true,
							title: '温馨提示',
							cancelText: '关闭',
							confirmText: '开通会员',
							content: '此功能为会员专享功能\n申请成为会员后可使用',
							success: res => {
								if (res.confirm) {
									this.copyTklWenAn();
								}
							}
						});
					}
				} else {
					this.goLoginInfo();
				}

			},

			goLogin(url) {
				let token = this.$queue.getData("token");
				if (!token) {
					this.goLoginInfo();
				}

			},

		}
	}
</script>
<style lang='scss'>
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10px;
	}

	.tixian {
		background: -moz-linear-gradient(left, #F15B6C, #e10a07 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #F15B6C), color-stop(100%, #e10a07));
		background: -webkit-linear-gradient(left, #F15B6C 0, #e10a07 100%);
		background: -o-linear-gradient(left, #F15B6C 0, #e10a07 100%);
		background: -ms-linear-gradient(left, #F15B6C 0, #e10a07 100%);
		background: linear-gradient(to left, #F15B6C 0, #e10a07 100%);
	}

	.user-section {
		margin-top: -10px;
		height: 300px;
		padding: 50px 15px 0;
		position: relative;

		.bg {
			background: -moz-linear-gradient(left, #F15B6C, #e10a07 100%);
			background: -webkit-gradient(linear, left top, left right, color-stop(0, #F15B6C), color-stop(100%, #e10a07));
			background: -webkit-linear-gradient(left, #F15B6C 0, #e10a07 100%);
			background: -o-linear-gradient(left, #F15B6C 0, #e10a07 100%);
			background: -ms-linear-gradient(left, #F15B6C 0, #e10a07 100%);
			background: linear-gradient(to left, #F15B6C 0, #e10a07 100%);
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
		}
	}

	.user-info-box {
		height: 100px;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 70px;
			height: 70px;
			/*border: 5px solid #fff;*/
			border-radius: 50%;
		}

		.username {
			font-size: 16px;
			color: #f2f2f2;
			margin-top: 16px;
			margin-left: 10px;
		}

		.username1 {
			font-size: 14px;
			color: whitesmoke;
			margin-top: 16px;
			margin-left: 10px;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 180px;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 12px 16px 0 0;
		overflow: hidden;
		position: relative;
		padding: 20px 24px;

		.card-bg {
			position: absolute;
			top: 20px;
			right: 0;
			width: 220px;
			height: 160px;
		}

		.b-btn {
			position: absolute;
			right: 10px;
			top: 16px;
			width: 80px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			font-size: 14px;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: 14px;
			color: #f7d680;
			margin-bottom: 16px;
		}

	}

	.cover-container {
		background: $page-color-base;
		margin-top: -80px;
		padding: 0 18px;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 12px;

		.arc {
			position: absolute;
			left: 0;
			top: -17px;
			width: 100%;
			height: 22px;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 80px;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8px;
		}
	}

	.order-section {
		@extend %section;
		padding: 16px 0;
		margin-top: 12px;

		.order-item {
			@extend %flex-center;
			width: 70px;
			height: 70px;
			border-radius: 10px;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 24px;
			margin-bottom: 12px;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 22px;
		}
	}

	.history-section {
		padding: 16px 0 0;
		margin-top: 12px;
		background: #fff;
		border-radius: 10px;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 22px;
			margin-left: 15px;

			.yticon {
				font-size: 22px;
				color: #5eba8f;
				margin-right: 10px;
				line-height: 20px;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 15px 15px 0;

			image {
				display: inline-block;
				width: 100px;
				height: 100px;
				margin-right: 12px;
				border-radius: 10px;
			}
		}
	}
</style>
