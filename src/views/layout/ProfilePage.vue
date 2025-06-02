<template>
  <div class="modern-profile-layout">
    <!-- 背景动画 -->
    <div class="background-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <div class="profile-container">
      <el-container class="main-container">
        <!-- 现代化头部 -->
        <el-header class="modern-header">
          <div class="header-content">
            <div class="header-left">
              <div class="brand-section">
                <el-icon class="brand-icon"><User /></el-icon>
                <h1 class="brand-title">我的账户</h1>
              </div>
              <div class="header-divider"></div>
              <div class="status-section">
                <el-icon class="status-icon"><InfoFilled /></el-icon>
                <span class="status-text">账户信息管理</span>
                <span class="status-tag">个人中心</span>
              </div>
            </div>
            <div class="header-right">
              <div class="edit-section">
                <el-button 
                  v-if="!isEditing"
                  type="primary" 
                  @click="toggleEdit"
                  class="edit-btn"
                >
                  <el-icon><Edit /></el-icon>
                  编辑信息
                </el-button>
                <div v-else class="edit-actions">
                  <el-button @click="cancelEdit" class="cancel-btn">
                    <el-icon><Close /></el-icon>
                    取消
                  </el-button>
                  <el-button type="primary" @click="saveUserInfo" class="save-btn">
                    <el-icon><Check /></el-icon>
                    保存修改
                  </el-button>
                </div>
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
                <div class="profile-content">
                  <!-- 第一行：基本信息 + 账户信息 -->
                  <div class="top-row">
                    <!-- 用户基本信息卡片 -->
                    <el-card class="info-card" shadow="hover">
                      <template #header>
                        <div class="card-header">
                          <el-icon class="card-icon"><UserFilled /></el-icon>
                          <span class="card-title">基本信息</span>
                        </div>
                      </template>
                      
                      <div class="user-info-section">
                        <!-- 头像区域 -->
                        <div class="avatar-section">
                          <div class="avatar-container">
                            <el-avatar 
                              :size="120" 
                              :src="currentAvatar"
                              class="user-avatar"
                            >
                              <el-icon><UserFilled /></el-icon>
                            </el-avatar>
                            <div v-if="isEditing" class="avatar-upload">
                              <el-button size="small" type="primary" circle>
                                <el-icon><Camera /></el-icon>
                              </el-button>
                            </div>
                          </div>
                          <div class="user-basic">
                            <h3 class="username">{{ userInfo.username }}</h3>
                            <el-tag :type="userInfo.vip ? 'warning' : 'info'" effect="light" class="vip-tag">
                              {{ userInfo.vip ? 'VIP用户' : '普通用户' }}
                            </el-tag>
                            <!-- 头像编辑输入框 -->
                            <div v-if="isEditing" class="avatar-edit-section">
                              <el-form-item label="头像链接" class="avatar-form-item">
                                <el-input 
                                  v-model="editForm.avatar" 
                                  placeholder="请输入头像链接URL"
                                  class="avatar-input"
                                  size="small"
                                >
                                  <template #prefix>
                                    <el-icon><Picture /></el-icon>
                                  </template>
                                </el-input>
                              </el-form-item>
                            </div>
                          </div>
                        </div>

                        <!-- 详细信息 -->
                        <div class="info-details">
                          <el-form :model="editForm" label-width="60px" class="info-form">
                            <el-row :gutter="24">
                              <el-col :span="12">
                                <el-form-item label="用户名">
                                  <el-input 
                                    v-model="userInfo.username" 
                                    disabled 
                                    class="readonly-input"
                                  />
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="昵称">
                                  <el-input 
                                    v-model="editForm.nickname" 
                                    :disabled="!isEditing"
                                    :class="{ 'readonly-input': !isEditing }"
                                    placeholder="请输入昵称"
                                  />
                                </el-form-item>
                              </el-col>
                            </el-row>
                            
                            <el-row :gutter="24">
                              <el-col :span="12">
                                <el-form-item label="年龄">
                                  <el-input-number 
                                    v-model="editForm.age" 
                                    :disabled="!isEditing"
                                    :min="1"
                                    :max="150"
                                    :controls="isEditing"
                                    class="age-input"
                                  />
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="性别">
                                  <el-select 
                                    v-model="editForm.gender" 
                                    :disabled="!isEditing"
                                    placeholder="请选择性别"
                                    class="gender-select"
                                  >
                                    <el-option label="男" :value="1" />
                                    <el-option label="女" :value="0" />
                                  </el-select>
                                </el-form-item>
                              </el-col>
                            </el-row>
                            
                            <el-row :gutter="24">
                              <el-col :span="12">
                                <el-form-item label="手机号">
                                  <el-input 
                                    v-model="editForm.phone" 
                                    :disabled="!isEditing"
                                    :class="{ 'readonly-input': !isEditing }"
                                    placeholder="请输入手机号"
                                  />
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="邮箱">
                                  <el-input 
                                    v-model="editForm.email" 
                                    :disabled="!isEditing"
                                    :class="{ 'readonly-input': !isEditing }"
                                    placeholder="请输入邮箱"
                                  />
                                </el-form-item>
                              </el-col>
                            </el-row>
                          </el-form>
                        </div>
                      </div>
                    </el-card>

                    <!-- 账户信息卡片 -->
                    <el-card class="account-card" shadow="hover">
                      <template #header>
                        <div class="card-header">
                          <el-icon class="card-icon"><InfoFilled /></el-icon>
                          <span class="card-title">账户信息</span>
                        </div>
                      </template>
                      
                      <div class="account-info">
                        <div class="info-row">
                          <span class="info-label">注册时间</span>
                          <span class="info-value">{{ formatDateTime(userInfo.registerTime) }}</span>
                        </div>
                        <div class="info-row">
                          <span class="info-label">最后登录</span>
                          <span class="info-value">{{ formatDateTime(userInfo.lastLoginTime) }}</span>
                        </div>
                        <div class="info-row">
                          <span class="info-label">账户状态</span>
                          <el-tag :type="userInfo.status === 1 ? 'success' : 'danger'" effect="light">
                            {{ userInfo.status === 1 ? '正常' : '异常' }}
                          </el-tag>
                        </div>
                        <div class="info-row">
                          <span class="info-label">用户ID</span>
                          <span class="info-value">{{ userInfo.userId }}</span>
                        </div>
                        <div class="info-row">
                          <span class="info-label">VIP状态</span>
                          <el-tag :type="userInfo.vip ? 'warning' : 'info'" effect="light">
                            {{ userInfo.vip ? 'VIP用户' : '普通用户' }}
                          </el-tag>
                        </div>
                      </div>
                    </el-card>
                  </div>

                  <!-- 第二行：存储空间 + 安全设置 -->
                  <div class="bottom-row">
                    <!-- 存储空间卡片 -->
                    <el-card class="storage-card" shadow="hover">
                      <template #header>
                        <div class="card-header">
                          <el-icon class="card-icon"><DataBoard /></el-icon>
                          <span class="card-title">存储空间</span>
                        </div>
                      </template>
                      
                      <div class="storage-info">
                        <div class="storage-stats">
                          <div class="stat-item">
                            <span class="stat-label">总容量</span>
                            <span class="stat-value">{{ formatSize(userInfo.totalSpace) }}</span>
                          </div>
                          <div class="stat-item">
                            <span class="stat-label">已使用</span>
                            <span class="stat-value used">{{ formatSize(userInfo.usedSpace) }}</span>
                          </div>
                          <div class="stat-item">
                            <span class="stat-label">剩余空间</span>
                            <span class="stat-value available">{{ formatSize(userInfo.totalSpace - userInfo.usedSpace) }}</span>
                          </div>
                        </div>
                        <div class="storage-chart">
                          <canvas ref="storageChartRef" width="200" height="200"></canvas>
                        </div>
                      </div>
                    </el-card>

                    <!-- 安全设置卡片 -->
                    <el-card class="security-card" shadow="hover">
                      <template #header>
                        <div class="card-header">
                          <el-icon class="card-icon"><Lock /></el-icon>
                          <span class="card-title">安全设置</span>
                        </div>
                      </template>
                      
                      <div class="security-content">
                        <div class="security-form">
                          <el-form :model="passwordForm" label-width="80px" ref="passwordFormRef">
                            <el-form-item label="当前密码" prop="oldPassword" :rules="passwordRules.oldPassword">
                              <el-input 
                                v-model="passwordForm.oldPassword" 
                                type="password" 
                                show-password
                                placeholder="请输入当前密码"
                              />
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPassword" :rules="passwordRules.newPassword">
                              <el-input 
                                v-model="passwordForm.newPassword" 
                                type="password" 
                                show-password
                                placeholder="请输入新密码"
                              />
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPassword" :rules="passwordRules.confirmPassword">
                              <el-input 
                                v-model="passwordForm.confirmPassword" 
                                type="password" 
                                show-password
                                placeholder="请再次输入新密码"
                              />
                            </el-form-item>
                          </el-form>
                          <div class="password-actions">
                            <el-button type="primary" @click="handleChangePassword" :loading="passwordLoading">
                              <el-icon><Key /></el-icon>
                              修改密码
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </el-card>
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
import { ref, onMounted, computed, nextTick } from 'vue'
import { 
  User, 
  Edit, 
  Close, 
  Check, 
  UserFilled, 
  Camera, 
  DataBoard, 
  InfoFilled, 
  Lock, 
  Key, 
  Picture 
} from '@element-plus/icons-vue'
import { ElMessage, ElNotification, type FormInstance } from 'element-plus'
import { getUserInfo, modifyUserInfo, changePassword as changePasswordAPI } from '@/api/user'
import type { UserAccountInfo, UserModifyRequest, PasswordChangeRequest } from '@/types/fileType'
import { useRouter } from 'vue-router'
import LeftTabs from '@/components/LeftTabs.vue'
import GithubFooter from '@/components/GithubFooter.vue'

