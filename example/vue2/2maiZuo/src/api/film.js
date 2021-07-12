import request from '@/utils/request'
// 获取(正在热映、即将放映)电影列表接口
export const getFilmList = (params = { type: 1, pageNum: 1, pageSize: 10 }) => {
  return request({
    url: '/gateway?__CITYID__&pageNum=' + params.pageNum + '&pageSize=' + params.pageSize + '&type=' + params.type + '&k=4210892',
    data: {
      xHost: 'mall.film-ticket.film.list'
    }
  })
}
// 获取电影的banner列表接口
export const getFilmBannerList = () => {
  return request({
    url: '/gateway?type=2&__CITYID__&k=7729231',
    data: {
      xHost: 'mall.cfg.common-banner'
    }
  })
}

// 获取电影详情接口
export const getFilmDetail = (filmId) => {
  return request({
    url: '/gateway?filmId=' + filmId + '&k=4669880',
    data: {
      xHost: 'mall.film-ticket.film.info'
    }
  })
}
