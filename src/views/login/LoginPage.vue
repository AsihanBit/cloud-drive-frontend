<template>
  <div class="login-page">
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
        <!-- 左侧 Cloud Drive -->
        <el-main class="left-panel">
          <div class="brand-section">
            <div class="brand-header">
              <div class="logo-container">
                <div class="logo-icon">
                  <i class="fas fa-cloud"></i>
                </div>
                <div class="title">
                  <div class="cloud-drive-floating">
                    <!-- Cloud 字母逐个浮动 -->
                    <span class="floating-letter" style="--letter-delay: 0s;">C</span>
                    <span class="floating-letter" style="--letter-delay: 0.1s;">l</span>
                    <span class="floating-letter" style="--letter-delay: 0.2s;">o</span>
                    <span class="floating-letter" style="--letter-delay: 0.3s;">u</span>
                    <span class="floating-letter" style="--letter-delay: 0.4s;">d</span>
                    <span class="word-space">&nbsp;</span>
                    <!-- Drive 字母逐个浮动 -->
                    <span class="floating-letter drive-style" style="--letter-delay: 0.5s;">D</span>
                    <span class="floating-letter drive-style" style="--letter-delay: 0.6s;">r</span>
                    <span class="floating-letter drive-style" style="--letter-delay: 0.7s;">i</span>
                    <span class="floating-letter drive-style" style="--letter-delay: 0.8s;">v</span>
                    <span class="floating-letter drive-style" style="--letter-delay: 0.9s;">e</span>
                  </div>
                </div>
              </div>
              
              <div class="brand-info">
                <div class="subtitle">
                  <p>企业级云存储解决方案</p>
                  <p class="description">安全 · 高效 · 智能</p>
                </div>
              </div>
            </div>

            <div class="features-section">
              <div class="features-title">
                <p>为什么选择我们？</p>
              </div>
              
              <div class="features-grid">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <div class="feature-content">
                    <h4>安全可靠</h4>
                    <p>企业级加密保护</p>
                  </div>
                </div>
                
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-rocket"></i>
                  </div>
                  <div class="feature-content">
                    <h4>快速同步</h4>
                    <p>毫秒级文件同步</p>
                  </div>
                </div>
                
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="feature-content">
                    <h4>轻松分享</h4>
                    <p>一键分享好友</p>
                  </div>
                </div>
                
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="feature-content">
                    <h4>多端同步</h4>
                    <p>手机电脑无缝切换</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 用户评价卡片 -->
          <div class="testimonial-card">
            <div class="quote-icon">
              <i class="fas fa-quote-left"></i>
            </div>
            <div class="testimonial-content">
              <p>"这是我用过最好用的云存储服务，界面简洁，速度超快！"</p>
            </div>
            <div class="user-info">
              <div class="user-avatar">
                <!-- <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format" alt="用户头像" /> -->

                <img src="https://ts1.tc.mm.bing.net/th/id/R-C.66d7b796377883a92aad65b283ef1f84?rik=sQ%2fKoYAcr%2bOwsw&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140305%2f1-140305131415.jpg&ehk=Hxl%2fQ9pbEiuuybrGWTEPJOhvrFK9C3vyCcWicooXfNE%3d&risl=&pid=ImgRaw&r=0" alt="用户头像" />
              </div>
              <div class="user-details">
                <div class="user-name">张小美</div>
                <div class="user-title">设计师</div>
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
            <div class="particle" v-for="i in 80" :key="i"></div>
          </div>

          <div class="login-card">
            <div class="card-header">
              <div class="welcome-icon">
                <i class="fas fa-user-circle"></i>
              </div>
              <h3 class="login-title">用户登录</h3>
              <p class="login-subtitle">欢迎回来，请输入您的账户信息</p>
            </div>
            
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
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

              <!-- 验证码按钮区域 -->
              <div class="captcha-section">
                <el-button 
                  @click="toggleCaptcha"
                  class="captcha-btn"
                  :class="{ 'captcha-active': showCaptcha }"
                >
                  <i class="fas" :class="showCaptcha ? 'fa-eye-slash' : 'fa-shield-alt'" style="margin-right: 8px"></i>
                  {{ showCaptcha ? '隐藏安全验证' : '启用安全验证' }}
                </el-button>
              </div>

              <!-- 操作按钮区域 -->
              <div class="action-buttons">
                <el-button 
                  type="primary" 
                  size="large"
                  class="submit-btn elegant-btn" 
                  @click="submitForm(loginFormRef)"
                >
                  <i class="fas fa-sign-in-alt" style="margin-right: 8px"></i>
                  立即登录
                </el-button>
                
                <div class="secondary-actions">
                  <el-button 
                    size="large"
                    class="reset-btn elegant-btn-secondary" 
                    @click="resetForm(loginFormRef)"
                  >
                    <i class="fas fa-redo" style="margin-right: 6px"></i>
                    重置表单
                  </el-button>
                  <el-button 
                    size="large"
                    class="register-btn elegant-btn-secondary" 
                    @click="clickToRegister()"
                  >
                    <i class="fas fa-user-plus" style="margin-right: 6px"></i>
                    注册账号
                  </el-button>
                </div>
              </div>

              <!-- 附加信息 -->
              <div class="additional-info">
                <div class="divider">
                  <span>其他选项</span>
                </div>
                <div class="extra-links">
                  <a href="#" class="link-item">
                    <i class="fas fa-question-circle"></i>
                    忘记密码？
                  </a>
                  <a href="#" class="link-item">
                    <i class="fas fa-headset"></i>
                    联系支持
                  </a>
                </div>
              </div>
            </el-form>
          </div>

          <!-- 验证码浮层 -->
          <div v-if="showCaptcha" class="captcha-overlay" @click="closeCaptchaOverlay">
            <div class="captcha-modal" @click.stop>
              <div class="captcha-header">
                <div class="captcha-title">
                  <i class="fas fa-shield-check"></i>
                  <span>安全验证</span>
                </div>
                <el-button 
                  text 
                  @click="toggleCaptcha"
                  class="close-btn"
                >
                  <i class="fas fa-times"></i>
                </el-button>
              </div>
              <div id="captcha-box" class="captcha-container">
                <div class="captcha-placeholder">
                  <i class="fas fa-puzzle-piece captcha-icon"></i>
                  <p>请完成安全验证</p>
                  <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { userLogin } from '@/api/login'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElNotification } from 'element-plus'
