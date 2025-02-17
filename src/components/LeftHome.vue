<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <el-icon><HomeFilled /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><FolderOpened /></el-icon>
        <template #title>文件</template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><Share /></el-icon>
        <template #title>分享</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeFilled, FolderOpened, Share } from '@element-plus/icons-vue'
const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
/* 展开收起 */
.el-switch {
  background-color: cadetblue;
  display: flex;
  justify-content: center;
  // align-items: center;
  /* height: 100%; */
}

/* 展开后宽度 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  /* min-height: 700px; */
}
.el-menu {
  .el-menu-item {
    // width: 30px;
    height: 60px;
  }
}
</style>
