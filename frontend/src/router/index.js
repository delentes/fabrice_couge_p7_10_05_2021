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
    component: () => import('../views/profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/topics',
    name: 'Topics',
    component: () => import('../views/topics.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/topics/:id',
    name: 'Topic',
    component: () => import('../views/oneTopic.vue')
  },
  {
    path: '/createTopic',
    name: 'createTopic',
    component: () => import('../views/createTopic.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
