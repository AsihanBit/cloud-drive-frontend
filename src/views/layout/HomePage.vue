<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <h3>首页</h3>
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
            <el-footer>
              <p>Github 链接</p>
              <a href="https://github.com/AsihanBit/cloud-drive-frontend" target="_blank">前端</a>
              <a href="https://github.com/AsihanBit/cloud-drive-backend" target="_blank">后端</a>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LeftTabs from '@/components/LeftTabs.vue'
import request from '@/utils/request'
const testFileView = async () => {
  try {
    console.log('testFileView')
    // const res = await request.get('/user/view/file')
    const res = await request.get('/user/view/previewtest')
    console.log('Response:', res) // 打印完整的响应
    if (res) {
      const previewUrl = res // 后端返回的预览链接
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
    background-color: #0f5757;
    .el-header {
      background-color: #f5ff67;
      text-align: center;
      min-height: 8vh;
    }
    .el-container {
      .el-aside {
        width: 120px;
      }
    }
    .el-main {
      background-color: #6bb5ff;
      text-align: center;
      min-height: 82vh;
    }
    .el-footer {
      background-color: #b6ffa7;
      text-align: center;
      height: 10vh;
      a {
        display: inline-block;
        // margin: 5px;
        padding: 1px 9px;
        // background-color: #007bff;
        color: rgb(145, 0, 212);
        text-decoration: none;
        border-radius: 4px;
        // transition: background-color 0.3s ease;

        &:hover {
          background-color: #ffa844;
        }
      }
    }
  }
}
</style>
