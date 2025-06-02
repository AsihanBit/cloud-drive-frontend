<template>
  <div class="modern-files-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">
          <el-icon class="title-icon"><FolderOpened /></el-icon>
          文件管理
        </h2>
        <p class="page-subtitle">管理您的所有文件和文件夹</p>
      </div>
      <div class="header-actions">
        <div class="search-container">
          <el-input 
            v-model="searchKeyword" 
            placeholder="搜索文件..."
            @keyup.enter="handleSearch"
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
            <template #suffix>
              <el-button 
                @click="handleSearch" 
                type="primary" 
                size="small"
                class="search-btn"
              >
                搜索
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <!-- 操作工具栏 -->
    <div class="toolbar">
      <div class="toolbar-center">
        <div class="action-buttons">
          <el-button type="primary" @click="createNewFolder()" class="action-btn">
            <el-icon><FolderAdd /></el-icon>
            新建文件夹
          </el-button>
          <el-button type="success" @click="handleShareItemsDialog()" class="action-btn">
            <el-icon><Share /></el-icon>
            分享选中文件
          </el-button>
        </div>
        <div class="tips">
          <el-icon class="tip-icon"><InfoFilled /></el-icon>
          <span class="tip-text">新账户包含一些默认文件</span>
        </div>
      </div>
    </div>

    <!-- 文件夹路径 -->
    <div class="breadcrumb-container" v-if="folderPath.length > 0">
      <el-breadcrumb separator=">" class="modern-breadcrumb">
        <el-breadcrumb-item 
          v-for="(folder, index) in folderPath" 
          :key="folder.id"
          @click="handleFolderPathClick(folder.id)"
          :class="{ 'is-current': index === folderPath.length - 1 }"
        >
          <el-icon v-if="index === 0"><HomeFilled /></el-icon>
          {{ folder.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 文件列表 -->
    <div class="files-content">
      <div class="files-table-wrapper">
        <el-table 
          :data="fileList" 
          @selection-change="handleSelectionChange"
          class="modern-table"
          :header-cell-style="{ background: '#f8fafc', color: '#374151', fontWeight: '600' }"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="itemId" label="ID" width="80" />
          <el-table-column prop="itemName" label="文件名称" min-width="200">
            <template v-slot="scope">
              <div class="file-name-cell">
                <el-icon class="file-icon" :style="{ color: getFileTypeColor(scope.row.itemType, scope.row.fileExtension) }">
                  <component :is="getFileTypeIcon(scope.row.itemType, scope.row.fileExtension)" />
                </el-icon>
                <span v-html="scope.row.itemName" class="file-name"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="itemType" label="类型" width="100">
            <template #default="scope">
              <el-tag 
                :type="scope.row.itemType === 1 ? 'primary' : 'success'" 
                effect="light"
                size="small"
              >
                {{ scope.row.itemType === 1 ? '文件' : '文件夹' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="fileSize" label="大小" width="120">
            <template #default="scope">
              <span v-if="scope.row.itemType === 1" class="file-size">
                {{ formatSize(scope.row.fileSize) }}
              </span>
              <span v-else class="folder-indicator">--</span>
            </template>
          </el-table-column>
          <el-table-column label="修改时间" width="180">
            <template #default="scope">
              <div class="time-cell">
                <el-icon class="time-icon"><Clock /></el-icon>
                {{ formatDateTime(scope.row.updateTime) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="320" fixed="right">
            <template #default="scope">
              <div class="operation-buttons">
                <el-button
                  v-if="scope.row.itemType === 1"
                  @click="downloadFile(scope.row.itemId, scope.row.fileId, scope.row.fileSize, scope.row.itemName)"
                  size="small"
                  type="primary"
                  class="op-btn"
                >
                  <el-icon><Download /></el-icon>
                  下载
                </el-button>
                <el-button 
                  v-if="scope.row.itemType === 1" 
                  @click="previewFile(scope.row.itemId)"
                  size="small"
                  type="info"
                  class="op-btn"
                >
                  <el-icon><View /></el-icon>
                  预览
                </el-button>
                <el-button
                  v-else
                  @click="handleFileClick(scope.row.itemId, scope.row.directoryLevel, scope.row.itemName)"
                  size="small"
                  type="success"
                  class="op-btn"
                >
                  <el-icon><FolderOpened /></el-icon>
                  打开
                </el-button>
                <el-button 
                  @click="handleShareItem(scope.row.itemId)" 
                  size="small"
                  type="warning"
                  class="op-btn"
                >
                  <el-icon><Share /></el-icon>
                  分享
                </el-button>
                <el-button
                  type="danger"
                  @click="handleDeleteItem(scope.row.itemId, scope.row.itemType)"
                  size="small"
                  class="op-btn"
                >
                  <el-icon><Delete /></el-icon>
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 拖拽上传区域 -->
      <div class="upload-section">
        <el-upload
          ref="uploadRef"
          class="modern-upload"
          drag
          :limit="5"
          :auto-upload="false"
          :show-file-list="false"
          @change="handleChange"
          multiple
        >
          <div class="upload-content">
            <el-icon class="upload-icon"><UploadFilled /></el-icon>
            <div class="upload-text">
              <h3>拖拽文件到此处 或 点击上传</h3>
              <p class="upload-tip">选择文件后请到传输页面查看上传进度</p>
              <p class="upload-notice">体验阶段：所有上传/下载操作需到传输页确认</p>
            </div>
          </div>
        </el-upload>
      </div>
    </div>

    <!-- 对话框 -->
    <!-- 新建文件夹对话框 -->
    <el-dialog v-model="dialogVisible" title="新建文件夹" class="modern-dialog" width="500px">
      <el-form :model="folderForm" label-width="120px">
        <el-form-item label="文件夹名称">
          <el-input v-model="folderForm.name" placeholder="请输入文件夹名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreateFolder">确认创建</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分享单个文件 -->
    <el-dialog v-model="singleShareDialogVisible" title="分享文件" class="modern-dialog">
      <el-form :model="singleShareForm">
        <el-form-item label="过期时间" label-width="120px">
          <el-select v-model="singleShareForm.expireType" placeholder="请选择过期时间">
            <el-option label="1天" value="0" />
            <el-option label="7天" value="1" />
            <el-option label="30天" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问次数限制" label-width="120px">
          <el-input-number
            v-model="singleShareForm.accessLimit"
            :min="1"
            placeholder="请输入访问次数限制"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="singleShareDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmSingleShareItem">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分享多个文件 -->
    <el-dialog v-model="shareDialogVisible" title="分享文件" class="modern-dialog">
      <el-form :model="shareForm">
        <el-form-item label="过期时间" label-width="120px">
          <el-select v-model="shareForm.expireType" placeholder="请选择过期时间">
            <el-option label="1天" value="0" />
            <el-option label="7天" value="1" />
            <el-option label="30天" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问次数限制" label-width="120px">
          <el-input-number
            v-model="shareForm.accessLimit"
            :min="1"
            placeholder="请输入访问次数限制"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="shareDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmShareItems">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分享成功弹出框 -->
    <el-dialog v-model="shareSuccessDialogVisible" title="分享成功" class="modern-dialog">
      <el-form>
        <el-form-item label="分享链接" label-width="120px">
          <el-input v-model="shareSuccessData.shareLink" readonly></el-input>
        </el-form-item>
        <el-form-item label="提取码" label-width="120px">
          <el-input v-model="shareSuccessData.shareCode" readonly></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="shareSuccessDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="copyShareLink">复制分享链接</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import LeftFile from '@/components/LeftFile.vue'
import { getUserItems } from '@/api/userItems'
import { 
  FolderOpened, 
  FolderAdd, 
  Share, 
  InfoFilled, 
  Search, 
  HomeFilled, 
  UploadFilled,
  Download,
  View,
  Delete,
  Clock,
  Document,
  Picture,
  VideoPlay,
  Headset
} from '@element-plus/icons-vue'
import { useUploadFileStore } from '@/stores/uploadFile'
import { useUserFilesStore } from '@/stores/userFiles'
import { useDownloadFileStore } from '@/stores/downloadFile'
import { downloadChunk, createFolder, deleteItem, shareItems } from '@/api/file'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import type { Result, ShareResultDTO } from '@/types/fileType'
import { useRouter } from 'vue-router'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadFile,
  UploadRequestHandler,
  UploadRequestOptions,
} from 'element-plus'
import { ref, onMounted, computed } from 'vue'
import { CHUNK_DOWNLOAD_SIZE, UNITS } from '@/constants/constants'

const router = useRouter()

// 响应式数据
const fileList = ref<any[]>([])
const uploadRef = ref<UploadInstance>()
const uploadFileStore = useUploadFileStore()
const userFilesStore = useUserFilesStore()
const downloadFileStore = useDownloadFileStore()
const searchKeyword = ref('')
const selectedItemIds = ref<number[]>([])

// 对话框相关
const dialogVisible = ref(false)
const folderForm = ref({
  name: '',
  pid: 0,
})

// 分享相关
const singleShareDialogVisible = ref(false)
const singleShareItemId = ref<number | null>(null)
const singleShareForm = ref({
  expireType: '',
  accessLimit: null as number | null,
})

const shareDialogVisible = ref(false)
const shareForm = ref({
  expireType: '',
  accessLimit: null as number | null,
})

const shareSuccessDialogVisible = ref(false)
const shareSuccessData = ref({
  shareStr: '',
  shareCode: '',
  shareLink: '',
})

// 计算属性
const folderPath = computed(() => {
  return userFilesStore.getAllFolders()
})

// 文件类型图标和颜色
const getFileTypeIcon = (itemType: number, fileExtension?: string) => {
  if (itemType === 0) return FolderOpened
  
  if (!fileExtension) return Document
  
  const ext = fileExtension.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) {
    return Picture
  } else if (['mp4', 'avi', 'mov', 'wmv', 'mkv'].includes(ext)) {
    return VideoPlay
  } else if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) {
    return Headset
  } else {
    return Document
  }
}

const getFileTypeColor = (itemType: number, fileExtension?: string) => {
  if (itemType === 0) return '#f59e0b'
  
  if (!fileExtension) return '#6b7280'
  
  const ext = fileExtension.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) {
    return '#10b981'
  } else if (['mp4', 'avi', 'mov', 'wmv', 'mkv'].includes(ext)) {
    return '#ef4444'
  } else if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) {
    return '#8b5cf6'
  } else {
    return '#3b82f6'
  }
}

// 方法
const handleSelectionChange = (selection: any[]) => {
  selectedItemIds.value = selection.map((file) => file.itemId)
}

const createNewFolder = () => {
  const currentFolder = userFilesStore.userFilePath[userFilesStore.userFilePath.length - 1]
  folderForm.value.pid = currentFolder ? currentFolder.id : 0
  dialogVisible.value = true
}

const confirmCreateFolder = async () => {
  try {
    const res = (await createFolder(
      folderForm.value.pid,
      folderForm.value.name,
    )) as unknown as Result
    if (res.code === 1) {
      const currentFolder = userFilesStore.userFilePath[userFilesStore.userFilePath.length - 1]
      const response = (await getUserItems(
        currentFolder ? currentFolder.id : 0,
      )) as unknown as Result
      if (response.code === 1) {
        fileList.value = (response.data as unknown as Array<any>).sort(
          (a, b) => a.itemType - b.itemType,
        )
      }
      dialogVisible.value = false
      folderForm.value.name = ''
      ElMessage.success('文件夹创建成功')
    } else {
      ElMessage.error('文件夹创建失败')
    }
  } catch (error) {
    console.error('Error creating folder:', error)
    ElMessage.error('文件夹创建失败')
  }
}

const handleShareItemsDialog = () => {
  if (selectedItemIds.value.length === 0) {
    ElMessage.warning('请先选择要分享的文件')
    return
  }
  shareDialogVisible.value = true
}

const handleShareItem = (itemId: number) => {
  singleShareItemId.value = itemId
  singleShareDialogVisible.value = true
}

const confirmSingleShareItem = async () => {
  if (singleShareItemId.value === null) {
    ElMessage.error('文件ID无效')
    return
  }

  const expireTypeValue = parseInt(singleShareForm.value.expireType, 10)
  const accessLimitValue = singleShareForm.value.accessLimit || 100

  try {
    const response = (await shareItems(
      [singleShareItemId.value],
      expireTypeValue,
      accessLimitValue,
    )) as unknown as Result
    const shareResult = response.data as unknown as ShareResultDTO
    if (response.code === 1) {
      ElMessage.success('分享成功')
      handleShareSuccess(shareResult.shareStr, shareResult.shareCode, shareResult.shareLink)
    } else {
      ElMessage.error('分享失败')
    }
  } catch (error) {
    console.error('分享失败:', error)
    ElMessage.error('分享失败')
  } finally {
    singleShareDialogVisible.value = false
    singleShareForm.value.expireType = ''
    singleShareForm.value.accessLimit = null
  }
}

const confirmShareItems = async () => {
  const expireTypeValue = parseInt(shareForm.value.expireType, 10)
  const accessLimitValue = shareForm.value.accessLimit || 100

  try {
    const response = (await shareItems(
      selectedItemIds.value,
      expireTypeValue,
      accessLimitValue,
    )) as unknown as Result
    const shareResult = response.data as unknown as ShareResultDTO

    if (response.code === 1) {
      ElMessage.success('分享成功')
      handleShareSuccess(shareResult.shareStr, shareResult.shareCode, shareResult.shareLink)
    } else {
      ElMessage.error('分享失败')
    }
  } catch (error) {
    console.error('分享失败:', error)
    ElMessage.error('分享失败')
  } finally {
    shareDialogVisible.value = false
    shareForm.value.expireType = ''
    shareForm.value.accessLimit = null
  }
}

const handleShareSuccess = (shareStr: string, shareCode: string, shareLink: string) => {
  shareSuccessDialogVisible.value = true
  shareSuccessData.value.shareStr = shareStr
  shareSuccessData.value.shareCode = shareCode
  shareSuccessData.value.shareLink = shareLink
}

const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareSuccessData.value.shareLink)
    ElMessage.success('分享链接已复制到剪贴板')
  } catch (err) {
    console.error('无法复制到剪贴板:', err)
    ElMessage.error('无法复制分享链接')
  }
}

