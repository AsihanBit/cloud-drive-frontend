import { createApp } from 'vue'
import { createPinia } from 'pinia'

// element plus
// import 'element-plus/dist/index.css'
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

// 添加全局样式重置
const style = document.createElement('style')
style.textContent = `
  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  
  #app {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    margin: 0 !important;
    padding: 0 !important;
  }
`
document.head.appendChild(style)

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