const router = useRouter()

// 响应式数据
const userInfo = ref<UserAccountInfo>({
  userId: 0,
  username: '',
  nickname: '',
  age: 0,
  gender: 0,
  phone: '',
  email: '',
  vip: 0,
  avatar: '',
  usedSpace: 0,
  totalSpace: 0,
  registerTime: '',
  lastLoginTime: '',
  status: 1
})

const isEditing = ref(false)
const editForm = ref<UserModifyRequest>({})
const showPasswordDialog = ref(false)
const passwordFormRef = ref<FormInstance>()
const storageChartRef = ref<HTMLCanvasElement>()
const loading = ref(false)
const passwordLoading = ref(false)

// 密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 计算属性
const usagePercentage = computed(() => {
  if (userInfo.value.totalSpace === 0) return 0
  return (userInfo.value.usedSpace / userInfo.value.totalSpace) * 100
})

const progressColor = computed(() => {
  const percentage = usagePercentage.value
  if (percentage >= 90) return '#ef4444'
  if (percentage >= 70) return '#f59e0b'
  return '#10b981'
})

// 实时预览头像
const currentAvatar = computed(() => {
  if (isEditing.value && editForm.value.avatar) {
    return editForm.value.avatar
  }
  return userInfo.value.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face'
})

// 方法
const fetchUserInfo = async () => {
  try {
    loading.value = true
    const response = await getUserInfo() as any
    console.log('获取用户信息响应:', response)
    
    if (response.code === 1) {
      userInfo.value = response.data
      // 初始化编辑表单
      editForm.value = {
        nickname: userInfo.value.nickname,
        age: userInfo.value.age,
        gender: userInfo.value.gender,
        phone: userInfo.value.phone,
        email: userInfo.value.email,
        avatar: userInfo.value.avatar
      }
      
      nextTick(() => {
        renderStorageChart()
      })
    } else {
      ElMessage.error('获取用户信息失败')
    }
  } catch (error) {
    console.error('获取用户信息错误:', error)
    ElMessage.error('获取用户信息失败')
  } finally {
    loading.value = false
  }
}

