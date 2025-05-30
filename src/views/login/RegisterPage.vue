<template>
  <div class="register-page">
    <!-- 装饰性背景元素 -->
    <div class="bg-decoration">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>

    <div class="common-layout">
      <el-container>
        <!-- 左侧品牌展示 -->
        <el-main class="left-panel">
          <div class="brand-section">
            <div class="brand-header">
              <div class="logo-container">
                <div class="logo-icon">
                  <i class="fas fa-user-plus"></i>
                </div>
                <div class="title">
                  <div class="register-title-floating">
                    <!-- 注册标题浮动效果 -->
                    <span class="floating-letter" style="--letter-delay: 0s;">加</span>
                    <span class="floating-letter" style="--letter-delay: 0.1s;">入</span>
                    <span class="word-space">&nbsp;</span>
                    <span class="floating-letter" style="--letter-delay: 0.3s;">C</span>
                    <span class="floating-letter" style="--letter-delay: 0.4s;">l</span>
                    <span class="floating-letter" style="--letter-delay: 0.5s;">o</span>
                    <span class="floating-letter" style="--letter-delay: 0.6s;">u</span>
                    <span class="floating-letter" style="--letter-delay: 0.7s;">d</span>
                    <span class="word-space">&nbsp;</span>
                    <span class="floating-letter" style="--letter-delay: 0.8s;">D</span>
                    <span class="floating-letter" style="--letter-delay: 0.9s;">r</span>
                    <span class="floating-letter" style="--letter-delay: 1s;">i</span>
                    <span class="floating-letter" style="--letter-delay: 1.1s;">v</span>
                    <span class="floating-letter" style="--letter-delay: 1.2s;">e</span>
                  </div>
                </div>
              </div>
              
              <div class="brand-info">
                <div class="subtitle">
                  <p>开启您的云端之旅</p>
                  <p class="description">简单 · 快速 · 安全</p>
                </div>
              </div>
            </div>

            <div class="register-steps">
              <div class="steps-title">
                <p>注册只需两步</p>
              </div>
              
              <div class="steps-grid">
                <div class="step-card">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>填写信息</h4>
                    <p>输入用户名和密码</p>
                  </div>
                </div>
                
                <div class="step-card">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>开始使用</h4>
                    <p>立即享受云存储服务</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 优势展示卡片 -->
          <div class="advantage-card">
            <div class="advantage-icon">
              <i class="fas fa-gift"></i>
            </div>
            <div class="advantage-content">
              <p>"注册即享10GB免费存储空间，无限制文件上传下载！"</p>
            </div>
            <div class="advantage-footer">
              <div class="gift-tag">
                <i class="fas fa-star"></i>
                <span>新用户专享</span>
              </div>
            </div>
          </div>

          <div class="github-link">
            <div class="github-header">
              <i class="fab fa-github"></i>
              <p>开源项目</p>
            </div>
            <div class="github-buttons">
              <a href="https://github.com/AsihanBit/cloud-drive-frontend" target="_blank">
                <i class="fas fa-code"></i>
                前端源码
              </a>
              <a href="https://github.com/AsihanBit/cloud-drive-backend" target="_blank">
                <i class="fas fa-server"></i>
                后端源码
              </a>
            </div>
          </div>
        </el-main>

        <el-aside class="right-panel">
          <!-- 装饰性粒子效果 -->
          <div class="particles">
            <div class="particle" v-for="i in 60" :key="i"></div>
          </div>

          <div class="register-card">
            <div class="card-header">
              <div class="welcome-icon">
                <i class="fas fa-user-plus"></i>
              </div>
              <h3 class="register-title">创建账户</h3>
              <p class="register-subtitle">加入Cloud Drive，开启您的云端存储之旅</p>
            </div>
            
            <el-form ref="registerFormRef" :model="loginForm" :rules="rules" class="register-form">
              <!-- 用户名 -->
              <el-form-item prop="username">
                <div class="input-wrapper">
                  <el-input 
                    v-model="loginForm.username" 
                    placeholder="请输入用户名"
                    size="large"
                    class="elegant-input"
                  >
                    <template #prefix>
                      <i class="fas fa-user"></i>
                    </template>
                  </el-input>
                </div>
              </el-form-item>

              <!-- 昵称 -->
              <el-form-item prop="nickname">
                <div class="input-wrapper">
                  <el-tooltip
                    content="不输入默认就是用户名"
                    placement="top"
                    effect="customized"
                    :show-after="200"
                  >
                    <el-input 
                      v-model="loginForm.nickname" 
                      placeholder="请输入昵称（可选）"
                      size="large"
                      class="elegant-input"
                    >
                      <template #prefix>
                        <i class="fas fa-id-card"></i>
                      </template>
                      <template #suffix>
                        <i class="fas fa-question-circle tooltip-icon"></i>
                      </template>
                    </el-input>
                  </el-tooltip>
                </div>
              </el-form-item>
              
              <!-- 密码 -->
              <el-form-item prop="password">
                <div class="input-wrapper">
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                    size="large"
                    class="elegant-input"
                    show-password
                  >
                    <template #prefix>
                      <i class="fas fa-lock"></i>
                    </template>
                  </el-input>
                </div>
              </el-form-item>

              <!-- 确认密码 -->
              <el-form-item prop="checkPass">
                <div class="input-wrapper">
                  <el-input
                    v-model="loginForm.checkPass"
                    type="password"
                    placeholder="请再次输入密码"
                    size="large"
                    class="elegant-input"
                    show-password
                  >
                    <template #prefix>
                      <i class="fas fa-shield-alt"></i>
                    </template>
                  </el-input>
                </div>
              </el-form-item>

              <!-- 操作按钮区域 -->
              <div class="action-buttons">
                <el-button 
                  type="primary" 
                  size="large"
                  class="submit-btn elegant-btn" 
                  @click="submitForm(registerFormRef)"
                >
                  <i class="fas fa-user-plus" style="margin-right: 8px"></i>
                  立即注册
                </el-button>
                
                <div class="secondary-actions">
                  <el-button 
                    size="large"
                    class="reset-btn elegant-btn-secondary" 
                    @click="resetForm(registerFormRef)"
                  >
                    <i class="fas fa-redo" style="margin-right: 6px"></i>
                    重置表单
                  </el-button>
                  <el-button 
                    size="large"
                    class="login-btn elegant-btn-secondary" 
                    @click="clickToLogin()"
                  >
                    <i class="fas fa-sign-in-alt" style="margin-right: 6px"></i>
                    已有账号
                  </el-button>
                </div>
              </div>

              <!-- 附加信息 -->
              <div class="additional-info">
                <div class="divider">
                  <span>服务条款</span>
                </div>
                <div class="terms-info">
                  <p>注册即表示您同意我们的<a href="#" class="link-item">服务条款</a>和<a href="#" class="link-item">隐私政策</a></p>
                </div>
              </div>
            </el-form>
          </div>
        </el-aside>
      </el-container>
    </div>

    <!-- 底部装饰 -->
    <div class="footer-decoration">
      <div class="wave-pattern"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { userRegister } from '@/api/login'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import type { Result } from '@/types/fileType'

