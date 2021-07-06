const state = {
	sex: [{
		id: '0',
		value: '男'
	}, {
		id: '1',
		value: '女'
	}],
	idType: [{
		id: '0',
		value: '身份证'
	}, {
		id: '1',
		value: '户口本'
	}, {
		id: '',
		value: ''
	}, {
		id: '',
		value: '全部'
	}]

}

export default {
	name: 'dic',
	namespaced: true,
	state,
	mutations: {
		sexSet(state, payload) {
			state.sex = [{
				id: '0',
				value: '男'
			}, {
				id: '1',
				value: '女'
			}, {
				id: '2',
				value: '未知'
			}]
		}
	}
}
