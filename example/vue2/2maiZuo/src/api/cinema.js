import request from '@/utils/request'
// 获取影院列表接口
export const getCinemaList = () => {
  return request({
    url: '/gateway?__CITYID__&ticketFlag=1',
    data: {
      xHost: 'mall.film-ticket.cinema.list'
    }
  })
}

// 获取某个影院的基本信息
export const getCinemaInfo = (params = { cid: 7828 }) => {
  return request({
    url: `/gateway/?cinemaId=${params.cid}&k=4698761`,
    data: {
      xHost: 'mall.film-ticket.cinema.info'
    }
  })
}

// 获取某个影院下的所有电影列表
export const getCinemaFilms = (params = { cid: 7828 }) => {
  return request({
    url: `/gateway/?cinemaId=${params.cid}&k=4698761`,
    data: {
      xHost: 'mall.film-ticket.film.cinema-show-film'
    }
  })
}

// 获取某个影院下某个电影的某天播放时间
export const getCinemaFilmSchedule = (params = { fid: 4795, cid: 4722, date: 1570636800 }) => {
  return request({
    url: `/gateway?filmId=${params.fid}&cinemaId=${params.cid}&date=${params.date}&k=6788435`,
    data: {
      xHost: 'mall.film-ticket.schedule.list'
    }
  })
}
