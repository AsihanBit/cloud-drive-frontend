<template>
  <div class="modern-share-layout">
    <!-- 背景动画 -->
    <div class="background-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <div class="share-container">
      <el-container class="main-container">
        <!-- 现代化头部 -->
        <el-header class="modern-header">
          <div class="header-content">
            <div class="header-left">
              <div class="brand-section">
                <el-icon class="brand-icon"><Share /></el-icon>
                <h1 class="brand-title">分享管理</h1>
              </div>
              <div class="header-divider"></div>
              <div class="status-section">
                <el-icon class="status-icon"><Link /></el-icon>
                <span class="status-text">分享文件管理</span>
                <span class="status-tag">分享中心</span>
              </div>
            </div>
            <div class="header-right">
              <div class="share-tabs">
                <router-link to="/share/myshare" class="tab-link">
                  <el-button class="tab-btn">
                    <el-icon><UserFilled /></el-icon>
                    我的分享
                  </el-button>
                </router-link>
                <router-link to="/share/other" class="tab-link">
                  <el-button class="tab-btn">
                    <el-icon><User /></el-icon>
                    最近转存
                  </el-button>
                </router-link>
              </div>
            </div>
          </div>
        </el-header>

        <el-container class="content-container">
          <!-- 左侧导航 -->
          <el-aside class="modern-aside">
            <div class="nav-wrapper">
              <LeftTabs />
            </div>
          </el-aside>

          <!-- 主内容区域 -->
          <el-container class="main-content-container">
            <el-main class="modern-main">
              <div class="content-wrapper">
                <RouterView />
              </div>
            </el-main>
            
            <!-- 底部 -->
            <el-footer class="modern-footer">
              <div class="footer-content">
                <GithubFooter />
              </div>
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
import { Share, Link, UserFilled, User } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.modern-share-layout {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, 
    #5cbeff 0%, 
    #7288ff 25%, 
    #be6eff 50%, 
    #68a9ff 75%, 
    #b291ff 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  overflow: hidden;

  .background-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    .floating-shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      animation: float 20s infinite ease-in-out;

      &.shape-1 {
        width: 300px;
        height: 300px;
        top: -150px;
        left: -150px;
        animation-delay: 0s;
      }

      &.shape-2 {
        width: 200px;
        height: 200px;
        top: 50%;
        right: -100px;
        animation-delay: 7s;
      }

      &.shape-3 {
        width: 150px;
        height: 150px;
        bottom: -75px;
        left: 30%;
        animation-delay: 14s;
      }
    }
  }

  .share-container {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.05);

    .main-container {
      min-height: 100vh;

      .modern-header {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0;
        height: 80px;

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          padding: 0 32px;

          .header-left {
            display: flex;
            align-items: center;
            gap: 24px;

            .brand-section {
              display: flex;
              align-items: center;
              gap: 12px;

              .brand-icon {
                font-size: 28px;
                color: rgba(255, 255, 255, 0.9);
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
              }

              .brand-title {
                font-size: 24px;
                font-weight: 700;
                color: rgba(255, 255, 255, 0.95);
                margin: 0;
                letter-spacing: 1px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
            }

            .header-divider {
              width: 1px;
              height: 32px;
              background: rgba(255, 255, 255, 0.3);
            }

            .status-section {
              display: flex;
              align-items: center;
              gap: 8px;

              .status-icon {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
              }

              .status-text {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 500;
              }

              .status-tag {
                font-size: 14px;
                font-weight: 700;
                color: #ffeb3b;
                background: rgba(255, 235, 59, 0.2);
                padding: 4px 12px;
                border-radius: 12px;
                backdrop-filter: blur(10px);
              }
            }
          }

          .header-right {
            .share-tabs {
              display: flex;
              gap: 12px;

              .tab-link {
                text-decoration: none;

                .tab-btn {
                  color: rgba(255, 255, 255, 0.8);
                  background: rgba(255, 255, 255, 0.1);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  border-radius: 12px;
                  padding: 12px 20px;
                  transition: all 0.3s ease;
                  font-weight: 600;

                  &:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.05);
                  }
                }

                &.router-link-active {
                  .tab-btn {
                    background: rgba(64, 158, 255, 0.8);
                    border-color: rgba(64, 158, 255, 0.8);
                    color: white;
                    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
                  }
                }
              }
            }
          }
        }
      }

      .content-container {
        .modern-aside {
          width: 240px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);

          .nav-wrapper {
            height: 100%;
            padding: 20px 0;
          }
        }

        .main-content-container {
          .modern-main {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px 0 0 0;
            margin: 0;
            padding: 0;
            position: relative;
            overflow: hidden;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(102, 126, 234, 0.3) 50%, 
                transparent 100%);
            }

            .content-wrapper {
              padding: 40px;
              min-height: calc(100vh - 160px);
              animation: fadeInUp 0.6s ease-out;
            }
          }

          .modern-footer {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            height: 80px;
            padding: 0;

            .footer-content {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              padding: 0 32px;
            }
          }
        }
      }
    }
  }
}

// 动画定义
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-30px) rotate(120deg);
  }
  66% {
    transform: translateY(15px) rotate(240deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .modern-share-layout {
    .share-container {
      .main-container {
        .content-container {
          .modern-aside {
            width: 160px;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .modern-share-layout {
    .share-container {
      .main-container {
        .modern-header {
          height: auto;
          padding: 16px 0;

          .header-content {
            padding: 0 16px;
            flex-direction: column;
            gap: 16px;

            .header-left {
              gap: 16px;

              .brand-section {
                .brand-title {
                  font-size: 20px;
                }
              }

              .status-section {
                .status-text {
                  display: none;
                }
              }
            }

            .header-right {
              .share-tabs {
                width: 100%;
                justify-content: center;

                .tab-link {
                  flex: 1;

                  .tab-btn {
                    width: 100%;
                    padding: 12px 16px;
                  }
                }
              }
            }
          }
        }

        .content-container {
          .modern-aside {
            width: 200px;
          }

          .main-content-container {
            .modern-main {
              .content-wrapper {
                padding: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
