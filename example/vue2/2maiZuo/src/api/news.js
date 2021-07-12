import request from '@/utils/request'
// 获取影院列表接口
export const getNews = () => {
  return request({
    url: '/gateway?actId=ElzMZU125260',
    data: {
      xHost: 'mall.act.static-page.info'
    }
  })
}
