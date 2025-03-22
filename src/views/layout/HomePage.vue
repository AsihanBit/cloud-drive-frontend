<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside>
            <LeftTabs></LeftTabs>
          </el-aside>
          <el-container>
            <el-main>
              这里是主页
              <el-button type="primary" @click="testFileView()"> 点击 </el-button>
            </el-main>
            <el-footer>Footer</el-footer>
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
    const res = await request.get('/user/view/file')
    console.log('Response:', res) // 打印完整的响应
    if (res && res.data) {
      const previewUrl = res.data.previewUrl // 后端返回的预览链接
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
      min-height: 8vh;
    }
  }
}
</style>
