<template>
	<view class="page-container">
		<view class="page-content">
			<uni-navbar></uni-navbar>
			<br>
			<u-upload ref="upload" :form-data="formData" :action="action" :auto-upload="false" :beforeUpload="handleBeforeUpload"></u-upload>
			<br>
			<u-button type="primary" @click="onUpload">上传</u-button>
		</view>
	</view>
</template>

<script>
	// 一个一个上传，单个文件上传
	
	export default {
		data() {
			return {
				action: '',
				formData: {
					desc: '文件上传额外参数'
				}
			}
		},
		onLoad() {
			this.action = `${this.$g.baseUrl}/files/upload`
		},
		methods: {
			// 文件上传前
			async handleBeforeUpload(index, list) {
			},
			onUpload() {
				this.$refs.upload.upload()
			}
		}
	}
</script>

<style>

</style>