const toggleEdit = () => {
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  // 重置编辑表单
  editForm.value = {
    nickname: userInfo.value.nickname,
    age: userInfo.value.age,
    gender: userInfo.value.gender,
    phone: userInfo.value.phone,
    email: userInfo.value.email,
    avatar: userInfo.value.avatar
  }
}

const saveUserInfo = async () => {
  try {
    const response = await modifyUserInfo(editForm.value) as any
    console.log('修改用户信息响应:', response)
    
    if (response.code === 1) {
      userInfo.value = response.data
      isEditing.value = false
      ElMessage.success('信息修改成功')
    } else {
      ElMessage.error('信息修改失败')
    }
  } catch (error) {
    console.error('修改用户信息错误:', error)
    ElMessage.error('信息修改失败')
  }
}

const cancelPasswordChange = () => {
  showPasswordDialog.value = false
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  passwordFormRef.value?.clearValidate()
}

const confirmPasswordChange = async () => {
  if (!passwordFormRef.value) return
  
  await passwordFormRef.value.validate((valid) => {
    if (valid) {
      changePasswordRequest()
    }
  })
}

const changePasswordRequest = async () => {
  try {
    const response = await changePasswordAPI(passwordForm.value) as any
    
    if (response.data && response.code === 1) {
      ElMessage.success('密码修改成功')
      showPasswordDialog.value = false
      resetPasswordForm()
    } else {
      ElMessage.error('密码修改失败')
    }
  } catch (error) {
    console.error('修改密码失败:', error)
    ElMessage.error('密码修改失败')
  }
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}

