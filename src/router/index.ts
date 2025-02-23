import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/layout/HomePage.vue'
import FilesPage from '@/views/layout/FilesPage.vue'
import TransferPage from '@/views/layout/TransferPage.vue'
import SharePage from '@/views/layout/SharePage.vue'

import LoginPage from '@/views/login/LoginPage.vue'
import RegisterPage from '@/views/login/RegisterPage.vue'

import AllFilesPage from '@/views/files/AllFilesPage.vue'
import PictureFilesPage from '@/views/files/PictureFilesPage.vue'

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
    path: '/files',
    component: FilesPage,
    redirect: '/files/all',
    children: [
      {
        path: '/files/all',
        component: AllFilesPage,
      },
      {
        path: '/files/pic',
        component: PictureFilesPage,
      },
    ],
  },
  {
    path: '/transfers',
    component: TransferPage,
  },
  {
    path: '/share',
    component: SharePage,
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
