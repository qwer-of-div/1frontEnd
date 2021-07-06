import Request from '@/js_sdk/luch-request/luch-request/index.js'
// export const apiBaseUrl = 'http://www.baidu.com'
const api = new Request()
const http = new Request()
const cookie = 'uuid_n_v=v1; iuuid=C9B69D60F40A11EA890341877313BDF248B3D42EA4374478B9FD6F1D0A4B9C45; webp=true; ci=59%2C%E6%88%90%E9%83%BD; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221747c54e95590f-09c78abeea2804-2d604637-304704-1747c54e956458%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%221747c54e95590f-09c78abeea2804-2d604637-304704-1747c54e956458%22%7D; _lxsdk_cuid=17477117f93c8-0997f546b55c7f-2d604637-4a640-17477117f94c8; _lxsdk=C9B69D60F40A11EA890341877313BDF248B3D42EA4374478B9FD6F1D0A4B9C45; _last_page=c_76cEz; Hm_lvt_703e94591e87be68cc8da0da7cbd0be2=1599806399,1599806408,1599808119,1599808130; Hm_lpvt_703e94591e87be68cc8da0da7cbd0be2=1599814155; from=canary; _lxsdk_s=1747c54e82f-f16-9f5-83b%7C%7C10'
export {
  http,
  api
}
http.config.header = {website:'123dfdf465132'}
api.config.header={aaaaaaa:'sdfsdfsdfsdfsd'}
api.setConfig((config) => { /* 设置全局配置 */
  // config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
  config.header = {
    ...config.header,
	// 'content-type': 'application/x-www-form-urlencoded',
	'If-None-Match': 'W/"1311-cnak8ytZGPiVoSdrIuJt8Q"',
	'cookie': cookie,
    'X-Requested-With': 'jQuery'
  }
  return config
})

//我这里 用的api跟项目对应
//请求前拦截，用来动态加参
api.interceptors.request.use((config) => { // 可使用async await 做异步操作
  // config.baseURL = apiBaseUrl
  config.header = {
    ...config.header,
    // 'testaaa': '11' // 演示拦截器header加参
  }

  // 演示custom 用处
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  // if (config.custom.loading) {
  //  uni.showLoading()
  // }
  /**
   /* 演示
   if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
      return Promise.reject(config)
    }
   **/
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})


// 请求后
api.interceptors.response.use((response) => {
  console.log(response)
  return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  console.log(response.statusCode);
  //未登录时清空缓存跳转
  if(response.statusCode ==401){
	  uni.clearStorageSync();
	  uni.switchTab({
	  	url:"/pages/user/user"
	  })
  }
  return Promise.reject(response)
})