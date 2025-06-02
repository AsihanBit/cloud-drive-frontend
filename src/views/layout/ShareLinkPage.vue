<template>
  <div class="modern-sharelink-layout">
    <!-- 背景动画 -->
    <div class="background-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <div class="sharelink-container">
      <el-container class="main-container">
        <!-- 现代化头部 -->
        <el-header class="modern-header">
          <div class="header-content">
            <div class="header-left">
              <div class="brand-section">
                <el-icon class="brand-icon"><Link /></el-icon>
                <h1 class="brand-title">分享链接</h1>
              </div>
              <div class="header-divider"></div>
              <div class="status-section">
                <el-icon class="status-icon"><Key /></el-icon>
                <span class="status-text">访问分享文件</span>
                <span class="status-tag">分享访问</span>
              </div>
            </div>
            <div class="header-right">
              <div class="header-actions">
                <el-button v-if="extractSuccess" @click="goBack" class="back-btn">
                  <el-icon><ArrowLeft /></el-icon>
                  返回输入
                </el-button>
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
                <!-- 分享码输入区域 -->
                <div v-show="!extractSuccess" class="share-input-section">
                  <el-card class="input-card" shadow="hover">
                    <template #header>
                      <div class="card-header">
                        <el-icon class="card-icon"><Key /></el-icon>
                        <span class="card-title">输入分享信息</span>
                      </div>
                    </template>
                    
                    <div class="input-form-container">
                      <el-form :model="shareForm" class="share-form" label-width="80px">
                        <el-form-item label="分享码">
                          <el-input 
                            v-model="shareForm.shareStr" 
                            placeholder="请输入分享码"
                            size="large"
                            class="modern-input"
                          >
                            <template #prefix>
                              <el-icon><Link /></el-icon>
                            </template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="提取码">
                          <el-input 
                            v-model="shareForm.extractCode" 
                            placeholder="请输入提取码"
                            size="large"
                            class="modern-input"
                          >
                            <template #prefix>
                              <el-icon><Key /></el-icon>
                            </template>
                          </el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button 
                            type="primary" 
                            @click="handleShareLink"
                            size="large"
                            class="submit-btn"
                          >
                            <el-icon><Check /></el-icon>
                            确认访问
                          </el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-card>
                </div>

                <!-- 分享文件展示区域 -->
                <div v-show="extractSuccess" class="share-files-section">
                  <!-- 操作栏 -->
                  <div class="files-header">
                    <div class="header-left">
                      <h3 class="section-title">
                        <el-icon class="title-icon"><FolderOpened /></el-icon>
                        分享文件列表
                      </h3>
                    </div>
                    <div class="header-right">
                      <el-button 
                        type="primary" 
                        @click="saveSelectedFiles()"
                        :disabled="selectedItemIds.length === 0"
                        class="save-btn"
                      >
                        <el-icon><Download /></el-icon>
                        转存选中文件 ({{ selectedItemIds.length }})
                      </el-button>
                    </div>
                  </div>

                  <!-- 文件夹路径导航 -->
                  <div class="folder-breadcrumb">
                    <el-breadcrumb separator="/">
                      <el-breadcrumb-item 
                        v-for="(folder, index) in shareFolderPath" 
                        :key="folder.id"
                        :class="{ 'is-active': index === shareFolderPath.length - 1 }"
                      >
                        <span 
                          @click="handleShareFolderPathClick(folder.id)"
                          :class="{ 'clickable': index < shareFolderPath.length - 1 }"
                        >
                          <el-icon v-if="index === 0"><HomeFilled /></el-icon>
                          {{ folder.name }}
                        </span>
                      </el-breadcrumb-item>
                    </el-breadcrumb>
                  </div>

                  <!-- 文件列表 -->
                  <div class="files-table-container">
                    <el-table
                      :data="sharedFiles"
                      @row-click="handleShareRowClick"
                      @selection-change="handleSelectionChange"
                      class="modern-table"
                      stripe
                      empty-text="暂无分享文件"
                    >
                      <el-table-column type="selection" width="55" />
                      <el-table-column prop="itemName" label="文件名" min-width="200">
                        <template #default="scope">
                          <div class="file-info">
                            <el-icon class="file-icon" :class="getFileIconClass(scope.row)">
                              <component :is="getFileIcon(scope.row)" />
                            </el-icon>
                            <span class="file-name">{{ scope.row.itemName }}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="itemType" label="类型" width="100">
                        <template #default="scope">
                          <el-tag 
                            :type="scope.row.itemType === 0 ? 'warning' : 'info'" 
                            effect="light"
                            class="type-tag"
                          >
                            {{ scope.row.itemType === 0 ? '文件夹' : '文件' }}
                          </el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="fileSize" label="大小" width="120">
                        <template #default="scope">
                          <span v-if="scope.row.itemType === 1" class="file-size">
                            {{ formatSize(scope.row.fileSize) }}
                          </span>
                          <span v-else class="folder-size">-</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="fileExtension" label="扩展名" width="100">
                        <template #default="scope">
                          <el-tag 
                            v-if="scope.row.fileExtension" 
                            size="small" 
                            effect="plain"
                            class="ext-tag"
                          >
                            {{ scope.row.fileExtension }}
                          </el-tag>
                          <span v-else>-</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="updateTime" label="修改时间" width="180">
                        <template #default="scope">
                          <div class="update-time">
                            <el-icon class="time-icon"><Clock /></el-icon>
                            <span>{{ formatUpdateTime(scope.row.updateTime) }}</span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
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

    <!-- 转存文件对话框 -->
    <el-dialog
      v-model="saveSelectedFilesDialogVisible"
      title="转存文件"
      width="800px"
      class="save-dialog"
    >
      <template #header>
        <div class="dialog-header">
          <el-icon class="dialog-icon"><FolderAdd /></el-icon>
          <span class="dialog-title">选择转存位置</span>
        </div>
      </template>

      <div class="dialog-content">
        <!-- 我的文件夹路径导航 -->
        <div class="my-folder-breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item 
              v-for="(folder, index) in myFolderPath" 
              :key="folder.id"
              :class="{ 'is-active': index === myFolderPath.length - 1 }"
            >
              <span 
                @click="handleMyFolderPathClick(folder.id)"
                :class="{ 'clickable': index < myFolderPath.length - 1 }"
              >
                <el-icon v-if="index === 0"><HomeFilled /></el-icon>
                {{ folder.name }}
              </span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 我的文件列表 -->
        <div class="my-files-container">
          <el-table :data="fileList" class="dialog-table" stripe>
            <el-table-column prop="itemName" label="文件名称" min-width="180">
              <template #default="scope">
                <div class="file-info">
                  <el-icon class="file-icon" :class="getFileIconClass(scope.row)">
                    <component :is="getFileIcon(scope.row)" />
                  </el-icon>
                  <span class="file-name">{{ scope.row.itemName }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="itemType" label="类型" width="100">
              <template #default="scope">
                <span 
                  v-if="scope.row.itemType === 1" 
                  class="file-type"
                >
                  文件
                </span>
                <span
                  v-else
                  @click="handleMyFileClick(scope.row.itemId, scope.row.directoryLevel, scope.row.itemName)"
                  class="folder-type"
                >
                  <el-icon><FolderOpened /></el-icon>
                  文件夹
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="fileSize" label="文件大小" width="120">
              <template #default="scope">
                <span v-if="scope.row.itemType === 1" class="file-size">
                  {{ formatSize(scope.row.fileSize) }}
                </span>
                <span v-else class="folder-size">-</span>
              </template>
            </el-table-column>
            <el-table-column label="修改时间" width="180">
              <template #default="scope">
                <div class="update-time">
                  <el-icon class="time-icon"><Clock /></el-icon>
                  <span>{{ formatUpdateTime(scope.row.updateTime) }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="saveSelectedFilesDialogVisible = false" class="cancel-btn">
            取消
          </el-button>
          <el-button type="primary" @click="confirmSaveSelectedFilesBtn()" class="confirm-btn">
            <el-icon><Check /></el-icon>
            确认转存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { 
  Link, 
  Key, 
  ArrowLeft, 
  Check, 
  FolderOpened, 
  Download, 
  HomeFilled, 
  Clock, 
  FolderAdd,
  Document,
  VideoPlay,
  Picture,
  Headset,
  Files
} from '@element-plus/icons-vue'
import { getShareByShareCode } from '@/api/share'
import { useRoute, useRouter } from 'vue-router'
import { getSharedItems, getOtherSharedItems, saveSelectedItems } from '@/api/share'
// 用户的文件
import { useUserFilesStore } from '@/stores/userFiles'
import { getUserItems } from '@/api/userItems'
import { formatSize, formatUpdateTime } from '@/utils/fileInfoUtils'
import { ElNotification } from 'element-plus'
import type { Result } from '@/types/fileType'
import { ElMessage, ElMessageBox } from 'element-plus' // 导入 ElMessage
import LeftTabs from '@/components/LeftTabs.vue'
import GithubFooter from '@/components/GithubFooter.vue'

const userFilesStore = useUserFilesStore()

const route = useRoute()
const router = useRouter()

// 分享的文件
// const sharedFiles = ref([])
const sharedFiles = ref<any[]>([]) // 明确 sharedFiles 是 any[] 类型
// 显示提取/转存
const extractSuccess = ref(false)
// 当前分享id
const currentShareStr = ref<string>('')
// 分享的路径
const shareFolderPath = ref<{ id: number; name: string }[]>([])

// 定义表单数据
const shareForm = ref({
  shareStr: '',
  extractCode: '',
})

// 新增方法：获取文件图标
const getFileIcon = (row: any) => {
  if (row.itemType === 0) {
    return FolderOpened
  }
  
  const extension = row.fileExtension?.toLowerCase()
  if (!extension) return Document
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv']
  const audioExtensions = ['mp3', 'wav', 'flac', 'aac', 'ogg']
  
  if (imageExtensions.includes(extension)) return Picture
  if (videoExtensions.includes(extension)) return VideoPlay
  if (audioExtensions.includes(extension)) return Headset
  
  return Document
}

// 新增方法：获取文件图标样式类
const getFileIconClass = (row: any) => {
  if (row.itemType === 0) {
    return 'folder-icon'
  }
  
  const extension = row.fileExtension?.toLowerCase()
  if (!extension) return 'document-icon'
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv']
  const audioExtensions = ['mp3', 'wav', 'flac', 'aac', 'ogg']
  
  if (imageExtensions.includes(extension)) return 'image-icon'
  if (videoExtensions.includes(extension)) return 'video-icon'
  if (audioExtensions.includes(extension)) return 'audio-icon'
  
  return 'document-icon'
}

// 新增方法：返回输入界面
const goBack = () => {
  extractSuccess.value = false
  sharedFiles.value = []
  shareFolderPath.value = []
  currentShareStr.value = ''
}

onMounted(() => {
  // 获取路径参数
  // const shareStr = route.query.shareStr // "rzrGR/ZTjLAZHOcZRnWuyw=="
  // const shareCode = route.query.shareCode as string // "1vea"

  const rawShareStr = (route.query.shareStr as string) || ''
  const shareCode = (route.query.shareCode as string) || ''

  console.log('原始参数:', rawShareStr, shareCode)

  // // 关键修复：先编码特殊字符，再解码
  // const decodedShareStr = decodeURIComponent(
  //   rawShareStr.replace(/\+/g, '%2B') // 先把+替换为%2B
  //     .replace(/\//g, '%2F')         // 可选：处理/字符
  //     .replace(/=/g, '%3D')          // 可选：处理=字符
  // )

  console.log('路径参数:', route.query.shareStr, shareCode)
  const decodedShareStr = rawShareStr ? decodeURIComponent(rawShareStr) : ''
  shareForm.value = {
    shareStr: decodedShareStr,
    extractCode: shareCode,
  }
})

// 处理分享链接的函数
const handleShareLink = async () => {
  const { shareStr, extractCode } = shareForm.value
  console.log('Share ID:', shareStr)
  console.log('提取码:', extractCode)
  // 在这里调用处理函数
  const tempShareStr = shareStr === null ? '' : shareStr
  const res = (await getShareByShareCode(tempShareStr, extractCode)) as unknown as Result
  if (res.code === 1) {
    // as unknown
    sharedFiles.value = res.data as unknown as Array<any>
    extractSuccess.value = true
    currentShareStr.value = shareStr // 存储当前的 shareId
    shareFolderPath.value = [{ id: 0, name: '根目录' }] // 初始化路径
  } else {
    ElNotification({
      title: '分享链接提取错误',
      message: res.msg,
      type: 'error',
    })
  }
}

// 加载文件夹内容
const loadShareFolderContent = async (shareStr: string, pItemId: number | null) => {
  const res = await getOtherSharedItems(shareStr, pItemId)
  sharedFiles.value = res.data
}

const handleShareRowClick = async (row: any) => {
  if (row.itemType === 0) {
    // 如果是文件夹，则添加到路径中
    shareFolderPath.value.push({ id: row.shareItemId, name: row.itemName })
    // 加载该文件夹的内容
    // await loadShareFolderContent(row.shareStr, row.shareItemId)
    await loadShareFolderContent(currentShareStr.value, row.shareItemId)
    // const res = await getSharedItems(row.shareId, row.shareItemId)
    // sharedFiles.value = res.data
  }
  if (row.itemType === 1) {
    // TODO: 预览文件
  }
}

// 点击路径中的文件夹
const handleShareFolderPathClick = async (pItemId: number) => {
  const index = shareFolderPath.value.findIndex((folder) => folder.id === pItemId)
  if (index !== -1) {
    // 截断路径到点击的文件夹
    shareFolderPath.value = shareFolderPath.value.slice(0, index + 1)
    // 加载该文件夹的内容
    // const shareId = route.params.shareId as number
    // await loadShareFolderContent(shareId, pItemId)
    // 加载该文件夹的内容
    if (currentShareStr.value !== null) {
      await loadShareFolderContent(currentShareStr.value, pItemId)
    }
  }
}

// 选中分享条目
const selectedItemIds = ref<number[]>([])
const handleSelectionChange = (selection: any[]) => {
  selectedItemIds.value = selection.map((item) => item.shareItemId)
}

const saveSelectedFilesDialogVisible = ref(false)

// 转存选中的文件
const saveSelectedFiles = () => {
  if (selectedItemIds.value.length === 0) {
    ElMessage.warning('未选择任何要转存的文件')
    return
  }

  saveSelectedFilesDialogVisible.value = true
  loadMyFolderPath()
}

// ============================转存路径选择器========================
// 转存路径
// const fileList = ref([])
const fileList = ref<any[]>([]) // 明确类型为 any[]

const myFolderPath = ref<{ id: number; name: string }[]>([])

const loadMyFolderPath = async () => {
  const res = (await getUserItems(0)) as unknown as Result
  if (res.code === 1) {
    // userFilesStore.userFilePath.push({
    //   id: 0,
    //   name: '根目录',
    //   directoryLevel: 0,
    // })
    // fileList.value = res.data
    fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    myFolderPath.value = [{ id: 0, name: '根目录' }]
  } else {
    console.error('Failed to fetch user items:', res.msg)
  }
}
const handleMyFileClick = async (itemPId: number, directoryLevel: number, itemName: string) => {
  console.log('Clicked on itemPId:', itemPId)
  try {
    const res = (await getUserItems(itemPId)) as unknown as Result
    if (res.code === 1) {
      // userFilesStore.userFilePath.push({
      //   id: itemPId,
      //   directoryLevel: directoryLevel + 1,
      //   name: itemName,
      // })
      myFolderPath.value.push({ id: itemPId, name: itemName })
      // fileList.value = res.data as any[]
      // 文件夹在前 文件在后
      fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    } else {
      console.error('Failed to fetch user items:', res.msg)
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
}

// 点击路径中的文件夹
const handleMyFolderPathClick = async (pItemId: number) => {
  const index = myFolderPath.value.findIndex((folder) => folder.id === pItemId)
  if (index !== -1) {
    // 截断路径到点击的文件夹
    myFolderPath.value = myFolderPath.value.slice(0, index + 1)
    // 加载该文件夹的内容
    // const shareId = route.params.shareId as number
    const res = await getUserItems(pItemId)
    fileList.value = res.data
  }
}

// 执行转存
const confirmSaveSelectedFilesBtn = async () => {
  // 要转存的文件夹id
  const saveToFolder = myFolderPath.value[myFolderPath.value.length - 1]
  console.log('confirmSaveSelectedFilesBtn', saveToFolder.id)
  console.log('保存的条目数组', selectedItemIds.value)
  const res = await saveSelectedItems(
    shareForm.value.shareStr,
    shareForm.value.extractCode,
    saveToFolder.id,
    selectedItemIds.value,
  )
}
</script>

<style lang="less" scoped>
.modern-sharelink-layout {
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

  .sharelink-container {
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
            .header-actions {
              .back-btn {
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

              // 分享码输入区域
              .share-input-section {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 500px;

                .input-card {
                  width: 600px;
                  border-radius: 24px;
                  border: 1px solid #e5e7eb;
                  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  transition: all 0.3s ease;

                  &:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
                  }

                  :deep(.el-card__header) {
                    padding: 24px;
                    background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
                    border-bottom: 1px solid #e5e7eb;

                    .card-header {
                      display: flex;
                      align-items: center;
                      gap: 12px;

                      .card-icon {
                        font-size: 24px;
                        color: #0284c7;
                      }

                      .card-title {
                        font-size: 20px;
                        font-weight: 700;
                        color: #1a1a1a;
                      }
                    }
                  }

                  :deep(.el-card__body) {
                    padding: 32px;
                  }

                  .input-form-container {
                    .share-form {
                      .el-form-item {
                        margin-bottom: 24px;

                        :deep(.el-form-item__label) {
                          font-size: 16px;
                          font-weight: 600;
                          color: #374151;
                        }

                        .modern-input {
                          :deep(.el-input__wrapper) {
                            border-radius: 16px;
                            border: 2px solid #e5e7eb;
                            padding: 16px 20px;
                            font-size: 16px;
                            transition: all 0.3s ease;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

                            &:hover {
                              border-color: #d1d5db;
                              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            }

                            &.is-focus {
                              border-color: #667eea;
                              box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
                            }
                          }

                          :deep(.el-input__prefix) {
                            color: #9ca3af;
                          }
                        }

                        .submit-btn {
                          width: 100%;
                          padding: 16px;
                          border-radius: 16px;
                          font-size: 16px;
                          font-weight: 600;
                          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                          border: none;
                          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
                          transition: all 0.3s ease;

                          &:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
                          }
                        }
                      }
                    }
                  }
                }
              }

              // 分享文件展示区域
              .share-files-section {
                .files-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 24px;
                  padding: 20px 24px;
                  background: rgba(255, 255, 255, 0.8);
                  border-radius: 16px;
                  backdrop-filter: blur(10px);
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

                  .header-left {
                    .section-title {
                      display: flex;
                      align-items: center;
                      gap: 12px;
                      font-size: 20px;
                      font-weight: 700;
                      color: #1a1a1a;
                      margin: 0;

                      .title-icon {
                        font-size: 24px;
                        color: #667eea;
                      }
                    }
                  }

                  .header-right {
                    .save-btn {
                      padding: 12px 24px;
                      border-radius: 12px;
                      font-weight: 600;
                      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                      border: none;
                      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                      transition: all 0.3s ease;

                      &:hover:not(:disabled) {
                        transform: translateY(-1px);
                        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
                      }

                      &:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                      }
                    }
                  }
                }

                .folder-breadcrumb {
                  margin-bottom: 24px;
                  padding: 16px 20px;
                  background: rgba(255, 255, 255, 0.8);
                  border-radius: 12px;
                  backdrop-filter: blur(10px);

                  :deep(.el-breadcrumb) {
                    .el-breadcrumb__item {
                      .el-breadcrumb__inner {
                        font-weight: 500;
                        color: #374151;

                        .clickable {
                          color: #667eea;
                          cursor: pointer;
                          transition: color 0.3s ease;

                          &:hover {
                            color: #4f46e5;
                          }
                        }

                        &.is-active {
                          color: #1a1a1a;
                          font-weight: 600;
                        }
                      }
                    }
                  }
                }

                .files-table-container {
                  background: rgba(255, 255, 255, 0.9);
                  border-radius: 16px;
                  padding: 24px;
                  backdrop-filter: blur(10px);
                  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);

                  .modern-table {
                    :deep(.el-table__header) {
                      background: #f8fafc;

                      th {
                        background: #f8fafc !important;
                        color: #374151;
                        font-weight: 600;
                        border-bottom: 2px solid #e5e7eb;
                      }
                    }

                    :deep(.el-table__body) {
                      tr {
                        transition: all 0.3s ease;

                        &:hover {
                          background: #f0f9ff !important;
                        }

                        td {
                          border-bottom: 1px solid #f3f4f6;
                          vertical-align: middle;
                        }
                      }
                    }

                    .file-info {
                      display: flex;
                      align-items: center;
                      gap: 12px;

                      .file-icon {
                        font-size: 20px;
                        
                        &.folder-icon {
                          color: #f59e0b;
                        }
                        
                        &.image-icon {
                          color: #10b981;
                        }
                        
                        &.video-icon {
                          color: #ef4444;
                        }
                        
                        &.audio-icon {
                          color: #8b5cf6;
                        }
                        
                        &.document-icon {
                          color: #6b7280;
                        }
                      }

                      .file-name {
                        font-weight: 500;
                        color: #1a1a1a;
                      }
                    }

                    .type-tag {
                      border-radius: 8px;
                      font-weight: 600;
                    }

                    .file-size, .folder-size {
                      font-weight: 500;
                      color: #6b7280;
                    }

                    .ext-tag {
                      border-radius: 6px;
                      text-transform: uppercase;
                      font-weight: 600;
                    }

                    .update-time {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      font-size: 14px;
                      color: #6b7280;

                      .time-icon {
                        font-size: 14px;
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

// 对话框样式
.save-dialog {
  :deep(.el-dialog) {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);

    .el-dialog__header {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      padding: 24px;
      border-bottom: 1px solid #e5e7eb;

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 12px;

        .dialog-icon {
          font-size: 24px;
          color: #16a34a;
        }

        .dialog-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
        }
      }
    }

    .el-dialog__body {
      padding: 24px;

      .dialog-content {
        .my-folder-breadcrumb {
          margin-bottom: 20px;
          padding: 16px 20px;
          background: #f8fafc;
          border-radius: 12px;

          .el-breadcrumb {
            .el-breadcrumb__item {
              .el-breadcrumb__inner {
                font-weight: 500;
                color: #374151;

                .clickable {
                  color: #667eea;
                  cursor: pointer;
                  transition: color 0.3s ease;

                  &:hover {
                    color: #4f46e5;
                  }
                }

                &.is-active {
                  color: #1a1a1a;
                  font-weight: 600;
                }
              }
            }
          }
        }

        .my-files-container {
          .dialog-table {
            border-radius: 12px;
            overflow: hidden;

            :deep(.el-table__header) {
              th {
                background: #f8fafc !important;
                color: #374151;
                font-weight: 600;
              }
            }

            .file-info {
              display: flex;
              align-items: center;
              gap: 12px;

              .file-icon {
                font-size: 18px;
                
                &.folder-icon {
                  color: #f59e0b;
                }
                
                &.document-icon {
                  color: #6b7280;
                }
              }

              .file-name {
                font-weight: 500;
              }
            }

            .file-type {
              color: #6b7280;
              font-weight: 500;
            }

            .folder-type {
              display: flex;
              align-items: center;
              gap: 6px;
              color: #667eea;
              cursor: pointer;
              font-weight: 500;
              transition: color 0.3s ease;

              &:hover {
                color: #4f46e5;
              }
            }

            .file-size, .folder-size {
              font-weight: 500;
              color: #6b7280;
            }

            .update-time {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 14px;
              color: #6b7280;

              .time-icon {
                font-size: 14px;
              }
            }
          }
        }
      }
    }

    .el-dialog__footer {
      padding: 20px 24px;
      background: #f8fafc;
      border-top: 1px solid #e5e7eb;

      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;

        .cancel-btn {
          padding: 12px 24px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          color: #6b7280;
          background: white;
          font-weight: 500;
          transition: all 0.3s ease;

          &:hover {
            border-color: #9ca3af;
            color: #374151;
          }
        }

        .confirm-btn {
          padding: 12px 24px;
          border-radius: 10px;
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
          border: none;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(22, 163, 74, 0.4);
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
  .modern-sharelink-layout {
    .sharelink-container {
      .main-container {
        .content-container {
          .modern-aside {
            width: 160px;
          }

          .main-content-container {
            .modern-main {
              .content-wrapper {
                .share-input-section {
                  .input-card {
                    width: 500px;
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
  .modern-sharelink-layout {
    .sharelink-container {
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

                .share-input-section {
                  min-height: 400px;

                  .input-card {
                    width: 100%;
                    max-width: 400px;
                  }
                }

                .share-files-section {
                  .files-header {
                    flex-direction: column;
                    gap: 16px;
                    text-align: center;
                  }

                  .files-table-container {
                    overflow-x: auto;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .save-dialog {
    :deep(.el-dialog) {
      width: 95% !important;
      margin: 20px auto;

      .el-dialog__body {
        padding: 16px;

        .dialog-content {
          .my-files-container {
            overflow-x: auto;
          }
        }
      }
    }
  }
}
</style>
