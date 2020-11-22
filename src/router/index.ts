import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Stops from '@/views/Stops.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Stops
  },
  {
    path: '/favourites',
    component: () => import('@/views/Favourites.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/logout',
    component: () => import('@/views/Logout.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
