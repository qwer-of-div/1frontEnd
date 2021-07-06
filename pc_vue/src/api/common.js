import request from './interceptor'

const baseUrl = '/common'

const api = {
  // 初始化数据
  initData: (params) => {
    return request({
      url: 'industrial/info',
      method: 'post',
      params
    })
  },
  // 登录
  getLogin: (params) => {
    return request({
      url: '/login',
      method: 'post',
      params
    })
  },
  // 登录
  localLogin: (data) => {
    return request({
      url: `${baseUrl}/login`,
      method: 'post',
      // params
      data
    })
  }
}

export default api
