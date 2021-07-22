// 拦截器
import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store' // 引入vuex
// import router from '@/router'

let loadingInstance = null
// create an axios instance
const service = axios.create({
  baseURL: window.g.baseUrl, // base_url of api, appName usually
  timeout: 10000, // request timeout
  headers: {
    // universal request header
    token: localStorage.myToken
  }
})

service.interceptors.request.use(config => {
  console.log(config, 'interceptor请求拦截器')
  config.cancelToken = new axios.CancelToken((cancel) => { // 切换路由取消请求
    store.commit('pushToken', { cancelToken: cancel })
  })
  const whiteList = ['/common/login'] // 不使用全局加载样式
  if (!whiteList.includes(config.url)) {
    loadingInstance = Loading.service({ fullscreen: true, background: 'rgba(0, 0, 0, 0.8)', text: '拼命加载中' })
  }

  // Do something before request is sent
  // config.headers.token = localStorage.myToken
  // 兼容ie ie浏览器在请求数据时，url不会自动编码，当url出现中文时会报错
  config.url = encodeURI(config.url)
  return config
}, error => {
  // Do something with request error
  Message.error('请求错误...')
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    console.log(response, 'interceptor响应拦截器')
    // if (loadingInstance) loadingInstance.close()
    loadingInstance && loadingInstance.close()
    // 返回为json格式数据
    const type = typeof response.data
    let res = response.data
    if (type === 'string') res = JSON.parse(response.data)
    return Promise.resolve(res)
  },
  error => {
    if (loadingInstance) loadingInstance.close()
    console.log('interceptor响应错误')
    console.dir(error)
    /** *** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          // window.location.href = '/NotFound'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        // case 408:
        //   error.message = '请求超时'
        //   break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      // 超时处理
      if (error.message.includes('timeout')) error.message = '请求超时，请重试'
    }
    Message.error(error.message)
    /** *** 处理结束 *****/
    // 如果不需要错误处理，以上的处理过程都可省略
    // return Promise.reject(error.response)
    return Promise.reject(error)
  })

export default service
