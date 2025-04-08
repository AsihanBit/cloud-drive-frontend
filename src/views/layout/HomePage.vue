<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header class="common-header">
          <div class="header-content">
            <h3 class="header-title">项目介绍</h3>
          </div>
        </el-header>
        <el-container>
          <el-aside>
            <LeftTabs></LeftTabs>
          </el-aside>
          <el-container>
            <el-main>
              <!-- 这里是主页 -->
              <!-- <el-button type="primary" @click="testFileView()"> 点击 </el-button> -->
              <h4>介绍-(仅主要涉及)</h4>
              <h4>前端</h4>
              <p>Vue.js TypeScript Pinia</p>
              <p>大文件分片: web worker</p>
              <h4>后端</h4>
              <p>SpringBoot MyBatis</p>
              <p>文件搜索: ElasticSearch(match highlight)</p>
              <p>文件预览: kkFileView</p>
              <h4>数据库</h4>
              <p>Mysql(树形邻接表 秒传) Redis(续传/中断)</p>
              <hr />
              <h4>开发工具</h4>
              <p>VSCode, IntelliJ IDEA, Swagger3, Postman</p>
              <p>Navicat, DataGrip, ARDM</p>
              <p>Git, Fork</p>
              <h5>*持续开发中*</h5>
            </el-main>
            <el-footer> <GithubFooter></GithubFooter> </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LeftTabs from '@/components/LeftTabs.vue'
import GithubFooter from '@/components/GithubFooter.vue'

import request from '@/utils/request'
const testFileView = async () => {
  try {
    console.log('testFileView')
    // const res = await request.get('/user/view/file')
    const res = await request.get('/user/view/previewtest')
    console.log('Response:', res) // 打印完整的响应
    if (res) {
      const previewUrl = res.data as unknown as string // 后端返回的预览链接
      if (previewUrl) {
        window.open(previewUrl) // 打开预览页面
      } else {
        console.error('previewUrl is undefined')
      }
    } else {
      console.error('Response is empty')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  .el-container {
    .common-header {
      background: linear-gradient(135deg, #758ae7 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center; // 确保内容垂直居中
      // height: 64px; // 固定高度

      .header-content {
        // display: flex;
        // align-items: center; // 确保内容垂直居中
        // width: 100%; // 确保内容区域占满header
        padding: 0 20px; // 添加一些内边距

        .header-title {
          font-size: 20px;
          letter-spacing: 4px;
          // margin: 0; // 移除默认margin
          // line-height: 1; // 设置行高为1
        }
      }
    }
    .el-container {
      .el-aside {
        width: 120px;
      }
    }
    .el-main {
      background: linear-gradient(to bottom, #d7eeff, #8dcbff);
      // background-color: #6bb5ff;
      text-align: center;
      min-height: 82vh;
    }
    .el-footer {
      // background-color: #b6ffa7;
      background: linear-gradient(to bottom, #8dcbff, #1fffa2);
      text-align: center;
      height: 10vh;
    }
  }
}
.el-main {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
