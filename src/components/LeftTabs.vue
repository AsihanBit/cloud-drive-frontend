<template>
  <div class="left-tab">
    <div class="switch">
      <el-switch
        v-model="isCollapse"
        active-text="展开"
        inactive-text="收起"
        :active-value="false"
        :inactive-value="true"
        inline-prompt
        size="large"
        width="60"
      >
      </el-switch>
    </div>
    <div class="menu">
      <!-- 一级菜单 -->
      <div class="menu-one">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
        >
          <el-menu-item index="/home">
            <el-icon><HomeFilled /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <el-menu-item index="/files">
            <el-icon><FolderOpened /></el-icon>
            <template #title>文件</template>
          </el-menu-item>
          <el-menu-item index="/transfers">
            <el-icon><Sort /></el-icon>
            <template #title>传输</template>
          </el-menu-item>
          <el-menu-item index="/share">
            <el-icon><Share /></el-icon>
            <template #title>分享</template>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 二级菜单 -->
      <!-- <LeftHome></LeftHome> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { HomeFilled, FolderOpened, Share, Sort } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const isCollapse = ref(false)
const route = useRoute()

const activeIndex = computed(() => {
  const path = route.path
  if (path.startsWith('/home')) return '/home'
  if (path.startsWith('/files')) return '/files'
  if (path.startsWith('/transfers')) return '/transfers'
  if (path.startsWith('/share')) return '/share'
  return ''
})

// import LeftHome from './LeftHome.vue'

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
/* 父容器使用 Flexbox 布局 */
.left-tab {
  display: flex;
  flex-direction: column; /* 默认垂直排列 */
  // width: 100px;
  .switch {
    /* 展开收起 */
    .el-switch {
      background-color: cadetblue;
      display: flex;
      justify-content: center;
      align-items: center;
      /* height: 100%; */
    }
  }
  .menu {
    display: flex;
    flex-direction: row; /* 默认垂直排列 */
  }
}

/* 展开后宽度 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 120px;
  /* min-height: 700px; */
}
.el-menu {
  .el-menu-item {
    // width: 30px;
    height: 60px;
  }
}
</style>