import type { Result, UserInfo } from '@/types/fileType'

// 声明全局 window 对象上的 initTAC 方法
declare global {
  interface Window {
    initTAC: (url: string, config: any, style?: any) => Promise<any>
    TAC: any
  }
}

// 获取当前路由对象
const route = useRoute()
// 获取路由实例
const router = useRouter()
// 获取用户信息
const userStore = useUserStore()
// 验证码显示状态
const showCaptcha = ref(false)
// TAC实例
let tacInstance: any = null
// 保存的授权令牌
const savedAuthToken = ref<string | null>(null)

// 表单信息
const loginForm = ref({
  username: '',
  password: '',
})
// 表单实例
const loginFormRef = ref<FormInstance>()

// 组件初始化时从sessionStorage获取之前保存的authToken
onMounted(() => {
  const tokenStr = sessionStorage.getItem('authToken')
  if (tokenStr) {
    try {
      // 尝试解析JSON格式的token数据
      const tokenData = JSON.parse(tokenStr)
      if (tokenData.token && tokenData.timestamp && tokenData.expiresIn) {
        const now = Date.now()
        const elapsed = now - tokenData.timestamp
        
        if (elapsed < tokenData.expiresIn) {
          // token还有效
          savedAuthToken.value = tokenData.token
          console.log('从sessionStorage获取到有效的授权令牌:', tokenData.token)
          console.log(`剩余有效时间: ${Math.round((tokenData.expiresIn - elapsed) / 1000 / 60)} 分钟`)
        } else {
          // token已过期
          clearAuthToken()
          console.log('sessionStorage中的authToken已过期，已清除')
        }
      } else {
        // 旧格式的token，直接清除
        clearAuthToken()
        console.log('发现旧格式的authToken，已清除')
      }
    } catch (error) {
      // 如果解析失败，可能是旧格式的字符串token，也清除
      clearAuthToken()
      console.log('authToken格式错误，已清除:', error)
    }
  }

  // 监听页面关闭和刷新事件
  const handleBeforeUnload = () => {
    clearAuthToken()
  }
  
  window.addEventListener('beforeunload', handleBeforeUnload)
  
  // 设置定时器，30分钟后自动清除authToken（避免长时间存储）
  const tokenTimeout = setTimeout(() => {
    if (savedAuthToken.value) {
      clearAuthToken()
      console.log('authToken已过期，自动清除')
    }
  }, 30 * 60 * 1000) // 30分钟

  // 组件卸载时清理
  onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    clearTimeout(tokenTimeout)
    clearAuthToken()
  })
})

