import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/index.vue'
import worker from '@/views/worker/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/worker',
    name: 'worker',
    component: worker
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
