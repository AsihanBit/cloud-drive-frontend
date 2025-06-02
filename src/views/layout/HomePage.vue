<template>
  <div class="modern-home-layout">
    <!-- 背景动画 -->
    <div class="background-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <div class="home-container">
      <el-container class="main-container">
        <!-- 现代化头部 -->
        <el-header class="modern-header">
          <div class="header-content">
            <div class="header-left">
              <div class="brand-section">
                <el-icon class="brand-icon"><HomeFilled /></el-icon>
                <h1 class="brand-title">项目介绍</h1>
              </div>
              <div class="header-divider"></div>
              <div class="status-section">
                <el-icon class="status-icon"><InfoFilled /></el-icon>
                <span class="status-text">云盘管理系统</span>
                <span class="version-tag">v1.0</span>
              </div>
            </div>
            <div class="header-right">
              <div class="user-section">
                <el-icon class="user-icon"><Star /></el-icon>
                <span class="welcome-text">技术栈展示</span>
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
                <div class="intro-content">
                  <!-- 技术栈卡片 -->
                  <div class="tech-grid">
                    <el-card class="tech-card frontend-card" shadow="hover">
                      <template #header>
                        <div class="card-header">
                          <el-icon class="card-icon"><Monitor /></el-icon>
                          <span class="card-title">前端技术</span>
                        </div>
                      </template>
                      <div class="tech-list">
                        <div class="tech-item">
                          <el-tag type="success" effect="light">Vue.js</el-tag>
                          <span class="tech-desc">现代前端框架</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="info" effect="light">TypeScript</el-tag>
                          <span class="tech-desc">类型安全</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="warning" effect="light">Pinia</el-tag>
                          <span class="tech-desc">状态管理</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="danger" effect="light">Web Worker</el-tag>
                          <span class="tech-desc">大文件分片处理</span>
                        </div>
                      </div>
                    </el-card>

                    <el-card class="tech-card backend-card" shadow="hover">
                      <template #header>
                        <div class="card-header">
                          <el-icon class="card-icon"><Setting /></el-icon>
                          <span class="card-title">后端技术</span>
                        </div>
                      </template>
                      <div class="tech-list">
                        <div class="tech-item">
                          <el-tag type="success" effect="light">SpringBoot</el-tag>
                          <span class="tech-desc">Java框架</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="info" effect="light">MyBatis</el-tag>
                          <span class="tech-desc">ORM映射</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="warning" effect="light">ElasticSearch</el-tag>
                          <span class="tech-desc">文件搜索与高亮</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="danger" effect="light">kkFileView</el-tag>
                          <span class="tech-desc">文件预览</span>
                        </div>
                      </div>
                    </el-card>

                    <el-card class="tech-card database-card" shadow="hover">
                      <template #header>
                        <div class="card-header">
                          <el-icon class="card-icon"><Coin /></el-icon>
                          <span class="card-title">数据存储</span>
                        </div>
                      </template>
                      <div class="tech-list">
                        <div class="tech-item">
                          <el-tag type="success" effect="light">MySQL</el-tag>
                          <span class="tech-desc">关系型数据库</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="info" effect="light">Redis</el-tag>
                          <span class="tech-desc">缓存与续传</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="warning" effect="light">树形邻接表</el-tag>
                          <span class="tech-desc">文件夹结构</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="danger" effect="light">文件秒传</el-tag>
                          <span class="tech-desc">哈希去重</span>
                        </div>
                      </div>
                    </el-card>

                    <el-card class="tech-card tools-card" shadow="hover">
                      <template #header>
                        <div class="card-header">
                          <el-icon class="card-icon"><Tools /></el-icon>
                          <span class="card-title">开发工具</span>
                        </div>
                      </template>
                      <div class="tech-list">
                        <div class="tech-item">
                          <el-tag type="success" effect="light">VSCode</el-tag>
                          <span class="tech-desc">前端IDE</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="info" effect="light">IntelliJ IDEA</el-tag>
                          <span class="tech-desc">后端IDE</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="warning" effect="light">Swagger3</el-tag>
                          <span class="tech-desc">API文档</span>
                        </div>
                        <div class="tech-item">
                          <el-tag type="danger" effect="light">Git + Fork</el-tag>
                          <span class="tech-desc">版本控制</span>
                        </div>
                      </div>
                    </el-card>
                  </div>

                  <!-- 项目状态 -->
                  <div class="project-status">
                    <el-alert
                      title="项目状态"
                      type="info"
                      description="🚀 持续开发中，不断完善功能和用户体验"
                      show-icon
                      :closable="false"
                      class="status-alert"
                    />
                  </div>
                </div>
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
import { 
  HomeFilled, 
  InfoFilled, 
  Star, 
  Monitor, 
  Setting, 
  Coin, 
  Tools 
} from '@element-plus/icons-vue'

