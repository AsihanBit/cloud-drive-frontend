import { createRouter, createWebHashHistory } from 'vue-router'
/*
import HomePage from '@/views/layout/HomePage.vue'
import FilesPage from '@/views/layout/FilesPage.vue'
import TransferPage from '@/views/layout/TransferPage.vue'
import SharePage from '@/views/layout/SharePage.vue'
import ShareLinkPage from '@/views/layout/ShareLinkPage.vue'

import LoginPage from '@/views/login/LoginPage.vue'
import RegisterPage from '@/views/login/RegisterPage.vue'

import AllFilesPage from '@/views/files/AllFilesPage.vue'
import PictureFilesPage from '@/views/files/PictureFilesPage.vue'

import MyShare from '@/views/shares/MyShare.vue'
import OtherShare from '@/views/shares/OtherShare.vue'
import MyShareFiles from '@/views/shares/MyShareFiles.vue'
import OtherShareFiles from '@/views/shares/OtherShareFiles.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

*/
// import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    // component: HomePage,
    component: () => import('@/views/layout/HomePage.vue'),
  },
  {
    path: '/files',
    // component: FilesPage,
    component: () => import('@/views/layout/FilesPage.vue'),
    redirect: '/files/all',
    children: [
      {
        path: '/files/all',
        // component: AllFilesPage,
        component: () => import('@/views/files/AllFilesPage.vue'),
      },
      {
        path: '/files/pic',
        // component: PictureFilesPage,
        component: () => import('@/views/files/PictureFilesPage.vue'),
      },
    ],
  },
  {
    path: '/transfers',
    // component: TransferPage,
    component: () => import('@/views/layout/TransferPage.vue'),
  },
  {
    path: '/share',
    // component: SharePage,
    component: () => import('@/views/layout/SharePage.vue'),
    redirect: '/share/myshare',
    children: [
      {
        path: '/share/myshare',
        // component: MyShare,
        component: () => import('@/views/shares/MyShare.vue'),
        // children: [
        //   {
        //     path: '/share/myshare/:shareId',
        //     component: MyShareFiles,
        //   },
        // ],
      },
      {
        path: '/share/myshare/:shareId',
        // component: MyShareFiles,
        component: () => import('@/views/shares/MyShareFiles.vue'),
      },
      {
        path: '/share/other',
        // component: OtherShare,
        component: () => import('@/views/shares/OtherShare.vue'),
        // children: [
        //   {
        //     path: '/share/other/:shareId',
        //     component: OtherShareFiles,
        //   },
        // ],
      },
      {
        path: '/share/other/:shareId',
        // component: OtherShareFiles,
        component: () => import('@/views/shares/OtherShareFiles.vue'),
      },
    ],
  },
  {
    path: '/login',
    // component: LoginPage,
    component: () => import('@/views/login/LoginPage.vue'),
  },
  {
    path: '/register',
    // component: RegisterPage,
    component: () => import('@/views/login/RegisterPage.vue'),
  },
  {
    path: '/sharelink',
    // component: ShareLinkPage,
    component: () => import('@/views/layout/ShareLinkPage.vue'),
    children: [
      {
        path: '/sharelink/:shareId',
        // component: ShareLinkPage,
        component: () => import('@/views/layout/ShareLinkPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
})

export default router
