export default {
	data() {
		return {
			mixVerify: null, // 表单校验结果
			mixApiParams: null, // api请求数据
			mixType: '' // 标识
		}
	},
	methods: {
		// 路由
		// 删除 type 类型 switchTab navigateBack
		onMixRouter(url = '', type = 'navigateTo') {
			console.log(url,type)
			this.$u.route({
				url,
				type
			})
		},
		/**
		 * 保存至 localStorage、vuex
		 * @param {String} key 属性
		 * @param {String/Object} value 值
		 * @param {String} module 模块
		 */
		onMixStore(key, value, module) {
			let tempModule = module + '/'
			if (!module) tempModule = ''
			this.$store.commit(`${tempModule}${key}Set`, value)

			let tempValue = value
			if (typeof value === 'object') tempValue = JSON.stringify(tempValue)
			localStorage.setItem(key, tempValue)
		},

		// 显示弹出框
		onMixShow(type) {
			this.mixType = type
			this.flag[`${type}Show`] = true
		},
		// 隐藏弹出框
		onMixHide() {
			this.flag[`${this.mixType}Show`] = false
		}
	}
}