const formatSize = (fileSize: number) => {
  let size = fileSize || 0
  let i = 0
  while (size >= 1024 && i < UNITS.length - 1) {
    size /= 1024
    i++
  }
  return size.toFixed(2) + ' ' + UNITS[i]
}

const formatDateTime = (dateArray: number[] | undefined): string => {
  if (!dateArray || dateArray.length !== 6) {
    return ''
  }
  const [year, month, day, hour, minute, second] = dateArray
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

const handleChange = (file: UploadFile) => {
  uploadFileStore.addFile(file, userFilesStore.lastFolderId)
}

const downloadFile = async (itemId: number, fileId: number, fileSize: number, itemName: string) => {
  try {
    const chunkSize = CHUNK_DOWNLOAD_SIZE

    // 检查文件是否可下载
    try {
      const testResponse = await downloadChunk(itemId, fileId, 0, Math.min(1, fileSize - 1))
      if (testResponse instanceof Blob && testResponse.type === 'application/json') {
        const errorText = await new Response(testResponse).text();
        const errorData = JSON.parse(errorText);
        ElMessage.error(errorData.msg || '文件无法下载');
        return;
      }
    } catch (checkError) {
      console.error('检查文件可下载状态失败:', checkError);
      ElMessage.error('文件可能被封禁或不存在');
      return;
    }

    downloadFileStore.addFile(itemId, itemName, fileSize)
    let start = 0

    if (window.showSaveFilePicker) {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: itemName,
      })
      const writableStream = await fileHandle.createWritable()

      downloadFileStore.setFileStatus(itemId, '正在下载')

      while (start < fileSize) {
        const end = Math.min(start + chunkSize - 1, fileSize - 1)
        const chunkBlob = (await downloadChunk(
          itemId,
          fileId,
          start,
          end,
        )) as unknown as WriteParams
        await writableStream.write(chunkBlob)
        start = end + 1
        downloadFileStore.incrementDownloadChunks(itemId)
      }
      await writableStream.close()
    } else {
      const blobParts: BlobPart[] = []
      while (start < fileSize) {
        const end = Math.min(start + chunkSize - 1, fileSize - 1)
        const chunkBlob = (await downloadChunk(itemId, fileId, start, end)) as unknown as Blob
        blobParts.push(chunkBlob)
        start = end + 1
        downloadFileStore.incrementDownloadChunks(itemId)
      }

      const blob = new Blob(blobParts, { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = itemName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }
    ElMessage.success('文件下载完成')
  } catch (error) {
    console.error('文件下载失败:', error)
    ElMessage.error('文件下载失败')
  }
}

const handleFileClick = async (itemPId: number, directoryLevel: number, itemName: string) => {
  try {
    const res = (await getUserItems(itemPId)) as unknown as Result
    if (res.code === 1) {
      userFilesStore.userFilePath.push({
        id: itemPId,
        directoryLevel: directoryLevel + 1,
        name: itemName,
      })
      fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
}

const handleFolderPathClick = async (folderId: number) => {
  try {
    const folderIndex = userFilesStore.getAllFolders().findIndex((folder) => folder.id === folderId)
    if (folderIndex === -1) return

    userFilesStore.userFilePath = userFilesStore.userFilePath.slice(0, folderIndex + 1)

    const folder = userFilesStore.getFolderById(folderId)
    if (folder) {
      const response = (await getUserItems(Number(folder.id))) as unknown as Result
      if (response.code === 1) {
        fileList.value = (response.data as unknown as Array<any>).sort(
          (a, b) => a.itemType - b.itemType,
        )
      }
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
}

const handleDeleteItem = async (itemId: number, itemType: number) => {
  try {
    if (itemType === 0) {
      await ElMessageBox.confirm('确定要删除该文件夹包含内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
    }

    const res = (await deleteItem(itemId)) as unknown as Result
    if (res.code === 1) {
      const currentFolder = userFilesStore.userFilePath[userFilesStore.userFilePath.length - 1]
      const response = (await getUserItems(
        currentFolder ? currentFolder.id : 0,
      )) as unknown as Result
      if (response.code === 1) {
        fileList.value = (response.data as unknown as Array<any>).sort(
          (a, b) => a.itemType - b.itemType,
        )
      }
      ElMessage.success('文件/文件夹删除成功')
    } else {
      ElMessage.error('文件/文件夹删除失败')
    }
  } catch (error) {
    console.error('Error deleting item:', error)
    ElMessage.error('文件/文件夹删除失败')
  }
}

const previewFile = async (itemId: number) => {
  try {
    const res = (await request.get(`/user/view/preview?itemId=${itemId}`)) as Result
    if (res.code === 1) {
      const previewUrl = res.data as unknown as string
      if (previewUrl) {
        window.open(new URL(previewUrl))
      }
    }
  } catch (error) {
    console.error('Preview error:', error)
    ElMessage.error('预览失败')
  }
}

const handleSearch = async () => {
  if (!searchKeyword.value) {
    ElMessage.warning('请输入搜索关键字')
    return
  }

  try {
    const res = (await request.get(`/user/search/keyword?keyword=${searchKeyword.value}`)) as Result
    if (res.code === 1) {
      userFilesStore.userFilePath = userFilesStore.userFilePath.slice(0, 1)
      fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    } else {
      ElMessage.error('搜索失败')
    }
  } catch (error) {
    console.error('搜索请求失败:', error)
    ElMessage.error('搜索请求失败')
  }
}

// 初始化
userFilesStore.userFilePath = []

onMounted(async () => {
  try {
    const res = (await getUserItems(0)) as unknown as Result
    if (res.code === 1) {
      userFilesStore.userFilePath.push({
        id: 0,
        name: '根目录',
        directoryLevel: 0,
      })
      fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
})
</script>

<style lang="less" scoped>
.modern-files-page {
  background: transparent;
  min-height: 100vh;
  padding: 0;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 24px 32px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

    .header-left {
      .page-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 28px;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0 0 8px 0;

        .title-icon {
          color: #667eea;
          font-size: 32px;
        }
      }

      .page-subtitle {
        color: #6b7280;
        font-size: 16px;
        margin: 0;
      }
    }

    .header-actions {
      .search-container {
        .search-input {
          width: 320px;

          :deep(.el-input__wrapper) {
            border-radius: 24px;
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

          .search-btn {
            border-radius: 16px;
            margin-right: 4px;
          }
        }
      }
    }
  }

  .toolbar {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    align-items: flex-start;

    .toolbar-center {
      flex: 1;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 20px 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

      .action-buttons {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;

        .action-btn {
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          }
        }
      }

      .tips {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #6b7280;
        font-size: 14px;

        .tip-icon {
          color: #3b82f6;
        }
      }
    }
  }

  .breadcrumb-container {
    margin-bottom: 24px;
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    .modern-breadcrumb {
      :deep(.el-breadcrumb__item) {
        .el-breadcrumb__inner {
          color: #667eea;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            color: #5a67d8;
          }
        }

        &.is-current {
          .el-breadcrumb__inner {
            color: #1a1a1a;
            font-weight: 600;
            cursor: default;
          }
        }
      }
    }
  }

  .files-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

    .files-table-wrapper {
      margin-bottom: 32px;
      min-height: 400px;
    }

    .modern-table {
      :deep(.el-table__header) {
        .el-table__cell {
          background: #f8fafc;
          border-bottom: 2px solid #e5e7eb;
        }
      }

      :deep(.el-table__row) {
        transition: all 0.3s ease;

        &:hover {
          background: #f8fafc;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      }

      .file-name-cell {
        display: flex;
        align-items: center;
        gap: 12px;

        .file-icon {
          font-size: 18px;
        }

        .file-name {
          font-weight: 500;

          :deep(em) {
            color: #ef4444;
            font-style: normal;
            background: rgba(239, 68, 68, 0.1);
            padding: 2px 4px;
            border-radius: 4px;
          }
        }
      }

      .time-cell {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #6b7280;
        font-size: 14px;

        .time-icon {
          font-size: 14px;
        }
      }

      .operation-buttons {
        display: flex;
        gap: 6px;
        justify-content: flex-end;

        .op-btn {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }

    .upload-section {
      margin-top: 32px;

      .modern-upload {
        :deep(.el-upload-dragger) {
          border: 2px dashed #d1d5db;
          border-radius: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          transition: all 0.3s ease;
          padding: 40px;

          &:hover {
            border-color: #667eea;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.1);
          }
        }

        .upload-content {
          text-align: center;

          .upload-icon {
            font-size: 48px;
            color: #667eea;
            margin-bottom: 16px;
          }

          .upload-text {
            h3 {
              font-size: 18px;
              font-weight: 600;
              color: #1a1a1a;
              margin: 0 0 12px 0;
            }

            .upload-tip {
              color: #6b7280;
              font-size: 14px;
              margin: 0 0 8px 0;
            }

            .upload-notice {
              color: #f59e0b;
              font-size: 13px;
              margin: 0;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}

// 对话框样式
:deep(.modern-dialog) {
  border-radius: 20px;
  overflow: hidden;

  .el-dialog__header {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 24px;
    border-bottom: 1px solid #e5e7eb;
  }

  .el-dialog__body {
    padding: 24px;
  }

  .el-dialog__footer {
    padding: 16px 24px 24px;
    background: #f8fafc;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    .el-button {
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 600;
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .modern-files-page {
    .page-header {
      flex-direction: column;
      gap: 16px;
      text-align: center;

      .header-actions {
        .search-container {
          .search-input {
            width: 280px;
          }
        }
      }
    }

    .toolbar {
      flex-direction: column;

      .toolbar-center {
        .action-buttons {
          flex-direction: column;
          gap: 12px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .modern-files-page {
    .page-header {
      padding: 16px 20px;

      .header-left {
        .page-title {
          font-size: 24px;

          .title-icon {
            font-size: 28px;
          }
        }

        .page-subtitle {
          font-size: 14px;
        }
      }

      .header-actions {
        .search-container {
          .search-input {
            width: 100%;
            min-width: 240px;
          }
        }
      }
    }

    .files-content {
      padding: 16px;

      .modern-table {
        :deep(.el-table) {
          font-size: 14px;
        }

        .operation-buttons {
          flex-direction: column;
          gap: 4px;

          .op-btn {
            font-size: 11px;
            padding: 4px 8px;
          }
        }
      }

      .upload-section {
        .modern-upload {
          :deep(.el-upload-dragger) {
            padding: 24px;
          }

          .upload-content {
            .upload-icon {
              font-size: 36px;
            }

            .upload-text {
              h3 {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