const formatDateTime = (dateArray: number[] | undefined): string => {
  if (!dateArray || dateArray.length !== 6) {
    return ''
  }
  const [year, month, day, hour, minute, second] = dateArray
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

const renderStorageChart = () => {
  if (!storageChartRef.value) return
  
  const canvas = storageChartRef.value
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    const centerX = 100
    const centerY = 100
    const radius = 80
    
    // 清空画布
    ctx.clearRect(0, 0, 200, 200)
    
    // 绘制背景圆
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#e5e7eb'
    ctx.fill()
    
    // 绘制使用空间
    const usedAngle = (usagePercentage.value / 100) * 2 * Math.PI
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, 0, usedAngle)
    ctx.fillStyle = '#667eea'
    ctx.fill()
  }
}

const handleChangePassword = async () => {
  try {
    passwordLoading.value = true
    const response = await changePasswordAPI(passwordForm.value) as any
    console.log('修改密码响应:', response)
    
    if (response.data && response.code === 1) {
      ElMessage.success('密码修改成功')
      resetPasswordForm()
    } else if (response.data && response.code === 0) {
      ElNotification.error(response.data.msg)
    } else {
      ElMessage.error('密码修改失败')
    }
  } catch (error) {
    console.error('修改密码错误:', error)
    ElMessage.error('密码修改失败')
  } finally {
    passwordLoading.value = false
  }
}

