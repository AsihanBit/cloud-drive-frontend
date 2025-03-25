<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <h3>分享管理</h3>
        </el-header>
        <el-container>
          <el-aside>
            <LeftTabs></LeftTabs>
          </el-aside>
          <el-container>
            <el-main>
              <div class="nav-links">
                <router-link to="/share/myshare">我的分享</router-link>
                <router-link to="/share/other">最近转存</router-link>
              </div>
              <RouterView />
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
</script>

<style lang="less" scoped>
.common-layout {
  .el-container {
    // background-color: #0f5757;
    .el-header {
      // background-color: #f5ff67;
      background: linear-gradient(to right, #ffdfa2, #fff59e);
      text-align: center;
      // min-height: 8vh;
    }
    .el-container {
      .el-aside {
        width: 120px;
      }
      .el-container {
        .el-main {
          // background-color: #6bb5ff;
          background: linear-gradient(to bottom, #d7eeff, #8dcbff);
          // text-align: center;
          min-height: 82vh;
          .nav-links {
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #fbffbc;
              text-decoration: none;
              color: #000;
              margin-right: 10px;
              &.router-link-active {
                background-color: #427af3;
                color: #fff;
              }
            }
          }
        }
        .el-footer {
          // background-color: #b6ffa7;
          background: linear-gradient(to bottom, #8dcbff, #1fffa2);
          text-align: center;
          min-height: 8vh;
        }
      }
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