// 清除授权令牌的函数
const clearAuthToken = () => {
  sessionStorage.removeItem('authToken')
  savedAuthToken.value = null
  console.log('已清除授权令牌')
}

// 页面卸载时清除authToken
onUnmounted(() => {
  clearAuthToken()
})

// 监听页面关闭事件，清除authToken
onMounted(() => {
  const token = sessionStorage.getItem('authToken')
  if (token) {
    savedAuthToken.value = token
    console.log('从sessionStorage获取到之前的授权令牌:', token)
  }

  // 监听页面关闭和刷新事件
  const handleBeforeUnload = () => {
    clearAuthToken()
  }
  
  window.addEventListener('beforeunload', handleBeforeUnload)
  
  // 组件卸载时移除监听器
  onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    clearAuthToken()
  })
})

// 用户名验证函数
const validateUsername = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (value.length < 3) {
    callback(new Error('用户名长度不能少于3位'))
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
  } else {
    callback()
  }
}

// 验证码
const captchaFunction = () => {
  // 清理之前的验证码实例
  if (tacInstance) {
    try {
      tacInstance.destroyWindow()
    } catch (error) {
      console.log('清理之前的验证码实例失败:', error)
    }
  }

  // config 对象为TAC验证码的一些配置和验证的回调
  const config = {
    requestCaptchaDataUrl: '/api/captcha/gen',
    validCaptchaUrl: '/api/captcha/check',
    bindEl: '#captcha-box',
    validSuccess: (res: any, c: any, tac: any) => {
      tac.destroyWindow()
      showCaptcha.value = false
      console.log('验证成功，后端返回的数据为', res)
      
      // 保存授权令牌到sessionStorage和本地变量（带时间戳）
      if (res.data?.authToken) {
        const authToken = res.data.authToken
        const tokenData = {
          token: authToken,
          timestamp: Date.now(),
          // expiresIn: 30 * 60 * 1000 // 30分钟有效期
          expiresIn: 1 * 60 * 1000 // 1分钟有效期
        }
        sessionStorage.setItem('authToken', JSON.stringify(tokenData))
        savedAuthToken.value = authToken
        console.log('验证码验证成功，授权令牌已保存到sessionStorage (1分钟有效):', authToken)
        
        // 设置30分钟后自动清除
        setTimeout(() => {
          if (savedAuthToken.value === authToken) {
            clearAuthToken()
            console.log('验证码authToken已过期，自动清除')
          }
        }, 1 * 60 * 1000)
      }
      
      ElNotification({
        title: '验证成功',
        message: '安全验证通过，可以继续登录',
        type: 'success',
        duration: 3000,
      })
    },
    validFail: (res: any, c: any, tac: any) => {
      console.log('验证码验证失败回调...')
      tac.reloadCaptcha()
    },
    btnRefreshFun: (el: any, tac: any) => {
      console.log('刷新按钮触发事件...')
      tac.reloadCaptcha()
    },
    btnCloseFun: (el: any, tac: any) => {
      console.log('关闭按钮触发事件...')
      showCaptcha.value = false
      tac.destroyWindow()
    },
  }

  const style = {
    logoUrl: null,
  }

  // 检查 window.initTAC 是否存在
  if (typeof window.initTAC !== 'function') {
    console.error('TAC验证码库未正确加载')
    // 显示占位内容而不是错误
    return
  }

  window
    .initTAC('./tac', config, style)
    .then((tac: any) => {
      tacInstance = tac
      try {
        tac.init()
      } catch (error) {
        console.error('验证码初始化失败:', error)
      }
    })
    .catch((e: any) => {
      console.error('初始化tac失败', e)
    })
}

