import Vue from 'vue'
import Router from 'vue-router'
import FilmIndex from '@/views/films/Index.vue'
import NowPlaying from '@/views/films/NowPlaying.vue'
import ComingSoon from '@/views/films/ComingSoon.vue'
import FilmDetail from '@/views/films/FilmDetail.vue'
import CinemaIndex from '@/views/cinemas/Index.vue'
import CinemaDetail from '@/views/cinemas/CinemaDetail.vue'
import CinemaFilmInfo from '@/views/cinemas/CinemaFilmInfo.vue'
import CenterIndex from '@/views/center/Index.vue'
import Login from '@/views/center/Login.vue'
import CenterList from '@/views/center/components/List.vue'
import NewsIndex from '@/views/news/Index.vue'
import CinemaSearch from '@/views/cinemas/Search.vue'
import CityIndex from '@/views/city/Index.vue'
import store from './store'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/films'
    },
    {
      path: '/films',
      component: FilmIndex,
      children: [
        {
          path: '',
          redirect: '/films/nowPlaying'
        },
        {
          path: 'nowPlaying',
          component: NowPlaying,
          meta: {
            lineX: 0
          }
        },
        {
          path: 'comingSoon',
          component: ComingSoon,
          meta: {
            lineX: 100
          }
        }
      ]
    },
    {
      path: '/film/:id',
      component: FilmDetail,
      name: 'filmDetail'
    },
    {
      path: '/cinema',
      component: CinemaIndex

    },
    {
      path: '/cinema/:cid',
      component: CinemaDetail,
      children: [
        {
          path: 'film/:fid/:date',
          component: CinemaFilmInfo
        }
      ]
    },
    {
      path: '/search',
      component: CinemaSearch
    },
    {
      path: '/center',
      component: CenterIndex
    },
    {
      path: '/centerList',
      component: CenterList
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/news',
      name: 'news',
      component: NewsIndex
    },
    {
      path: '/city',
      name: 'city',
      component: CityIndex
    }
  ]
})

let whiteList = ['/city']
router.beforeEach((to, from, next) => {
  // 检测是否已定位到当前城市了
  if (whiteList.indexOf(to.path) === -1 && !store.state.cityId) {
    next('/city')
    return
  }
  next()
})
export default router
