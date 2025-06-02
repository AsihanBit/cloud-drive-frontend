<template>
  <div class="modern-left-nav">
    <!-- 汉堡菜单切换 -->
    <div class="nav-toggle">
      <el-button 
        @click="isCollapse = !isCollapse"
        :icon="isCollapse ? Expand : Fold"
        size="default"
        class="hamburger-btn"
      />
    </div>

    <!-- 主导航菜单 -->
    <div class="nav-menu">
      <el-menu
        :default-active="activeIndex"
        class="modern-menu"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
      >
        <el-menu-item index="/home" class="nav-item">
          <el-icon class="nav-icon"><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        
        <el-menu-item index="/files" class="nav-item">
          <el-icon class="nav-icon"><FolderOpened /></el-icon>
          <template #title>文件</template>
        </el-menu-item>
        
        <el-menu-item index="/transfers" class="nav-item">
          <el-icon class="nav-icon"><Sort /></el-icon>
          <template #title>传输</template>
        </el-menu-item>
        
        <el-menu-item index="/share" class="nav-item">
          <el-icon class="nav-icon"><Share /></el-icon>
          <template #title>分享</template>
        </el-menu-item>

        <el-menu-item index="/profile" class="nav-item profile-item">
          <el-icon class="nav-icon"><User /></el-icon>
          <template #title>我的</template>
        </el-menu-item>

      </el-menu>
    </div>

    <!-- 底部装饰 -->
    <div class="nav-footer">
      <div class="footer-decoration"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { HomeFilled, FolderOpened, Share, Sort, User, Expand, Fold } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const isCollapse = ref(false)
const route = useRoute()

const activeIndex = computed(() => {
  const path = route.path
  if (path.startsWith('/home')) return '/home'
  if (path.startsWith('/profile')) return '/profile'
  if (path.startsWith('/files')) return '/files'
  if (path.startsWith('/transfers')) return '/transfers'
  if (path.startsWith('/share')) return '/share'
  return ''
})

// import LeftHome from './LeftHome.vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log('Menu opened:', key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log('Menu closed:', key, keyPath)
}
</script>

<style lang="less" scoped>
.modern-left-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 0 24px 24px 0;
  padding: 20px 0;
  position: relative;
  overflow: hidden;
  width: 240px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.02) 100%);
    pointer-events: none;
  }

  .nav-toggle {
    position: relative;
    z-index: 2;
    padding: 0 20px 20px;
    display: flex;
    justify-content: center;

    .hamburger-btn {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      color: rgba(255, 255, 255, 0.9);
      transition: all 0.3s ease;
      width: 48px;
      height: 36px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .nav-menu {
    flex: 1;
    position: relative;
    z-index: 2;
    padding: 0 16px;
    overflow: hidden;

    .modern-menu {
      background: transparent;
      border: none;
      overflow: hidden;
      
      .nav-item {
        margin: 12px 0;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        height: 56px;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%);
          transition: left 0.6s ease;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

          &::before {
            left: 100%;
          }

          .nav-icon {
            transform: scale(1.1);
            color: rgba(255, 255, 255, 1);
          }
          
          :deep(.el-menu-item__title) {
            color: rgba(255, 255, 255, 1);
            font-weight: 600;
          }
        }

        &.is-active {
          background: linear-gradient(135deg,
            rgba(102, 126, 234, 0.4) 0%,
            rgba(118, 75, 162, 0.4) 100%);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
          transform: translateY(-3px);
          border-left: 4px solid #60a5fa;
          margin-right: 4px;

          .nav-icon {
            color: rgba(255, 255, 255, 1);
            transform: scale(1.15);
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          }

          :deep(.el-menu-item__title) {
            color: rgba(255, 255, 255, 1);
            font-weight: 700;
            font-size: 15px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        }

        &.profile-item {
          background: linear-gradient(135deg,
            rgba(251, 191, 36, 0.2) 0%,
            rgba(245, 158, 11, 0.2) 100%);
          border-color: rgba(251, 191, 36, 0.3);

          &:hover {
            background: linear-gradient(135deg,
              rgba(251, 191, 36, 0.3) 0%,
              rgba(245, 158, 11, 0.3) 100%);
          }

          &.is-active {
            background: linear-gradient(135deg,
              rgba(251, 191, 36, 0.5) 0%,
              rgba(245, 158, 11, 0.5) 100%);
            border-left-color: #f59e0b;
          }
        }

        .nav-icon {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        :deep(.el-menu-item__title) {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.5px;
        }
      }
    }
  }

  .nav-footer {
    position: relative;
    z-index: 2;
    padding: 20px;
    display: flex;
    justify-content: center;

    .footer-decoration {
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%);
      border-radius: 2px;
    }
  }
}

// 折叠状态样式
.modern-menu.el-menu--collapse {
  .nav-item {
    .nav-icon {
      margin-right: 0;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .modern-left-nav {
    width: 200px;
    
    .nav-menu {
      padding: 0 12px;

      .modern-menu {
        .nav-item {
          height: 48px;
          margin: 8px 0;

          .nav-icon {
            font-size: 18px;
          }

          :deep(.el-menu-item__title) {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
