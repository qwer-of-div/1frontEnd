import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		city: uni.getStorageSync('city') ? JSON.parse((uni.getStorageSync('city'))) : {'cityName': '成都', 'cityCode': '510100'}
	},
    mutations: {
		setCity(state, obj) {
			state.city = obj;
		},  
	},
    actions: {}
})
export default store