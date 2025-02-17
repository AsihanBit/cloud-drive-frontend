import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/layout/HomePage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import RegisterPage from '@/views/login/RegisterPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
})

export default router
