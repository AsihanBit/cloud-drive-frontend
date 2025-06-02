<template>
  <div class="modern-github-footer">
    <div class="footer-content">
      
      <div class="project-links">
        <a href="https://github.com/AsihanBit/cloud-drive-frontend" target="_blank" class="repo-link frontend-link">
          <div class="link-content">
            <el-icon class="link-icon"><Monitor /></el-icon>
            <div class="link-details">
              <span class="link-title">前端仓库</span>
              <span class="link-subtitle">Vue3 + TypeScript</span>
            </div>
          </div>
          <el-icon class="external-icon"><TopRight /></el-icon>
        </a>
        
        <a href="https://github.com/AsihanBit/cloud-drive-backend" target="_blank" class="repo-link backend-link">
          <div class="link-content">
            <el-icon class="link-icon"><Setting /></el-icon>
            <div class="link-details">
              <span class="link-title">后端仓库</span>
              <span class="link-subtitle">SpringBoot</span>
            </div>
          </div>
          <el-icon class="external-icon"><TopRight /></el-icon>
        </a>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { Link, Monitor, Setting, TopRight, Star, Coffee } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.modern-github-footer {
  width: 100%;
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;

    
    .project-links {
      display: flex;
      gap: 16px;
      
      .repo-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        text-decoration: none;
        transition: all 0.3s ease;
        min-width: 200px;
        backdrop-filter: blur(10px);
        
        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .link-content {
          display: flex;
          align-items: center;
          gap: 12px;
          
          .link-icon {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.9);
          }
          
          .link-details {
            display: flex;
            flex-direction: column;
            gap: 2px;
            
            .link-title {
              font-size: 14px;
              font-weight: 600;
              color: rgba(255, 255, 255, 0.95);
              line-height: 1.2;
            }
            
            .link-subtitle {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.7);
              font-weight: 500;
              line-height: 1.2;
            }
          }
        }
        
        .external-icon {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }
        
        &.frontend-link {
          &:hover {
            .link-icon {
              color: #67c23a;
            }
            
            .external-icon {
              color: #67c23a;
              transform: translate(2px, -2px);
            }
          }
        }
        
        &.backend-link {
          &:hover {
            .link-icon {
              color: #409eff;
            }
            
            .external-icon {
              color: #409eff;
              transform: translate(2px, -2px);
            }
          }
        }
      }
    }
    

  }
}

// 响应式设计
@media (max-width: 768px) {
  .modern-github-footer {
    .footer-content {
      gap: 16px;
      padding: 16px;
      
      .project-links {
        flex-direction: column;
        width: 100%;
        
        .repo-link {
          min-width: auto;
          width: 100%;
        }
      }
      
      .tech-stats {
        gap: 16px;
        
        .stat-item {
          padding: 6px 12px;
        }
      }
    }
  }
}
</style>
