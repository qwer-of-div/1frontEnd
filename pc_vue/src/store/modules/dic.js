if (process.env.NODE_ENV === 'production') {
  // 为生产环境修改配置...
} else {
  // 为开发环境修改配置...
}

const state = {
  emptyList: [{ id: '', value: '' }, { id: '', value: '全部' }],
  sex: [{ id: '0', value: '男' }, { id: '1', value: '女' }],
  // 全部与空
  idTypeList: [{ id: '0', value: '身份证' }, { id: '1', value: '户口本' }, { id: '', value: '' }, { id: '', value: '全部' }],
  addressList: []
}

export default {
  name: 'dic',
  namespaced: true,
  state: { ...state },
  mutations: {
    resetState (stateNew) {
      for (const key in stateNew) {
        stateNew[key] = state[key]
      }
    },
    addressListSet (state, addressList) {
      state.addressList = [...addressList, ...state.emptyList]
    }
  }
}
