import request from './interceptor'

const baseUrl = '/files'
const api = {
  // 初始化数据
  initData: (params) => {
    return request({
      url: 'industrial/info',
      method: 'get',
      params
    })
  },
  // 指标数据
  uploadElement: (data) => {
    return request({
      url: `${baseUrl}/upload`,
      method: 'post',
      data
    })
  }
}

export default api
