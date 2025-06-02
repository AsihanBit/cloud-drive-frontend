<template>
  <div class="modern-transfer-layout">
    <!-- 背景动画 -->
    <div class="background-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <div class="transfer-container">
      <el-container class="main-container">
        <!-- 现代化头部 -->
        <el-header class="modern-header">
          <div class="header-content">
            <div class="header-left">
              <div class="brand-section">
                <el-icon class="brand-icon"><Sort /></el-icon>
                <h1 class="brand-title">文件传输</h1>
              </div>
              <div class="header-divider"></div>
              <div class="status-section">
                <el-icon class="status-icon"><DataLine /></el-icon>
                <span class="status-text">上传下载管理</span>
                <span class="status-tag">传输中心</span>
              </div>
            </div>
            <div class="header-right">
              <div class="transfer-tabs">
                <el-button 
                  :type="showUpload ? 'primary' : ''"
                  @click="showUpload = true"
                  class="tab-btn"
                >
                  <el-icon><Upload /></el-icon>
                  上传列表
                </el-button>
                <el-button 
                  :type="!showUpload ? 'primary' : ''"
                  @click="showUpload = false"
                  class="tab-btn"
                >
                  <el-icon><Download /></el-icon>
                  下载列表
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
                <!-- 上传文件区域 -->
                <div v-show="showUpload" class="upload-section">
                  <!-- 上传控制区 -->
                  <div class="upload-controls">
                    <el-upload 
                      ref="uploadRef" 
                      class="upload-component" 
                      :limit="10" 
                      :auto-upload="false" 
                      :show-file-list="false"
                      :multiple="true" 
                      @change="handlePiniaChange"
                    >
                      <template #trigger>
                        <el-button type="primary" size="large" class="select-btn">
                          <el-icon><FolderAdd /></el-icon>
                          选择文件/文件夹
                        </el-button>
                      </template>
                      <el-button 
                        class="start-btn" 
                        type="success" 
                        size="large"
                        @click="submitPiniaUpload"
                      >
                        <el-icon><VideoPlay /></el-icon>
                        开始上传
                      </el-button>
                    </el-upload>
                    <div class="upload-tip">
                      <el-icon class="tip-icon"><InfoFilled /></el-icon>
                      已限制选择不可超10文件，支持断点续传
                    </div>
                  </div>

                  <!-- 上传文件列表 -->
                  <div class="file-list-container">
                    <el-table 
                      :data="Object.values(uploadFileStore.files)" 
                      stripe 
                      class="modern-table"
                      empty-text="暂无上传文件"
                    >
                      <el-table-column prop="name" label="文件名" min-width="200">
                        <template #default="scope">
                          <div class="file-info">
                            <el-icon class="file-icon"><Document /></el-icon>
                            <span class="file-name">{{ scope.row.name }}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="uploadStatus" label="状态" width="120">
                        <template #default="scope">
                          <el-tag 
                            :type="getStatusType(scope.row.uploadStatus)"
                            effect="light"
                            class="status-tag"
                          >
                            {{ scope.row.uploadStatus }}
                          </el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="size" label="文件大小" width="120">
                        <template #default="scope">
                          <span class="file-size">{{ uploadFileStore.formatSize(scope.row.uid) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="上传进度" width="200">
                        <template #default="scope">
                          <el-progress 
                            :percentage="uploadFileStore.uploadProgress(scope.row.uid)"
                            :color="getProgressColor(scope.row.uploadStatus)"
                            class="progress-bar"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                          <div class="action-buttons">
                            <el-button 
                              v-if="uploadFileStore.getFileStatus(scope.row.uid) === '已准备'" 
                              link 
                              type="primary"
                              size="small" 
                              @click.prevent="startPiniaUpload(scope.row.uid)"
                            >
                              <el-icon><VideoPlay /></el-icon>
                              上传
                            </el-button>
                            <el-button 
                              v-else-if="uploadFileStore.getFileStatus(scope.row.uid) === '正在上传'" 
                              link 
                              type="warning"
                              size="small" 
                              @click.prevent="pauseUpload(scope.row.uid)"
                            >
                              <el-icon><VideoPause /></el-icon>
                              暂停
                            </el-button>
                            <el-button 
                              v-else-if="uploadFileStore.getFileStatus(scope.row.uid) === '已暂停'" 
                              link 
                              type="primary"
                              size="small" 
                              @click.prevent="resumeUpload(scope.row.uid)"
                            >
                              <el-icon><VideoPlay /></el-icon>
                              继续
                            </el-button>
                            <el-button 
                              link 
                              type="danger" 
                              size="small"
                              @click.prevent="uploadFileStore.removeFile(scope.row.uid)"
                            >
                              <el-icon><Delete /></el-icon>
                              移除
                            </el-button>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>

                <!-- 下载文件区域 -->
                <div v-show="!showUpload" class="download-section">
                  <div class="download-tip">
                    <el-icon class="tip-icon"><InfoFilled /></el-icon>
                    下载任务列表，支持断点续传
                  </div>

                  <!-- 下载文件列表 -->
                  <div class="file-list-container">
                    <el-table 
                      :data="Object.values(downloadFileStore.files)" 
                      stripe 
                      class="modern-table"
                      empty-text="暂无下载文件"
                    >
                      <el-table-column prop="fileName" label="文件名" min-width="200">
                        <template #default="scope">
                          <div class="file-info">
                            <el-icon class="file-icon"><Document /></el-icon>
                            <span class="file-name">{{ scope.row.fileName }}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="downloadStatus" label="状态" width="120">
                        <template #default="scope">
                          <el-tag 
                            :type="getStatusType(scope.row.downloadStatus)"
                            effect="light"
                            class="status-tag"
                          >
                            {{ scope.row.downloadStatus }}
                          </el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="fileSize" label="文件大小" width="120">
                        <template #default="scope">
                          <span class="file-size">{{ downloadFileStore.formatSize(scope.row.itemId) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="下载进度" width="200">
                        <template #default="scope">
                          <el-progress 
                            :percentage="downloadFileStore.downloadProgress(scope.row.itemId)"
                            :color="getProgressColor(scope.row.downloadStatus)"
                            class="progress-bar"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                          <div class="action-buttons">
                            <el-button 
                              v-if="downloadFileStore.getFileStatus(scope.row.itemId) === '已准备'" 
                              link 
                              type="primary"
                              size="small"
                            >
                              <el-icon><Download /></el-icon>
                              下载
                            </el-button>
                            <el-button 
                              v-else-if="downloadFileStore.getFileStatus(scope.row.itemId) === '正在下载'" 
                              link
                              type="warning" 
                              size="small"
                            >
                              <el-icon><VideoPause /></el-icon>
                              暂停
                            </el-button>
                            <el-button 
                              v-else-if="downloadFileStore.getFileStatus(scope.row.itemId) === '已暂停'" 
                              link
                              type="primary" 
                              size="small"
                            >
                              <el-icon><VideoPlay /></el-icon>
                              继续
                            </el-button>
                            <el-button 
                              link 
                              type="danger" 
                              size="small"
                              @click.prevent="downloadFileStore.removeFile(scope.row.itemId)"
                            >
                              <el-icon><Delete /></el-icon>
                              移除
                            </el-button>
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
  </div>
</template>

<script setup lang="ts">
import LeftTabs from '@/components/LeftTabs.vue'
import GithubFooter from '@/components/GithubFooter.vue'
import { 
  Sort, 
  DataLine, 
  Upload, 
  Download, 
  FolderAdd, 
  VideoPlay, 
  VideoPause, 
  InfoFilled, 
  Document, 
  Delete 
} from '@element-plus/icons-vue'

import { ref, computed } from 'vue'
import type { Reactive, Ref } from 'vue'
import type {
  UploadFile,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadRequestHandler,
  UploadRequestOptions,
} from 'element-plus'
import { uploadFileChunksThreadPool } from '@/utils/chunkUtils'
import { genFileId, ElMessage, ElNotification } from 'element-plus'
import { useUploadFileStore } from '@/stores/uploadFile'
import request from '@/utils/request'
import { useUserFilesStore } from '@/stores/userFiles'
import { useDownloadFileStore } from '@/stores/downloadFile'

const uploadRef = ref<UploadInstance>()
// const fileList = ref<UploadRawFile[]>([])
const uploadFileStore = useUploadFileStore()
const userFilesStore = useUserFilesStore()
const downloadFileStore = useDownloadFileStore()

const showUpload = ref(true)

// 状态类型映射
const getStatusType = (status: string) => {
  switch (status) {
    case '已准备':
      return 'info'
    case '正在上传':
    case '正在下载':
      return 'warning'
    case '已暂停':
      return 'danger'
    case '上传成功':
    case '下载完成':
      return 'success'
    case '已完成':
      return 'success'
    default:
      return 'info'
  }
}

// 进度条颜色
const getProgressColor = (status: string) => {
  switch (status) {
    case '正在上传':
    case '正在下载':
      return '#409eff'
    case '已暂停':
      return '#f56c6c'
    case '上传成功':
    case '下载完成':
    case '已完成':
      return '#67c23a'
    default:
      return '#e6e8eb'
  }
}

const handlePiniaChange = (file: UploadFile) => {
  // uploadFileStore.addUploadFile(file)
  // uploadFileStore.initUploadFileStatus(file.uid)
  uploadFileStore.addFile(file, userFilesStore.lastFolderId)
}

const submitPiniaUpload = async () => {
  console.log('submitPiniaUpload', uploadFileStore.files)
  // const fileCount = Object.keys(uploadFileStore.files).length
  // const fileCount = Object.entries(uploadFileStore.files).length
  // console.log('文件数量:', fileCount)
  for (const fileUidStr in uploadFileStore.files) {
    const fileUid = Number(fileUidStr)
    const file = uploadFileStore.files[fileUid]
    if (file.uploadStatus !== '已准备' && file.uploadStatus !== '已暂停') continue
    uploadFileStore.setFileStatus(fileUid, '正在上传')
    try {
      const res = await uploadFileChunksThreadPool(fileUid)
      // 根据不同结果展示不同提示和更新状态
      switch (res) {
        case 0:
          // 文件不存在，需要上传 - 这种情况应该在 uploadFileChunksThreadPool 内部已经处理完成
          uploadFileStore.setFileStatus(fileUid, '上传成功')
          ElMessage.success(`文件 ${file.name} 上传成功`)
          break
        case 1:
          // 文件已存在，秒传成功
          uploadFileStore.setFileStatus(fileUid, '已完成')
          ElMessage.success(`文件 ${file.name} 秒传成功`)
          break
        case 2:
          // 可用空间不足
          uploadFileStore.setFileStatus(fileUid, '可用空间不足')
          ElNotification({
            title: "上传失败",
            message: `账户剩余可用空间不足，无法上传文件 ${file.name}`,
            type: 'error',
          })
          break
        case 3:
          // 文件被封禁
          uploadFileStore.setFileStatus(fileUid, '文件被封禁')
          ElNotification({
            title: "上传失败",
            message: `文件 ${file.name} 可能涉及违禁内容，当前不可上传`,
            type: 'error',
          })
          break
        default:
          // 未知错误
          uploadFileStore.setFileStatus(fileUid, '上传失败')
          ElNotification({
            title: "上传失败",
            message: `文件 ${file.name} 上传过程中发生未知错误`,
            type: 'error',
          })
      }
    } catch (error) {
      uploadFileStore.setFileStatus(fileUid, '上传失败')
      ElNotification({
        title: "上传失败",
        message: `文件 ${file.name} 上传过程中发生异常错误`,
        type: 'error',
      })
    }
    // catch (error) {
    //   ElMessage.error(`Failed to upload file: ${error.message}`)
    //   uploadFileStore.setFileStatus(fileUid, '上传失败')
    // }
  }
}

// // 定义计算属性来查找文件的下标 startPiniaUpload
// const getIndexByUid = computed(() => {
//   return (uid) => {
//     return uploadFileStore.uploadFile.findIndex((item) => item.uid === uid)
//   }
// })

const startPiniaUpload = async (fileUid: number) => {
  console.warn('startPiniaUpload')
  // 找到对应的文件
  const file = uploadFileStore.files[fileUid]
  if (!file) {
    console.error('未找到对应的文件')
    return
  }
  // 设置文件状态为正在上传
  file.uploadStatus = '正在上传'

  try {
    // 确保传递的是原始的 UploadRawFile 对象  Blob 对象
    const rawFile = file.raw // 提取原始的 File 对象
    if (!rawFile || !(rawFile instanceof File)) {
      console.error('无效的文件对象:', rawFile)
      console.error('文件类型:', typeof rawFile)
      return
    }
    // 调用 uploadFileChunksThreadPool 函数上传文件
    const res = await uploadFileChunksThreadPool(file.uid)
    console.log('上传结果:', res)

 // 根据不同结果展示不同提示
 switch (res) {
      case 0:
        // 文件不存在，需要上传 - 这种情况应该在 uploadFileChunksThreadPool 内部已经处理完成
        uploadFileStore.setFileStatus(file.uid, '上传成功')
        ElMessage.success(`文件 ${file.name} 上传成功`)
        break
      case 1:
        // 文件已存在，秒传成功
        uploadFileStore.setFileStatus(file.uid, '已完成')
        ElMessage.success(`文件 ${file.name} 秒传成功`)
        break
      case 2:
        // 可用空间不足
        uploadFileStore.setFileStatus(file.uid, "可用空间不足")
        ElNotification({
          title: "上传失败",
          message: `账户剩余可用空间不足，无法上传文件 ${file.name}`,
          type: 'error',
        })
        break
      case 3:
        // 文件被封禁
        console.log('文件被封禁')
        uploadFileStore.setFileStatus(file.uid, "文件被封禁")
        ElNotification({
          title: "上传失败",
          message: `文件 ${file.name} 可能涉及违禁内容，当前不可上传`,
          type: 'error',
        })
        break
      default:
        // 未知错误
        uploadFileStore.setFileStatus(file.uid, "上传失败")
        ElNotification({
          title: "上传失败",
          message: `文件 ${file.name} 上传过程中发生未知错误`,
          type: 'error',
        })
    }


    
  } catch (error) {
    // ElMessage.error(`Failed to upload file: ${error.message}`)
    uploadFileStore.setFileStatus(fileUid, '上传失败')
  }
}

// ***********************************

const testMsg = () => {
  console.log('函数触发测试')
}

const pauseUpload = (fileUid: number) => {
  uploadFileStore.setFileStatus(fileUid, '已暂停')
  // 可以在这里保存已经上传的分片信息
}

const resumeUpload = (fileUid: number) => {
  uploadFileStore.setFileStatus(fileUid, '正在上传')
  // 从上次上传的位置继续上传
  startPiniaUpload(fileUid)
}

// const deleteRow = (fileUid: number) => {
//   console.log('移除文件', fileUid)
//   uploadFileStore.removeFile(fileUid)

//   // const fileUid = fileList.value[index].uid
//   // fileList.value.splice(index, 1)
//   // uploadFileStore.removeFile(fileUid)
//   // console.log(fileList.value)
// }

// ********* 测试方法 *********

const mergeTest = async () => {
  const res = await request.post('/user/file/mergeTest')
}
</script>

<style lang="less" scoped>
.modern-transfer-layout {
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

  .transfer-container {
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
            .transfer-tabs {
              display: flex;
              gap: 12px;

              .tab-btn {
                color: rgba(255, 255, 255, 0.8);
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                padding: 12px 20px;
                transition: all 0.3s ease;
                font-weight: 600;

                &.el-button--primary {
                  background: rgba(64, 158, 255, 0.8);
                  border-color: rgba(64, 158, 255, 0.8);
                  color: white;
                  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
                }

                &:hover {
                  background: rgba(255, 255, 255, 0.2);
                  transform: scale(1.05);
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

              .upload-section, .download-section {
                .upload-controls {
                  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                  border-radius: 20px;
                  padding: 32px;
                  margin-bottom: 32px;
                  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
                  border: 1px solid #e5e7eb;

                  .upload-component {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 16px;

                    .select-btn, .start-btn {
                      padding: 16px 32px;
                      border-radius: 16px;
                      font-weight: 600;
                      font-size: 16px;
                      transition: all 0.3s ease;

                      &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                      }
                    }

                    .select-btn {
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      border: none;
                    }

                    .start-btn {
                      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                      border: none;
                    }
                  }

                  .upload-tip {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #6b7280;
                    font-size: 14px;
                    font-weight: 500;

                    .tip-icon {
                      color: #3b82f6;
                    }
                  }
                }

                .download-tip {
                  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                  border-radius: 16px;
                  padding: 20px;
                  margin-bottom: 24px;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  color: #0369a1;
                  font-weight: 500;
                  border: 1px solid #bae6fd;

                  .tip-icon {
                    color: #0284c7;
                    font-size: 16px;
                  }
                }

                .file-list-container {
                  .modern-table {
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
                    border: 1px solid #e5e7eb;

                    :deep(.el-table__header) {
                      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);

                      th {
                        background: transparent;
                        border-bottom: 2px solid #e5e7eb;
                        color: #374151;
                        font-weight: 700;
                        font-size: 14px;
                        padding: 16px 12px;
                      }
                    }

                    :deep(.el-table__body) {
                      tr {
                        transition: all 0.3s ease;

                        &:hover {
                          background: #f8fafc;
                        }

                        td {
                          padding: 16px 12px;
                          border-bottom: 1px solid #f3f4f6;
                        }
                      }
                    }

                    .file-info {
                      display: flex;
                      align-items: center;
                      gap: 12px;

                      .file-icon {
                        font-size: 18px;
                        color: #6b7280;
                      }

                      .file-name {
                        font-weight: 500;
                        color: #1a1a1a;
                      }
                    }

                    .status-tag {
                      font-weight: 600;
                      padding: 4px 12px;
                      border-radius: 8px;
                    }

                    .file-size {
                      color: #6b7280;
                      font-weight: 500;
                    }

                    .progress-bar {
                      :deep(.el-progress-bar__outer) {
                        border-radius: 8px;
                        background: #f3f4f6;
                      }

                      :deep(.el-progress-bar__inner) {
                        border-radius: 8px;
                      }
                    }

                    .action-buttons {
                      display: flex;
                      gap: 8px;
                      align-items: center;

                      .el-button {
                        padding: 8px 16px;
                        border-radius: 8px;
                        font-weight: 600;
                        transition: all 0.3s ease;

                        &:hover {
                          transform: translateY(-1px);
                        }

                        &.el-button--primary {
                          &:hover {
                            box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
                          }
                        }

                        &.el-button--warning {
                          &:hover {
                            box-shadow: 0 4px 12px rgba(230, 162, 60, 0.3);
                          }
                        }

                        &.el-button--danger {
                          &:hover {
                            box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
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
  .modern-transfer-layout {
    .transfer-container {
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
  .modern-transfer-layout {
    .transfer-container {
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
              .transfer-tabs {
                width: 100%;
                justify-content: center;

                .tab-btn {
                  flex: 1;
                  padding: 12px 16px;
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

                .upload-section, .download-section {
                  .upload-controls {
                    padding: 20px;

                    .upload-component {
                      flex-direction: column;
                      align-items: stretch;

                      .select-btn, .start-btn {
                        width: 100%;
                        margin-bottom: 12px;
                      }
                    }
                  }

                  .file-list-container {
                    .modern-table {
                      :deep(.el-table__header) {
                        th {
                          padding: 12px 8px;
                          font-size: 12px;
                        }
                      }

                      :deep(.el-table__body) {
                        td {
                          padding: 12px 8px;
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
    }
  }
}
</style>
