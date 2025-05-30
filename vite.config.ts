import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// element plus 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // element plus 自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({}), // 按需导入 Element Plus 的 CSS
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 9000, // 修改为您想要的端口号
    open: true, // 自动打开浏览器（可选）
    host: true, // 允许局域网访问（可选）
    // strictPort: true, // 如果端口被占用则直接退出，而不是尝试下一个可用端口（可选）
    proxy: {
      '/api': {
        // changeOrigin: true,
        // Http
        target: 'http://localhost:8080',
        // Https
        // target: 'https://localhost:8080',
        // 忽略证书:(也可以告诉 Node.js 信任该证书 方式1.设置环境变量 方式2.或在代码中动态添加)
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base: './',
  // build: {
  //   rollupOptions: {
  //     input: 'src/main.ts',
  //     output: {
  //       entryFileNames: '[name].js',
  //       chunkFileNames: '[name]-[hash].js',
  //       assetFileNames: '[name]-[hash].[ext]',
  //     },
  //   },
  // },
})