import request from '@/utils/request'

const testFileView = async () => {
  try {
    console.log('testFileView')
    const res = await request.get('/user/view/previewtest')
    console.log('Response:', res)
    if (res) {
      const previewUrl = res.data as unknown as string
      if (previewUrl) {
        window.open(previewUrl)
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
.modern-home-layout {
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

  .home-container {
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

              .version-tag {
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
            .user-section {
              display: flex;
              align-items: center;
              gap: 8px;

              .user-icon {
                font-size: 18px;
                color: rgba(255, 255, 255, 0.8);
              }

              .welcome-text {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 500;
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

              .intro-content {
                .tech-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 24px;
                  margin-bottom: 32px;

                  .tech-card {
                    border-radius: 20px;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
                    overflow: hidden;
                    transition: all 0.3s ease;

                    &:hover {
                      transform: translateY(-4px);
                      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
                    }

                    :deep(.el-card__header) {
                      padding: 20px 24px;
                      border-bottom: 1px solid #e5e7eb;

                      .card-header {
                        display: flex;
                        align-items: center;
                        gap: 12px;

                        .card-icon {
                          font-size: 20px;
                        }

                        .card-title {
                          font-size: 18px;
                          font-weight: 600;
                          color: #1a1a1a;
                        }
                      }
                    }

                    :deep(.el-card__body) {
                      padding: 24px;
                    }

                    &.frontend-card {
                      :deep(.el-card__header) {
                        background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
                        
                        .card-header .card-icon {
                          color: #0284c7;
                        }
                      }
                    }

                    &.backend-card {
                      :deep(.el-card__header) {
                        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                        
                        .card-header .card-icon {
                          color: #16a34a;
                        }
                      }
                    }

                    &.database-card {
                      :deep(.el-card__header) {
                        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                        
                        .card-header .card-icon {
                          color: #d97706;
                        }
                      }
                    }

                    &.tools-card {
                      :deep(.el-card__header) {
                        background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
                        
                        .card-header .card-icon {
                          color: #be185d;
                        }
                      }
                    }

                    .tech-list {
                      display: flex;
                      flex-direction: column;
                      gap: 16px;

                      .tech-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 12px 16px;
                        background: #f8fafc;
                        border-radius: 12px;
                        transition: all 0.3s ease;

                        &:hover {
                          background: #f1f5f9;
                          transform: translateX(4px);
                        }

                        .el-tag {
                          min-width: 100px;
                          text-align: center;
                          font-weight: 600;
                        }

                        .tech-desc {
                          color: #6b7280;
                          font-size: 14px;
                          font-weight: 500;
                        }
                      }
                    }
                  }
                }

                .project-status {
                  .status-alert {
                    border-radius: 16px;
                    border: 1px solid #3b82f6;
                    
                    :deep(.el-alert__content) {
                      .el-alert__title {
                        font-size: 18px;
                        font-weight: 700;
                      }
                      
                      .el-alert__description {
                        font-size: 16px;
                        margin-top: 8px;
                      }
                    }
                  }
                }
              }
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
  .modern-home-layout {
    .home-container {
      .main-container {
        .content-container {
          .main-content-container {
            .modern-main {
              .content-wrapper {
                .intro-content {
                  .tech-grid {
                    grid-template-columns: 1fr;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .modern-home-layout {
    .home-container {
      .main-container {
        .modern-header {
          height: 70px;

          .header-content {
            padding: 0 16px;
            flex-direction: column;
            gap: 8px;

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
