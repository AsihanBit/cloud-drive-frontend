<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <h3>用户文件 <span style="font-size: 12px">- jwt TTL:2h</span></h3>
        </el-header>
        <el-container>
          <el-aside>
            <LeftTabs></LeftTabs>
          </el-aside>
          <el-container>
            <el-main>
              <RouterView />
            </el-main>
            <el-footer><h4>页尾</h4></el-footer>
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
      background: linear-gradient(to right, #fff7ac, #ffc7a5);
      text-align: center;
      // min-height: 8vh;
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
      min-height: 8vh;
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
