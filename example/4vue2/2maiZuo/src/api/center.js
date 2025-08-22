import request from '@/utils/request'
import { getToken } from '@/utils/local-data'
// 用户资料
export const getUserlnfo = () => {
  let token = getToken()
  return request({
    method: 'get',
    url: '/gateway?k=6189443',
    headers: {
      'X-Token': token
    },
    data: {
      xHost: 'mall.user.info.get'
    }
  })
}

// 验证码
export const getCode = (phone) => {
  return request({
    method: 'post',
    url: '/gateway',
    data: {
      xHost: 'mall.user.sms-code.send',
      imgCode: '',
      imgKey: '',
      mobile: phone,
      type: '1'
    }
  })
}

// 登录
export const Login = (mobile, smsCode) => {
  return request({
    method: 'post',
    url: '/gateway?k=6189443',
    data: {
      xHost: 'mall.user.sms-code-login',
      extra: {},
      imgCode: '',
      imgKey: '',
      mobile: mobile,
      smsCode: smsCode
    }
  })
}
