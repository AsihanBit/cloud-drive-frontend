<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header class="common-header">
          <div class="header-content">
            <h3 class="header-title">用户文件</h3>
            <div class="header-subtitle">令牌期限: <span class="token-timer">2h</span></div>
          </div>
        </el-header>
        <el-container>
          <el-aside>
            <LeftTabs></LeftTabs>
          </el-aside>
          <el-container>
            <el-main>
              <RouterView />
            </el-main>
            <el-footer>
              <GithubFooter></GithubFooter>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LeftTabs from '@/components/LeftTabs.vue'
import GithubFooter from '@/components/GithubFooter.vue'
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
        display: flex;
        // align-items: center; // 确保内容垂直居中
        // width: 100%; // 确保内容区域占满header
        padding: 0 20px; // 添加一些内边距

        align-items: baseline;
        gap: 12px;

        .header-title {
          font-size: 20px;
          letter-spacing: 4px;
          // margin: 0; // 移除默认margin
          // line-height: 1; // 设置行高为1
        }
        .header-subtitle {
          font-size: 13px;
          .token-timer {
            font-weight: bold;
            color: #ffeb3b;
          }
        }
      }
    }

    .el-container {
      .el-aside {
        width: 120px;
      }
    }
    .el-main {
      // background-color: #6bb5ff;
      background: linear-gradient(to bottom, #d7eeff, #8dcbff);
      text-align: center;
      min-height: 82vh;

      padding: 40px 0 0 0;
    }
    .el-footer {
      // background-color: #b6ffa7;
      background: linear-gradient(to bottom, #8dcbff, #1fffa2);
      text-align: center;
      min-height: 10vh;
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