// 切换验证码显示/隐藏
const toggleCaptcha = () => {
  showCaptcha.value = !showCaptcha.value
  if (showCaptcha.value) {
    setTimeout(() => {
      captchaFunction()
    }, 300)
  } else {
    if (tacInstance) {
      try {
        tacInstance.destroyWindow()
      } catch (error) {
        console.log('销毁验证码实例失败:', error)
      }
    }
    const captchaBox = document.getElementById('captcha-box')
    if (captchaBox) {
      captchaBox.innerHTML = `
        <div class="captcha-placeholder">
          <i class="fas fa-puzzle-piece captcha-icon"></i>
          <p>请完成安全验证</p>
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `
    }
  }
}

// 点击浮层背景关闭
const closeCaptchaOverlay = () => {
  showCaptcha.value = false
  if (tacInstance) {
    try {
      tacInstance.destroyWindow()
    } catch (error) {
      console.log('销毁验证码实例失败:', error)
    }
  }
}

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
})

// 提交表单的方法
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) {
      return
    }

    console.log('submit!')
    console.log('当前保存的authToken:', savedAuthToken.value)
    console.log('sessionStorage中的authToken:', sessionStorage.getItem('authToken'))

    try {
      // 调用userLogin时传递保存的authToken
      const res = (await userLogin(
        loginForm.value.username,
        loginForm.value.password,
        savedAuthToken.value // 传递之前保存的授权令牌
      )) as unknown as Result

      if (res.code === 0) {
        // 登录失败时清除authToken
        clearAuthToken()
        ElNotification({
          title: '登录失败',
          message: res.msg,
          type: 'error',
        })
      } else if (res.code === 1) {
        // 登录成功后，清除旧的authToken，如果后端返回新的token则保存
        clearAuthToken()
        
        if (res.data && typeof res.data === 'object' && 'authToken' in res.data) {
          const newAuthToken = (res.data as any).authToken
          sessionStorage.setItem('authToken', newAuthToken)
          savedAuthToken.value = newAuthToken
          console.log('登录成功，保存新的授权令牌:', newAuthToken)
        }
        
        ElNotification({
          title: '登录成功',
          message: '欢迎回来！',
          type: 'success',
        })
        console.log('LoginPage,submitForm', res)
        const userInfo = res.data as unknown as UserInfo
        userStore.setToken(userInfo.userId, userInfo.username, userInfo.token)

        const backUrl = route.query.backUrl
        const url = Array.isArray(backUrl) ? backUrl[0] || '/home' : backUrl || '/home'
        router.replace(url)
      }
    } catch (error) {
      // 请求失败时也清除authToken
      clearAuthToken()
      ElNotification({
        title: '请求失败',
        message: '登录请求发生错误，请稍后重试',
        type: 'error',
      })
      console.error('登录请求失败:', error)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  // 重置表单时也清除authToken
  clearAuthToken()
  console.log('表单重置，已清除authToken')
}

const clickToRegister = () => {
  router.push('/register')
}
</script>

<style lang="less" scoped>
// === 优雅极简主义美学设计 ===

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