// 获取当前路由对象
const route = useRoute()
// 获取路由实例
const router = useRouter()

// 表单信息
const loginForm = ref({
  username: '',
  nickname: '',
  password: '',
  checkPass: '',
})
// 表单实例
const registerFormRef = ref<FormInstance>()

// 用户名验证函数
const validateUsername = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (value.length < 3) {
    callback(new Error('用户名长度不能少于3位'))
  } else if (value.length > 20) {
    callback(new Error('用户名长度不能超过20位'))
  } else {
    callback()
  }
}

// 昵称验证函数（可选）
const validateNickname = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value && value.length > 50) {
    callback(new Error('昵称长度不能超过50位'))
  } else {
    callback()
  }
}

// 密码验证函数
const validatePass = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('密码长度不能少于6位'))
  } else if (value.length > 50) {
    callback(new Error('密码长度不能超过50位'))
  } else {
    callback()
  }
}

// 确认密码验证
const validatePass2 = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== loginForm.value.password) {
    callback(new Error('两次输入密码不相同'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  nickname: [{ validator: validateNickname, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

// 提交表单的方法
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) {
      return
    }

    console.log('register submit!')

    try {
      const res = (await userRegister(
        loginForm.value.username,
        loginForm.value.password,
        loginForm.value.nickname,
      )) as unknown as Result

      if (res.code === 0) {
        ElNotification({
          title: '注册失败',
          message: res.msg,
          type: 'error',
        })
      } else if (res.code === 1) {
        ElNotification({
          title: '注册成功',
          message: '欢迎加入Cloud Drive！请前往登录',
          type: 'success',
        })
        
        // 成功后跳转到登录页面
        const backUrl = route.query.backUrl
        const url = backUrl ? `/login?backUrl=${backUrl}` : '/login'
        router.replace(url)
      }
    } catch (error) {
      ElNotification({
        title: '请求失败',
        message: '注册请求发生错误，请稍后重试',
        type: 'error',
      })
      console.error('注册请求失败:', error)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 去登录界面
const clickToLogin = () => {
  router.push('/login')
}
</script>

<style lang="less" scoped>
// === 优雅极简主义美学设计 - 注册页面版本 ===

// CSS变量用于整体等比例缩放
:root {
  --scale-factor: 1;
}

@media (max-width: 1200px) {
  :root {
    --scale-factor: 0.9;
  }
}

@media (max-width: 1000px) {
  :root {
    --scale-factor: 0.8;
  }
}

@media (max-width: 768px) {
  :root {
    --scale-factor: 0.7;
  }
}

@media (max-width: 480px) {
  :root {
    --scale-factor: 0.6;
  }
}

.register-page {
  height: 100vh;
  width: 100%;
  position: relative;
  // 注册页面使用暖色调渐变
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 40%, #fecfef 60%, #ff9a9e 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  overflow: hidden;
  box-sizing: border-box;

  // 背景动态效果 - 暖色调版本
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 154, 158, 0.5) 0%, transparent 60%),
      radial-gradient(circle at 80% 20%, rgba(254, 207, 239, 0.5) 0%, transparent 60%),
      radial-gradient(circle at 40% 40%, rgba(255, 182, 193, 0.4) 0%, transparent 60%);
    animation: backgroundPulse 6s ease-in-out infinite alternate;
    pointer-events: none;
    z-index: 0;
  }

  // 添加更多背景动态层
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.15) 25%, transparent 50%, rgba(255, 255, 255, 0.2) 75%, transparent 100%);
    animation: backgroundShimmer 4s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  // 装饰性背景
  .bg-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;

    .floating-shapes {
      position: relative;
      width: 100%;
      height: 100%;

      .shape {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
        animation: float 8s ease-in-out infinite;

        &.shape-1 {
          width: 120px;
          height: 120px;
          top: 15%;
          left: 10%;
          animation-delay: 0s;
        }

        &.shape-2 {
          width: 80px;
          height: 80px;
          top: 25%;
          right: 15%;
          animation-delay: 2s;
        }

        &.shape-3 {
          width: 60px;
          height: 60px;
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }

        &.shape-4 {
          width: 100px;
          height: 100px;
          bottom: 15%;
          right: 25%;
          animation-delay: 1s;
        }

        &.shape-5 {
          width: 40px;
          height: 40px;
          top: 50%;
          left: 45%;
          animation-delay: 3s;
        }
      }
    }
  }

  // 底部装饰波纹
  .footer-decoration {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    pointer-events: none;
    z-index: 1;

    .wave-pattern {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.1) 0%, 
        rgba(255, 255, 255, 0.05) 50%, 
        rgba(255, 255, 255, 0.1) 100%);
      clip-path: polygon(0 50%, 100% 80%, 100% 100%, 0% 100%);
    }
  }

  .common-layout {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vh 1vw;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    overflow: hidden;

    .el-container {
      height: 96vh;
      width: 100%;
      max-width: 1200px;
      min-width: auto;
      max-height: 800px;
      margin: 0 auto;
      border-radius: calc(24px * var(--scale-factor, 1));
      overflow: hidden;
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.15),
        0 12px 24px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-sizing: border-box;

      // 左侧品牌面板 - 暖色调
      .left-panel {
        flex: 1.4;
        background: linear-gradient(135deg, 
          rgba(255, 154, 158, 0.9) 0%, 
          rgba(254, 207, 239, 0.9) 50%, 
          rgba(255, 154, 158, 0.9) 100%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: calc(50px * var(--scale-factor, 1)) calc(40px * var(--scale-factor, 1));
        position: relative;
        height: 100%;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .brand-section {
          text-align: center;
          z-index: 2;

          .brand-header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: calc(40px * var(--scale-factor, 1));

            .logo-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: calc(40px * var(--scale-factor, 1));

              .logo-icon {
                width: calc(80px * var(--scale-factor, 1));
                height: calc(80px * var(--scale-factor, 1));
                background: rgba(255, 255, 255, 0.15);
                border-radius: calc(20px * var(--scale-factor, 1));
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: calc(20px * var(--scale-factor, 1));
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;

                &:hover {
                  transform: translateY(calc(-5px * var(--scale-factor, 1)));
                  background: rgba(255, 255, 255, 0.2);
                }

                i {
                  font-size: calc(2.5rem * var(--scale-factor, 1));
                  color: white;
                  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
                }
              }

              .title {
                .register-title-floating {
                  display: inline-block;
                  font-size: calc(2.8rem * var(--scale-factor, 1));
                  font-weight: 700;
                  line-height: 1.1;
                  letter-spacing: calc(0.05em * var(--scale-factor, 1));
                  text-align: center;

                  .floating-letter {
                    display: inline-block;
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    font-weight: 800;
                    margin: 0 calc(0.02em * var(--scale-factor, 1));
                    animation: letterFloating 2.5s ease-in-out infinite;
                    animation-delay: var(--letter-delay, 0s);
                    transition: all 0.3s ease;

                    &:hover {
                      transform: scale(1.1) translateY(-10px);
                      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }
                  }

                  .word-space {
                    display: inline-block;
                    width: calc(0.3em * var(--scale-factor, 1));
                  }
                }
              }
            }

            .brand-info {
              text-align: left;

              .subtitle {
                margin-bottom: calc(20px * var(--scale-factor, 1));

                p {
                  color: rgba(255, 255, 255, 0.9);
                  font-size: calc(1.1rem * var(--scale-factor, 1));
                  font-weight: 500;
                  margin: 0 0 calc(8px * var(--scale-factor, 1)) 0;
                  letter-spacing: 0.3px;
                }

                .description {
                  color: rgba(255, 255, 255, 0.7);
                  font-size: calc(0.95rem * var(--scale-factor, 1));
                  font-weight: 400;
                  letter-spacing: 2px;
                }
              }
            }
          }

          .register-steps {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            
            .steps-title {
              margin-bottom: calc(25px * var(--scale-factor, 1));
              text-align: center;

              p {
                color: rgba(255, 255, 255, 0.9);
                font-size: calc(1.2rem * var(--scale-factor, 1));
                font-weight: 600;
                letter-spacing: 0.3px;
                margin: 0;
                text-align: center;
              }
            }
            
            .steps-grid {
              display: flex;
              flex-direction: row;
              gap: calc(14px * var(--scale-factor, 1));
              width: 100%;
              max-width: calc(380px * var(--scale-factor, 1));
              margin: 0 auto;

              .step-card {
                background: rgba(255, 255, 255, 0.12);
                border-radius: calc(16px * var(--scale-factor, 1));
                padding: calc(14px * var(--scale-factor, 1)) calc(16px * var(--scale-factor, 1));
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                flex: 1;

                &:hover {
                  background: rgba(255, 255, 255, 0.18);
                  transform: translateY(calc(-3px * var(--scale-factor, 1)));
                  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }

                .step-number {
                  width: calc(35px * var(--scale-factor, 1));
                  height: calc(35px * var(--scale-factor, 1));
                  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: calc(10px * var(--scale-factor, 1));
                  flex-shrink: 0;
                  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
                  font-size: calc(1rem * var(--scale-factor, 1));
                  font-weight: 700;
                  color: #ff9a9e;
                }

                .step-content {
                  flex: 1;

                  h4 {
                    color: white;
                    font-size: calc(0.9rem * var(--scale-factor, 1));
                    font-weight: 600;
                    margin: 0 0 calc(4px * var(--scale-factor, 1)) 0;
                    letter-spacing: 0.3px;
                  }

                  p {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: calc(0.75rem * var(--scale-factor, 1));
                    font-weight: 400;
                    margin: 0;
                    line-height: 1.3;
                  }
                }
              }
            }
          }
        }

        // 优势展示卡片
        .advantage-card {
          background: rgba(255, 255, 255, 0.12);
          border-radius: calc(16px * var(--scale-factor, 1));
          padding: calc(20px * var(--scale-factor, 1));
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: calc(20px * var(--scale-factor, 1));
          margin-top: calc(30px * var(--scale-factor, 1));

          &:hover {
            background: rgba(255, 255, 255, 0.18);
            transform: translateY(calc(-3px * var(--scale-factor, 1)));
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          .advantage-icon {
            font-size: calc(2rem * var(--scale-factor, 1));
            color: #ffd700;
            margin-bottom: calc(12px * var(--scale-factor, 1));
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          }

          .advantage-content {
            color: rgba(255, 255, 255, 0.9);
            font-size: calc(1rem * var(--scale-factor, 1));
            font-weight: 500;
            margin: 0 0 calc(16px * var(--scale-factor, 1)) 0;
            line-height: 1.5;
          }

          .advantage-footer {
            display: flex;
            justify-content: center;

            .gift-tag {
              display: flex;
              align-items: center;
              background: linear-gradient(135deg, #ffd700 0%, #ffb300 100%);
              color: white;
              padding: calc(6px * var(--scale-factor, 1)) calc(12px * var(--scale-factor, 1));
              border-radius: calc(20px * var(--scale-factor, 1));
              font-size: calc(0.8rem * var(--scale-factor, 1));
              font-weight: 600;
              box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);

              i {
                margin-right: calc(6px * var(--scale-factor, 1));
                font-size: calc(0.9rem * var(--scale-factor, 1));
              }
            }
          }
        }

        .github-link {
          z-index: 2;
          text-align: center;
          width: 100%;

          .github-header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;

            i {
              color: white;
              font-size: 1.3rem;
              margin-right: 10px;
              opacity: 0.9;
            }

            p {
              color: rgba(255, 255, 255, 0.9);
              font-size: 1rem;
              font-weight: 600;
              margin: 0;
            }
          }

          .github-buttons {
            display: flex;
            gap: 12px;
            justify-content: center;

            a {
              display: flex;
              align-items: center;
              padding: 12px 18px;
              background: rgba(255, 255, 255, 0.1);
              color: rgba(255, 255, 255, 0.95);
              text-decoration: none;
              border-radius: 12px;
              font-weight: 500;
              font-size: 0.9rem;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

              i {
                margin-right: 8px;
                font-size: 0.95rem;
              }

              &:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }

      // 右侧注册面板
      .right-panel {
        flex: 1;
        background: linear-gradient(135deg, 
          rgba(255, 255, 255, 0.95) 0%, 
          rgba(248, 250, 252, 0.95) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
        overflow: hidden;
        backdrop-filter: blur(20px);

        // 粒子效果 - 暖色调
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;

          .particle {
            position: absolute;
            width: calc(3px * var(--scale-factor, 1));
            height: calc(3px * var(--scale-factor, 1));
            background: linear-gradient(45deg, #ff9a9e, #fecfef);
            border-radius: 50%;
            opacity: 0.7;
            animation: particleFloat 6s linear infinite;

            // 60个粒子的位置
            &:nth-child(1) { left: 3%; animation-delay: 0s; }
            &:nth-child(2) { left: 8%; animation-delay: 0.3s; }
            &:nth-child(3) { left: 13%; animation-delay: 0.6s; }
            &:nth-child(4) { left: 18%; animation-delay: 0.9s; }
            &:nth-child(5) { left: 23%; animation-delay: 1.2s; }
            &:nth-child(6) { left: 28%; animation-delay: 1.5s; }
            &:nth-child(7) { left: 33%; animation-delay: 1.8s; }
            &:nth-child(8) { left: 38%; animation-delay: 2.1s; }
            &:nth-child(9) { left: 43%; animation-delay: 2.4s; }
            &:nth-child(10) { left: 48%; animation-delay: 2.7s; }
            &:nth-child(11) { left: 53%; animation-delay: 3s; }
            &:nth-child(12) { left: 58%; animation-delay: 3.3s; }
            &:nth-child(13) { left: 63%; animation-delay: 3.6s; }
            &:nth-child(14) { left: 68%; animation-delay: 3.9s; }
            &:nth-child(15) { left: 73%; animation-delay: 4.2s; }
            &:nth-child(16) { left: 78%; animation-delay: 4.5s; }
            &:nth-child(17) { left: 83%; animation-delay: 4.8s; }
            &:nth-child(18) { left: 88%; animation-delay: 5.1s; }
            &:nth-child(19) { left: 93%; animation-delay: 5.4s; }
            &:nth-child(20) { left: 98%; animation-delay: 5.7s; }
            &:nth-child(21) { left: 6%; animation-delay: 0.2s; }
            &:nth-child(22) { left: 11%; animation-delay: 0.5s; }
            &:nth-child(23) { left: 16%; animation-delay: 0.8s; }
            &:nth-child(24) { left: 21%; animation-delay: 1.1s; }
            &:nth-child(25) { left: 26%; animation-delay: 1.4s; }
            &:nth-child(26) { left: 31%; animation-delay: 1.7s; }
            &:nth-child(27) { left: 36%; animation-delay: 2s; }
            &:nth-child(28) { left: 41%; animation-delay: 2.3s; }
            &:nth-child(29) { left: 46%; animation-delay: 2.6s; }
            &:nth-child(30) { left: 51%; animation-delay: 2.9s; }
            &:nth-child(31) { left: 56%; animation-delay: 3.2s; }
            &:nth-child(32) { left: 61%; animation-delay: 3.5s; }
            &:nth-child(33) { left: 66%; animation-delay: 3.8s; }
            &:nth-child(34) { left: 71%; animation-delay: 4.1s; }
            &:nth-child(35) { left: 76%; animation-delay: 4.4s; }
            &:nth-child(36) { left: 81%; animation-delay: 4.7s; }
            &:nth-child(37) { left: 86%; animation-delay: 5s; }
            &:nth-child(38) { left: 91%; animation-delay: 5.3s; }
            &:nth-child(39) { left: 96%; animation-delay: 5.6s; }
            &:nth-child(40) { left: 1%; animation-delay: 5.9s; }
            &:nth-child(41) { left: 4%; animation-delay: 0.1s; }
            &:nth-child(42) { left: 9%; animation-delay: 0.4s; }
            &:nth-child(43) { left: 14%; animation-delay: 0.7s; }
            &:nth-child(44) { left: 19%; animation-delay: 1s; }
            &:nth-child(45) { left: 24%; animation-delay: 1.3s; }
            &:nth-child(46) { left: 29%; animation-delay: 1.6s; }
            &:nth-child(47) { left: 34%; animation-delay: 1.9s; }
            &:nth-child(48) { left: 39%; animation-delay: 2.2s; }
            &:nth-child(49) { left: 44%; animation-delay: 2.5s; }
            &:nth-child(50) { left: 49%; animation-delay: 2.8s; }
            &:nth-child(51) { left: 54%; animation-delay: 3.1s; }
            &:nth-child(52) { left: 59%; animation-delay: 3.4s; }
            &:nth-child(53) { left: 64%; animation-delay: 3.7s; }
            &:nth-child(54) { left: 69%; animation-delay: 4s; }
            &:nth-child(55) { left: 74%; animation-delay: 4.3s; }
            &:nth-child(56) { left: 79%; animation-delay: 4.6s; }
            &:nth-child(57) { left: 84%; animation-delay: 4.9s; }
            &:nth-child(58) { left: 89%; animation-delay: 5.2s; }
            &:nth-child(59) { left: 94%; animation-delay: 5.5s; }
            &:nth-child(60) { left: 99%; animation-delay: 5.8s; }
          }
        }

        .register-card {
          width: 85%;
          max-width: calc(400px * var(--scale-factor, 1));
          background: rgba(255, 255, 255, 0.9);
          border-radius: calc(20px * var(--scale-factor, 1));
          padding: calc(28px * var(--scale-factor, 1)) calc(25px * var(--scale-factor, 1));
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.08),
            0 8px 16px rgba(0, 0, 0, 0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 2;

          .card-header {
            text-align: center;
            margin-bottom: calc(22px * var(--scale-factor, 1));

            .welcome-icon {
              width: calc(55px * var(--scale-factor, 1));
              height: calc(55px * var(--scale-factor, 1));
              background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
              border-radius: calc(15px * var(--scale-factor, 1));
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto calc(14px * var(--scale-factor, 1)) auto;
              box-shadow: 0 8px 20px rgba(255, 154, 158, 0.3);

              i {
                color: white;
                font-size: calc(1.6rem * var(--scale-factor, 1));
              }
            }

            .register-title {
              font-size: calc(1.5rem * var(--scale-factor, 1));
              font-weight: 700;
              color: #1a202c;
              margin: 0 0 calc(8px * var(--scale-factor, 1)) 0;
              letter-spacing: -0.025em;
            }

            .register-subtitle {
              font-size: calc(0.85rem * var(--scale-factor, 1));
              color: #64748b;
              margin: 0;
              font-weight: 400;
              line-height: 1.5;
            }
          }

          .register-form {
            .el-form-item {
              margin-bottom: calc(16px * var(--scale-factor, 1));
              display: flex;
              justify-content: center;

              .input-wrapper {
                position: relative;
                width: 90%;
                max-width: calc(320px * var(--scale-factor, 1));

                .elegant-input {
                  width: 100%;
                  :deep(.el-input__wrapper) {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: calc(14px * var(--scale-factor, 1));
                    padding: calc(12px * var(--scale-factor, 1)) calc(16px * var(--scale-factor, 1));
                    box-shadow: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                      border-color: #cbd5e1;
                      background: #f1f5f9;
                    }

                    &.is-focus {
                      border-color: #ff9a9e;
                      background: #ffffff;
                      box-shadow: 0 0 0 4px rgba(255, 154, 158, 0.1);
                    }
                  }

                  :deep(.el-input__inner) {
                    font-size: calc(0.9rem * var(--scale-factor, 1));
                    color: #1a202c;
                    font-weight: 500;
                    height: auto;
                    text-align: center !important;
                    width: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    padding: 0 calc(35px * var(--scale-factor, 1)) 0 calc(35px * var(--scale-factor, 1));

                    &::placeholder {
                      color: #94a3b8;
                      font-weight: 400;
                      text-align: center !important;
                    }

                    &:focus {
                      text-align: center !important;
                    }
                  }

                  :deep(.el-input__prefix) {
                    position: absolute;
                    left: calc(15px * var(--scale-factor, 1));
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 2;
                    color: #64748b;
                    font-size: calc(1rem * var(--scale-factor, 1));
                    pointer-events: none;
                  }

                  :deep(.el-input__suffix) {
                    position: absolute;
                    right: calc(15px * var(--scale-factor, 1));
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 2;
                    color: #64748b;
                    font-size: calc(1rem * var(--scale-factor, 1));
                    
                    .tooltip-icon {
                      color: #94a3b8;
                      font-size: calc(0.9rem * var(--scale-factor, 1));
                      cursor: help;
                      transition: all 0.3s ease;
                      opacity: 0.7;
                      
                      &:hover {
                        color: #ff6167;
                        opacity: 1;
                        transform: scale(1.1);
                      }
                      
                      &:active {
                        transform: scale(0.95);
                      }
                    }
                  }
                }
              }
            }

            .action-buttons {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 90%;
              max-width: calc(320px * var(--scale-factor, 1));
              margin: 0 auto;

              .elegant-btn {
                width: 100%;
                background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
                border: none;
                border-radius: calc(14px * var(--scale-factor, 1));
                padding: calc(12px * var(--scale-factor, 1)) calc(24px * var(--scale-factor, 1));
                font-size: calc(1rem * var(--scale-factor, 1));
                font-weight: 600;
                margin-bottom: calc(16px * var(--scale-factor, 1));
                box-shadow: 0 8px 20px rgba(255, 154, 158, 0.3);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                &:hover {
                  transform: translateY(-3px);
                  box-shadow: 0 12px 28px rgba(255, 154, 158, 0.4);
                }
              }

              .secondary-actions {
                display: flex;
                gap: calc(10px * var(--scale-factor, 1));
                width: 100%;

                .elegant-btn-secondary {
                  flex: 1;
                  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                  color: #475569;
                  border: 2px solid #e2e8f0;
                  border-radius: calc(14px * var(--scale-factor, 1));
                  padding: calc(8px * var(--scale-factor, 1)) calc(14px * var(--scale-factor, 1));
                  font-weight: 600;
                  font-size: calc(0.8rem * var(--scale-factor, 1));
                  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                  &:hover {
                    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
                    border-color: #cbd5e1;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(71, 85, 105, 0.15);
                  }
                }
              }
            }

            .additional-info {
              margin-top: calc(20px * var(--scale-factor, 1));
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 90%;
              max-width: calc(320px * var(--scale-factor, 1));
              margin-left: auto;
              margin-right: auto;

              .divider {
                position: relative;
                text-align: center;
                margin: calc(14px * var(--scale-factor, 1)) 0;
                width: 100%;

                &::before {
                  content: '';
                  position: absolute;
                  top: 50%;
                  left: 0;
                  right: 0;
                  height: 1px;
                  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
                }

                span {
                  background: white;
                  color: #94a3b8;
                  font-size: calc(0.75rem * var(--scale-factor, 1));
                  padding: 0 calc(12px * var(--scale-factor, 1));
                  position: relative;
                  z-index: 1;
                }
              }

              .terms-info {
                text-align: center;
                font-size: calc(0.75rem * var(--scale-factor, 1));
                color: #64748b;
                line-height: 1.5;
                width: 100%;

                .link-item {
                  color: #ff9a9e;
                  text-decoration: none;
                  font-weight: 500;
                  transition: all 0.2s ease;

                  &:hover {
                    color: #f76c81;
                    text-decoration: underline;
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

// 动画定义
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
    opacity: 0.8;
  }
}

@keyframes particleFloat {
  0% { 
    transform: translateY(100vh) rotate(0deg); 
    opacity: 0; 
  }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { 
    transform: translateY(-100px) rotate(360deg); 
    opacity: 0; 
  }
}

@keyframes backgroundPulse {
  0% {
    opacity: 0.6;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.15) rotate(180deg);
  }
  100% {
    opacity: 0.6;
    transform: scale(1) rotate(360deg);
  }
}

@keyframes backgroundShimmer {
  0% {
    transform: translateX(-100%) skewX(-15deg);
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
    opacity: 0.3;
  }
}

@keyframes letterFloating {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    filter: brightness(1);
  }
  25% { 
    transform: translateY(-12px) rotate(2deg);
    filter: brightness(1.2);
  }
  50% { 
    transform: translateY(-8px) rotate(0deg);
    filter: brightness(1.1);
  }
  75% { 
    transform: translateY(-15px) rotate(-2deg);
    filter: brightness(1.3);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .register-page {
    .common-layout {
      padding: 1vh 1vw;
      overflow: hidden;

      .el-container {
        flex-direction: column;
        height: 98vh;
        width: 100%;
        max-width: 100%;
        min-width: auto;

        .left-panel {
          flex: none;
          height: auto;
          min-height: 40vh;
          padding: calc(30px * var(--scale-factor, 1)) calc(20px * var(--scale-factor, 1));

          .brand-section .brand-header {
            flex-direction: column;
            margin-bottom: calc(30px * var(--scale-factor, 1));

            .logo-container {
              margin-right: 0;
              margin-bottom: calc(20px * var(--scale-factor, 1));
            }

            .brand-info {
              text-align: center;
            }
          }

          .register-steps .steps-grid {
            flex-direction: row;
            max-width: 100%;

            .step-card {
              flex: 1;
              min-width: 0;
              flex-direction: column;
              text-align: center;
              height: auto;

              .step-number {
                margin-right: 0;
                margin-bottom: calc(8px * var(--scale-factor, 1));
              }
            }
          }

          .github-link .github-buttons {
            flex-direction: column;
            gap: calc(8px * var(--scale-factor, 1));

            a {
              padding: calc(10px * var(--scale-factor, 1)) calc(16px * var(--scale-factor, 1));
              font-size: calc(0.85rem * var(--scale-factor, 1));
            }
          }
        }

        .right-panel {
          flex: 1;
          height: auto;
          padding: calc(20px * var(--scale-factor, 1)) calc(15px * var(--scale-factor, 1));

          .register-card {
            width: 95%;
            max-width: 100%;
            border-radius: calc(20px * var(--scale-factor, 1));

            .register-form {
              .action-buttons .secondary-actions {
                flex-direction: column;
                gap: calc(10px * var(--scale-factor, 1));

                .elegant-btn-secondary {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 额外的小屏幕适配
@media (max-width: 480px) {
  .register-page {
    .common-layout {
      padding: 0.5vh 0.5vw;
      
      .el-container {
        width: 100%;
        max-width: 100%;
        border-radius: calc(16px * var(--scale-factor, 1));

        .left-panel {
          .register-steps .steps-grid {
            flex-direction: column;

            .step-card {
              flex-direction: row;
              text-align: left;

              .step-number {
                margin-right: calc(12px * var(--scale-factor, 1));
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}

// 全局样式重置
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

// 移动端tooltip优化
@media (max-width: 768px) {
  .el-popper.is-customized {
    font-size: 12px;
    padding: 8px 12px;
    max-width: 200px;
    text-align: center;
  }
}
</style>
<style lang="less">
/* 引入 FontAwesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Element Plus 组件优化 */
.el-notification {
  border-radius: 16px !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.el-button {
  &:focus {
    outline: none;
  }
}

/* 自定义 el-tooltip 的样式 */
.el-popper.is-customized {
  background: linear-gradient(135deg, #ff6267 0%, #ff84d8 100%);
  color: #fff;
  border: 1px solid #ff9a9e;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(255, 154, 158, 0.3);
  font-size: 13px;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

/* 自定义箭头的样式 */
.el-popper.is-customized .el-popper__arrow::before {
  background: #ff9a9e;
  border: 1px solid #ff9a9e;
}
</style>
