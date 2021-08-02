import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/postTopic',
    name: 'PostTopic',
    component: () => import('../views/CreateTopic.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/:id',
    name: 'Topic',
    component: () => import('../views/OneTopic.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