.login-page {
  height: 100vh;
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 40%, #ff6b9d 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  overflow: hidden;
  box-sizing: border-box;

  // 新增背景动态效果 - 增强版
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.5) 0%, transparent 60%), // 增强透明度
      radial-gradient(circle at 80% 20%, rgba(255, 107, 157, 0.5) 0%, transparent 60%),
      radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.4) 0%, transparent 60%);
    animation: backgroundPulse 6s ease-in-out infinite alternate; // 加快动画速度
    pointer-events: none;
    z-index: 0;
  }

  // 添加更多背景动态层 - 增强版
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.15) 25%, transparent 50%, rgba(255, 255, 255, 0.2) 75%, transparent 100%); // 增强对比度
    animation: backgroundShimmer 4s linear infinite; // 加快闪光动画
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
    overflow: hidden; // 防止子元素溢出

    .el-container {
      height: 96vh;
      width: 100%;
      max-width: 1200px; // 从1400px缩小到1200px，防止在小屏幕上溢出
      min-width: auto; // 移除最小宽度限制
      max-height: 800px;
      margin: 0 auto;
      border-radius: calc(24px * var(--scale-factor, 1));
      overflow: hidden;
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.15),
        0 12px 24px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-sizing: border-box; // 确保边框包含在尺寸内

      // 左侧品牌面板
      .left-panel {
        flex: 1.4;
        background: linear-gradient(135deg, 
          rgba(102, 126, 234, 0.9) 0%, 
          rgba(118, 75, 162, 0.9) 50%, 
          rgba(102, 126, 234, 0.9) 100%);
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
                .cloud-drive-floating {
                  display: inline-block;
                  font-size: calc(3.2rem * var(--scale-factor, 1));
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
                    width: calc(0.5em * var(--scale-factor, 1));
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

          .features-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            
            .features-title {
              margin-bottom: calc(30px * var(--scale-factor, 1));
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
            
            .features-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: calc(16px * var(--scale-factor, 1));
              width: 100%;
              max-width: calc(380px * var(--scale-factor, 1));
              margin: 0 auto;
              justify-items: center;

              .feature-card {
                background: rgba(255, 255, 255, 0.12);
                border-radius: calc(16px * var(--scale-factor, 1));
                padding: calc(16px * var(--scale-factor, 1)) calc(20px * var(--scale-factor, 1));
                display: flex;
                align-items: center;
                text-align: left;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                height: calc(70px * var(--scale-factor, 1));
                width: 100%;
                justify-self: stretch;

                &:hover {
                  background: rgba(255, 255, 255, 0.18);
                  transform: translateY(calc(-3px * var(--scale-factor, 1)));
                  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }

                .feature-icon {
                  width: calc(40px * var(--scale-factor, 1));
                  height: calc(40px * var(--scale-factor, 1));
                  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
                  border-radius: calc(12px * var(--scale-factor, 1));
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: calc(12px * var(--scale-factor, 1));
                  flex-shrink: 0;
                  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);

                  i {
                    font-size: calc(1.2rem * var(--scale-factor, 1));
                    color: #667eea;
                  }
                }

                .feature-content {
                  flex: 1;

                  h4 {
                    color: white;
                    font-size: calc(0.95rem * var(--scale-factor, 1));
                    font-weight: 600;
                    margin: 0 0 calc(4px * var(--scale-factor, 1)) 0;
                    letter-spacing: 0.3px;
                  }

                  p {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: calc(0.78rem * var(--scale-factor, 1));
                    font-weight: 400;
                    margin: 0;
                    line-height: 1.3;
                  }
                }
              }
            }
          }
        }

        // 用户评价卡片
        .testimonial-card {
          background: rgba(255, 255, 255, 0.12);
          border-radius: calc(16px * var(--scale-factor, 1));
          padding: calc(20px * var(--scale-factor, 1));
          text-align: left;
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

          .quote-icon {
            font-size: calc(1.5rem * var(--scale-factor, 1));
            color: rgba(255, 255, 255, 0.4);
            margin-bottom: calc(12px * var(--scale-factor, 1));
          }

          .testimonial-content {
            color: rgba(255, 255, 255, 0.9);
            font-size: calc(1rem * var(--scale-factor, 1));
            font-weight: 500;
            margin: 0 0 calc(16px * var(--scale-factor, 1)) 0;
            line-height: 1.5;
          }

          .user-info {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .user-avatar {
              width: calc(45px * var(--scale-factor, 1));
              height: calc(45px * var(--scale-factor, 1));
              border-radius: 50%;
              overflow: hidden;
              margin-right: calc(12px * var(--scale-factor, 1));

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }

            .user-details {
              text-align: left;

              .user-name {
                color: white;
                font-size: calc(0.9rem * var(--scale-factor, 1));
                font-weight: 600;
                margin: 0 0 calc(2px * var(--scale-factor, 1)) 0;
              }

              .user-title {
                color: rgba(255, 255, 255, 0.7);
                font-size: calc(0.8rem * var(--scale-factor, 1));
                font-weight: 400;
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

      // 右侧登录面板
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

        // 粒子效果
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
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            opacity: 0.7;
            animation: particleFloat 6s linear infinite;

            // 前40个粒子
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

            // 新增40个粒子
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
            &:nth-child(61) { left: 2%; animation-delay: 0.15s; }
            &:nth-child(62) { left: 7%; animation-delay: 0.45s; }
            &:nth-child(63) { left: 12%; animation-delay: 0.75s; }
            &:nth-child(64) { left: 17%; animation-delay: 1.05s; }
            &:nth-child(65) { left: 22%; animation-delay: 1.35s; }
            &:nth-child(66) { left: 27%; animation-delay: 1.65s; }
            &:nth-child(67) { left: 32%; animation-delay: 1.95s; }
            &:nth-child(68) { left: 37%; animation-delay: 2.25s; }
            &:nth-child(69) { left: 42%; animation-delay: 2.55s; }
            &:nth-child(70) { left: 47%; animation-delay: 2.85s; }
            &:nth-child(71) { left: 52%; animation-delay: 3.15s; }
            &:nth-child(72) { left: 57%; animation-delay: 3.45s; }
            &:nth-child(73) { left: 62%; animation-delay: 3.75s; }
            &:nth-child(74) { left: 67%; animation-delay: 4.05s; }
            &:nth-child(75) { left: 72%; animation-delay: 4.35s; }
            &:nth-child(76) { left: 77%; animation-delay: 4.65s; }
            &:nth-child(77) { left: 82%; animation-delay: 4.95s; }
            &:nth-child(78) { left: 87%; animation-delay: 5.25s; }
            &:nth-child(79) { left: 92%; animation-delay: 5.55s; }
            &:nth-child(80) { left: 97%; animation-delay: 5.85s; }
          }
        }

        .login-card {
          width: 82%;
          max-width: calc(380px * var(--scale-factor, 1));
          background: rgba(255, 255, 255, 0.9);
          border-radius: calc(20px * var(--scale-factor, 1));
          padding: calc(35px * var(--scale-factor, 1)) calc(30px * var(--scale-factor, 1));
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.08),
            0 8px 16px rgba(0, 0, 0, 0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 2;

          .card-header {
            text-align: center;
            margin-bottom: calc(28px * var(--scale-factor, 1));

            .welcome-icon {
              width: calc(60px * var(--scale-factor, 1));
              height: calc(60px * var(--scale-factor, 1));
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: calc(15px * var(--scale-factor, 1));
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto calc(16px * var(--scale-factor, 1)) auto;
              box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);

              i {
                color: white;
                font-size: calc(1.7rem * var(--scale-factor, 1));
              }
            }

            .login-title {
              font-size: calc(1.6rem * var(--scale-factor, 1));
              font-weight: 700;
              color: #1a202c;
              margin: 0 0 calc(10px * var(--scale-factor, 1)) 0;
              letter-spacing: -0.025em;
            }

            .login-subtitle {
              font-size: calc(0.9rem * var(--scale-factor, 1));
              color: #64748b;
              margin: 0;
              font-weight: 400;
              line-height: 1.5;
            }
          }

          .login-form {
            .el-form-item {
              margin-bottom: calc(20px * var(--scale-factor, 1));

              .input-wrapper {
                position: relative;

                .elegant-input {
                  :deep(.el-input__wrapper) {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: calc(14px * var(--scale-factor, 1));
                    padding: calc(14px * var(--scale-factor, 1)) calc(18px * var(--scale-factor, 1));
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
                      border-color: #667eea;
                      background: #ffffff;
                      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
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
                    padding: 0 calc(35px * var(--scale-factor, 1)) 0 calc(35px * var(--scale-factor, 1)); // 左右留空间给图标

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
                  }
                }
              }
            }

            .captcha-section {
              margin: calc(25px * var(--scale-factor, 1)) 0;
              text-align: center;

              .captcha-btn {
                background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
                border: none;
                border-radius: calc(14px * var(--scale-factor, 1));
                padding: calc(12px * var(--scale-factor, 1)) calc(24px * var(--scale-factor, 1));
                font-size: calc(0.9rem * var(--scale-factor, 1));
                font-weight: 600;
                color: white;
                box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                &:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
                }

                &.captcha-active {
                  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

                  &:hover {
                    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
                  }
                }
              }
            }

            .action-buttons {
              .elegant-btn {
                width: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                border-radius: calc(14px * var(--scale-factor, 1));
                padding: calc(14px * var(--scale-factor, 1)) calc(28px * var(--scale-factor, 1));
                font-size: calc(1rem * var(--scale-factor, 1));
                font-weight: 600;
                margin-bottom: calc(18px * var(--scale-factor, 1));
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                &:hover {
                  transform: translateY(-3px);
                  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.4);
                }
              }

              .secondary-actions {
                display: flex;
                gap: calc(10px * var(--scale-factor, 1));

                .elegant-btn-secondary {
                  flex: 1;
                  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                  color: #475569;
                  border: 2px solid #e2e8f0;
                  border-radius: calc(14px * var(--scale-factor, 1));
                  padding: calc(10px * var(--scale-factor, 1)) calc(16px * var(--scale-factor, 1));
                  font-weight: 600;
                  font-size: calc(0.85rem * var(--scale-factor, 1));
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
              margin-top: calc(25px * var(--scale-factor, 1));

              .divider {
                position: relative;
                text-align: center;
                margin: calc(16px * var(--scale-factor, 1)) 0;

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
                  font-size: calc(0.8rem * var(--scale-factor, 1));
                  padding: 0 calc(14px * var(--scale-factor, 1));
                  position: relative;
                  z-index: 1;
                }
              }

              .extra-links {
                display: flex;
                justify-content: center;
                gap: calc(16px * var(--scale-factor, 1));

                .link-item {
                  display: flex;
                  align-items: center;
                  color: #64748b;
                  text-decoration: none;
                  font-size: calc(0.85rem * var(--scale-factor, 1));
                  font-weight: 500;
                  padding: calc(6px * var(--scale-factor, 1)) calc(10px * var(--scale-factor, 1));
                  border-radius: calc(6px * var(--scale-factor, 1));
                  transition: all 0.3s ease;

                  i {
                    margin-right: calc(5px * var(--scale-factor, 1));
                    font-size: calc(0.8rem * var(--scale-factor, 1));
                  }

                  &:hover {
                    color: #667eea;
                    background: rgba(102, 126, 234, 0.05);
                  }
                }
              }
            }
          }
        }

        // 验证码浮层
        .captcha-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-out;

          .captcha-modal {
            background: #ffffff;
            border-radius: 24px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            max-width: 500px;
            width: 90vw;
            max-height: 90vh;
            animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);

            .captcha-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 24px 32px;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              border-bottom: 1px solid #e2e8f0;

              .captcha-title {
                display: flex;
                align-items: center;
                font-size: 1.2rem;
                font-weight: 600;
                color: #1a202c;

                i {
                  margin-right: 10px;
                  color: #10b981;
                  font-size: 1.3rem;
                }
              }

              .close-btn {
                color: #64748b;
                font-size: 1.2rem;
                padding: 8px;
                border-radius: 12px;
                transition: all 0.2s ease;

                &:hover {
                  background: rgba(100, 116, 139, 0.1);
                  color: #475569;
                }
              }
            }

            .captcha-container {
              padding: 32px;
              min-height: 300px;
              display: flex;
              justify-content: center;
              align-items: center;

              .captcha-placeholder {
                text-align: center;

                .captcha-icon {
                  font-size: 3rem;
                  color: #667eea;
                  margin-bottom: 20px;
                  animation: pulse 2s ease-in-out infinite;
                }

                p {
                  color: #64748b;
                  font-size: 1.1rem;
                  margin: 0 0 30px 0;
                  font-weight: 500;
                }

                .loading-dots {
                  display: flex;
                  justify-content: center;
                  gap: 8px;

                  span {
                    width: 8px;
                    height: 8px;
                    background: #667eea;
                    border-radius: 50%;
                    animation: loadingDot 1.4s ease-in-out infinite both;

                    &:nth-child(1) { animation-delay: -0.32s; }
                    &:nth-child(2) { animation-delay: -0.16s; }
                    &:nth-child(3) { animation-delay: 0s; }
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.7;
  }
  50% { 
    transform: scale(1.1); 
    opacity: 1;
  }
}

@keyframes loadingDot {
  0%, 80%, 100% { 
    transform: scale(0);
    opacity: 0.5;
  } 
  40% { 
    transform: scale(1);
    opacity: 1;
  }
}

// 新增动画效果
@keyframes titleFloat {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-8px); 
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

// 新增字母浮动动画
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
  .login-page {
    .common-layout {
      padding: 1vh 1vw;
      overflow: hidden;

      .el-container {
        flex-direction: column;
        height: 98vh;
        width: 100%;
        max-width: 100%; // 确保移动端不会超出屏幕
        min-width: auto;

        .left-panel {
          flex: none;
          height: auto;
          min-height: 50vh;
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

          .login-card {
            width: 95%;
            max-width: 100%; // 确保移动端卡片不会超出
            border-radius: calc(20px * var(--scale-factor, 1));

            .card-header {
              margin-bottom: calc(30px * var(--scale-factor, 1));

              .welcome-icon {
                width: calc(60px * var(--scale-factor, 1));
                height: calc(60px * var(--scale-factor, 1));

                i {
                  font-size: calc(1.8rem * var(--scale-factor, 1));
                }
              }

              .login-title {
                font-size: calc(1.6rem * var(--scale-factor, 1));
              }

              .login-subtitle {
                font-size: calc(0.9rem * var(--scale-factor, 1));
              }
            }

            .login-form {
              .action-buttons .secondary-actions {
                flex-direction: column;
                gap: calc(10px * var(--scale-factor, 1));

                .elegant-btn-secondary {
                  width: 100%;
                }
              }

              .additional-info .extra-links {
                flex-direction: column;
                gap: calc(12px * var(--scale-factor, 1));
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
  .login-page {
    .common-layout {
      padding: 0.5vh 0.5vw;
      
      .el-container {
        width: 100%;
        max-width: 100%;
        border-radius: calc(16px * var(--scale-factor, 1));
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
  overflow-x: hidden; // 强制隐藏横向滚动条
  background: #000;
}

#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden; // 强制隐藏横向滚动条
  margin: 0;
  padding: 0;
}
</style>

<style lang="less">
// 引入 FontAwesome
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

// Element Plus 组件优化
.el-notification {
  border-radius: 16px !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.el-button {
  &:focus {
    outline: none;
  }
}
</style>

