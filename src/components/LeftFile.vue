<template>
  <div class="left-file-tab">
    <el-menu
      :default-active="route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
    >
      <el-menu-item index="/files/all">
        <el-icon><Folder /></el-icon>
        <template #title>全部</template>
      </el-menu-item>
      <!-- <el-menu-item index="/files/pic">
        <el-icon><Picture /></el-icon>
        <template #title>图片</template>
      </el-menu-item> -->
      <!-- <el-menu-item index="3">
        <el-icon><Share /></el-icon>
        <template #title>视频</template>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Folder, Picture } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const isCollapse = ref(false)
const route = useRoute()
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
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
  width: 100px;
  /* min-height: 700px; */
}
.el-menu {
  .el-menu-item {
    // width: 30px;
    height: 60px;
  }
}
</style>
