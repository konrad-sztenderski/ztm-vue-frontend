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
    path: '/register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/logout',
    component: () => import('@/views/Logout.vue')
  },
  {
    path: '/stop/:id',
    component: () => import('@/views/Stop.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
