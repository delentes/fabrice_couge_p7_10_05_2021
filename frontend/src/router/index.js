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
    path: '/topics',
    name: 'Topics',
    component: () => import('../views/Topics.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/topics/:id',
    name: 'Topic',
    component: () => import('../views/OneTopic.vue')
  },
  {
    path: '/createTopic',
    name: 'createTopic',
    component: () => import('../views/CreateTopic.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
