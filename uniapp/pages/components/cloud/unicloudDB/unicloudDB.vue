<template>
	<view class="page-container">
		<view class="page-content page-unicloundDB flex-col">
			<uni-navbar :isBack="true" title="components">
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
			<view class="unicloudDB-wrap flex1-scroll">
				<!-- <unicloud-db v-slot:default="{data, loading, error, options}" collection="uni-id-roles"  where="id=='1'"> -->
				<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="uni-id-roles">
					<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe>
						<uni-tr>
							<uni-th>用户名</uni-th>
							<uni-th>操作</uni-th>
						</uni-tr>
						<uni-tr v-for="(item,index) in data" :key="index">
							<uni-th>{{item.name}}</uni-th>
							<uni-td>
								<view>
									<view style="display:inline-block;">
										<u-button type="warn" @click="onDel(item._id)">删除</u-button>
									</view>
									<view style="display:inline-block;">
										<u-button type="primary" @click="onUpdate(item._id)">修改</u-button>
									</view>
								</view>
							</uni-td>
						</uni-tr>
					</uni-table>
				</unicloud-db>
			</view>
			<!-- 模拟高度 -->
			<view class="opac">
				<u-button type="primary">增加</u-button>
			</view>
			<view class="btn-wrap">
				<u-button @click="onAdd" type="primary">增加</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	// uniapp服务空间
	export default {
		data() {
			return {
				where: ''
			}
		},
		onLoad() {
			// this.where = "name=='DCloud'"
			// this.where = `name=='DCloud'`
		},
		methods: {
			// 删除
			onDel(id) {
				// 依赖外键
				this.$refs.udb.remove(id)
			},
			// 新增
			onAdd() {
				// 新增重复
				this.$refs.udb.add({
					name: 'aaa'
				}, {
					toastTitle: '新增成功', // toast提示语
					success: (res) => { // 新增成功后的回调
						this.$refs.udb.loadData({
							clear: true
						})
					}
				})
			},
			// 修改
			onUpdate(id) {
				// 前后修改是否相同
				this.$refs.udb.update(id, {
					"name": "王五",
				}, {
					toastTitle: '修改成功', // toast提示语
					success: (res) => { // 更新成功后的回调
						this.$refs.udb.loadData({
							clear: true
						})
						const { // 变量结构赋值
							code,
							message
						} = res.result

						console.log(res, code, message)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-unicloundDB {
		.btn-wrap {
			position: fixed;
			bottom: 0;
			z-index: 50;
			width: 100%;
		}
	}
</style>