const resetPasswordForm = () => {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  passwordFormRef.value?.clearValidate()
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style lang="less" scoped>
.modern-profile-layout {
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

  .profile-container {
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
            .edit-section {
              .edit-btn, .save-btn, .cancel-btn {
                color: rgba(255, 255, 255, 0.9);
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                transition: all 0.3s ease;

                &:hover {
                  background: rgba(255, 255, 255, 0.25);
                  transform: scale(1.05);
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
              }

              .edit-actions {
                display: flex;
                gap: 12px;
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

              .profile-content {
                .top-row, .bottom-row {
                  display: flex;
                  gap: 24px;
                  margin-bottom: 24px;

                  .el-card {
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
                  }

                  .info-card {
                    flex: 2;

                    :deep(.el-card__header) {
                      background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
                      
                      .card-header .card-icon {
                        color: #0284c7;
                      }
                    }

                    .user-info-section {
                      .avatar-section {
                        display: flex;
                        align-items: center;
                        gap: 24px;
                        margin-bottom: 32px;
                        padding-bottom: 24px;
                        border-bottom: 1px solid #f3f4f6;

                        .avatar-container {
                          position: relative;

                          .user-avatar {
                            border: 4px solid #e5e7eb;
                            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                          }

                          .avatar-upload {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            transform: translate(20%, 20%);
                          }
                        }

                        .user-basic {
                          .username {
                            font-size: 24px;
                            font-weight: 700;
                            color: #1a1a1a;
                            margin: 0 0 8px 0;
                          }

                          .vip-tag {
                            font-size: 12px;
                            font-weight: 600;
                            border-radius: 8px;
                          }

                          .avatar-edit-section {
                            .avatar-form-item {
                              margin-bottom: 20px;
                              margin-top: 16px;

                              :deep(.el-form-item__label) {
                                font-size: 12px;
                                font-weight: 600;
                                color: #6b7280;
                              }
                            }

                            .avatar-input {
                              width: 100%;
                              
                              :deep(.el-input__wrapper) {
                                border-radius: 8px;
                                border: 1px solid #e5e7eb;
                                transition: all 0.3s ease;

                                &:hover {
                                  border-color: #d1d5db;
                                }

                                &.is-focus {
                                  border-color: #667eea;
                                  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
                                }
                              }

                              :deep(.el-input__prefix) {
                                color: #9ca3af;
                              }
                            }
                          }
                        }
                      }

                      .info-details {
                        .info-form {
                          .el-form-item {
                            margin-bottom: 20px;

                            :deep(.el-form-item__label) {
                              font-weight: 600;
                              color: #374151;
                            }

                            .el-input, .el-input-number, .el-select {
                              :deep(.el-input__wrapper) {
                                border-radius: 12px;
                                border: 2px solid #e5e7eb;
                                transition: all 0.3s ease;

                                &:hover {
                                  border-color: #d1d5db;
                                }

                                &.is-focus {
                                  border-color: #667eea;
                                  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                                }
                              }

                              &.readonly-input {
                                :deep(.el-input__wrapper) {
                                  background: #f9fafb;
                                  border-color: #e5e7eb;
                                }
                              }
                            }

                            .age-input {
                              width: 100%;
                            }

                            .gender-select {
                              width: 100%;
                            }
                          }
                        }
                      }
                    }
                  }

                  .account-card {
                    flex: 1;

                    :deep(.el-card__header) {
                      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                      
                      .card-header .card-icon {
                        color: #16a34a;
                      }
                    }

                    .account-info {
                      .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 1px solid #f3f4f6;

                        &:last-child {
                          border-bottom: none;
                        }

                        .info-label {
                          font-weight: 600;
                          color: #6b7280;
                          font-size: 14px;
                        }

                        .info-value {
                          font-weight: 500;
                          color: #1a1a1a;
                          font-size: 14px;
                        }
                      }
                    }
                  }

                  .storage-card {
                    flex: 2;

                    :deep(.el-card__header) {
                      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                      
                      .card-header .card-icon {
                        color: #d97706;
                      }
                    }

                    .storage-info {
                      display: flex;
                      gap: 24px;
                      align-items: center;

                      .storage-stats {
                        flex: 1;

                        .stat-item {
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          padding: 12px 0;
                          border-bottom: 1px solid #f3f4f6;

                          &:last-child {
                            border-bottom: none;
                          }

                          .stat-label {
                            font-weight: 600;
                            color: #6b7280;
                            font-size: 14px;
                          }

                          .stat-value {
                            font-weight: 500;
                            color: #1a1a1a;
                            font-size: 14px;

                            &.used {
                              color: #dc2626;
                            }

                            &.available {
                              color: #16a34a;
                            }
                          }
                        }
                      }

                      .storage-chart {
                        canvas {
                          border-radius: 50%;
                          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        }
                      }
                    }
                  }

                  .security-card {
                    flex: 1;

                    :deep(.el-card__header) {
                      background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
                      
                      .card-header .card-icon {
                        color: #be185d;
                      }
                    }

                    .security-content {
                      .security-form {
                        .el-form-item {
                          margin-bottom: 20px;

                          :deep(.el-form-item__label) {
                            font-weight: 600;
                            color: #374151;
                          }

                          .el-input {
                            :deep(.el-input__wrapper) {
                              border-radius: 12px;
                              border: 2px solid #e5e7eb;
                              transition: all 0.3s ease;

                              &:hover {
                                border-color: #d1d5db;
                              }

                              &.is-focus {
                                border-color: #667eea;
                                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                              }
                            }
                          }
                        }

                        .password-actions {
                          text-align: center;
                          margin-top: 24px;

                          .el-button {
                            padding: 12px 24px;
                            border-radius: 12px;
                            font-weight: 600;
                            transition: all 0.3s ease;

                            &:hover {
                              transform: translateY(-1px);
                              box-shadow: 0 4px 12px rgba(190, 24, 93, 0.3);
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
  .modern-profile-layout {
    .profile-container {
      .main-container {
        .content-container {
          .main-content-container {
            .modern-main {
              .content-wrapper {
                .profile-content {
                  .top-row, .bottom-row {
                    flex-direction: column;
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
  .modern-profile-layout {
    .profile-container {
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