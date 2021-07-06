import request from '@/utils/request'
// 获取所有城市的数据
export const getCityList = () => {
  return request({
    url: '/gateway?k=9825847',
    data: {
      xHost: 'mall.film-ticket.city.list'
    }
  })
}
