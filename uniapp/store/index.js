import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach(item => {
	const module = files(item).default
	// console.log(module)
	// 使用内置的组件名称 进行全局组件注册
	modules[module.name] = module
})

export default new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {}, // 用户信息
		transNo: '10001', // 流水号
		queryData: uni.getStorageSync('queryData') ? JSON.parse(uni.getStorageSync('queryData')) : {},
		g: {
			idCardType: '居民身份证' ,// 判断常量
			minDate: new Date(1900,0,1),
			maxDate: new Date()
		},
		tabBar: [{
				iconPath: "/static/img/common/component.png",
				selectedIconPath: "/static/img/common/component_select.png",
				text: '组件',
				count: 2,
				isDot: true,
				pagePath: "/pages/components/tabBar/uViewUI/index"
			},
			{
				iconPath: "/static/img/common/js.png",
				selectedIconPath: "/static/img/common/js_select.png",
				text: '工具',
				midButton: true,
				pagePath: "/pages/components/tabBar/midBtn/index"
			},
			{
				iconPath: "/static/img/common/template.png",
				selectedIconPath: "/static/img/common/template_select.png",
				text: '模板',
				pagePath: "/pages/components/tabBar/template/index"
			},
		]
	},
	mutations: {
		userInfoSet(state, userInfo) {
			state.userInfo = userInfo
		},
		queryDataSet(state, queryData) {
			state.userInfo = queryData
		}
	},
	actions: {},
	modules
})
