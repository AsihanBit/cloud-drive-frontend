<template>
  <div>
    <div class="common-layout">
      <LeftFile />
      <div class="all-files">
        <div class="button-group">
          <el-button type="primary" @click="createNewFolder()">新增文件夹</el-button>
          <el-button type="primary" @click="handleShareItemsDialog()">分享选中文件</el-button>

          <div class="search-box">
            <el-input v-model="searchKeyword" placeholder="关键字" @keyup.enter="handleSearch">
              <template #suffix>
                <el-button icon="el-icon-search" @click="handleSearch">搜索</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- 文件夹路径 -->
        <!-- TODO 路径太长时,只显示根路径和最后三个文件夹路径 -->
        <div class="folder-path">
          <template v-for="(folder, index) in folderPath" :key="folder.id">
            <div
              class="folder-item"
              :class="{ 'last-item': index === folderPath.length - 1 }"
              @click="handleFolderPathClick(folder.id)"
            >
              {{ folder.name }}
            </div>
            <div class="separator" v-if="index < folderPath.length - 1">></div>
          </template>
        </div>
        <el-table :data="fileList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="itemId" label="Item ID" width="80" />
          <!-- <el-table-column prop="itemName" label="文件名称" width="180" /> -->
          <el-table-column prop="itemName" label="文件名称" width="180">
            <template v-slot="scope">
              <span v-html="scope.row.itemName"></span>
            </template>
          </el-table-column>
          <el-table-column prop="directoryLevel" label="文件层级" width="100" />
          <el-table-column prop="itemType" label="类型" width="100">
            <template #default="scope">
              <span v-if="scope.row.itemType === 1" style="cursor: pointer; color: black">
                文件
              </span>
              <span
                v-else
                @click="
                  handleFileClick(scope.row.itemId, scope.row.directoryLevel, scope.row.itemName)
                "
                style="cursor: pointer; color: blue"
              >
                文件夹
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="fileId" label="File ID" width="100" />
          <!-- pId为什么不是驼峰了? -->
          <el-table-column prop="pid" label="父条目id" width="100" />
          <el-table-column prop="fileSize" label="文件大小" width="100">
            <template #default="scope">
              <span v-if="scope.row.itemType === 1">
                {{ formatSize(scope.row.fileSize) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="fileExtension" label="文件扩展名" width="100" />
          <el-table-column label="操作" width="300">
            <template #default="scope">
              <div class="operation-buttons">
                <el-button
                  v-if="scope.row.itemType === 1"
                  @click="
                    downloadFile(
                      scope.row.itemId,
                      scope.row.fileId,
                      scope.row.fileSize,
                      scope.row.itemName,
                    )
                  "
                  >下载
                </el-button>
                <el-button v-if="scope.row.itemType === 1" @click="previewFile(scope.row.itemId)"
                  >预览
                </el-button>
                <el-button
                  v-else
                  @click="
                    handleFileClick(scope.row.itemId, scope.row.directoryLevel, scope.row.itemName)
                  "
                  >打开
                </el-button>
                <el-button @click="handleShareItem(scope.row.itemId)"> 分享 </el-button>
                <el-button
                  type="danger"
                  @click="handleDeleteItem(scope.row.itemId, scope.row.itemType)"
                >
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="文件修改时间" width="180">
            <template #default="scope">
              {{ formatUpdateTime(scope.row.updateTime) }}
            </template>
          </el-table-column>
        </el-table>
        <!-- 拖拽上传 -->
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          drag
          :limit="5"
          :auto-upload="false"
          :show-file-list="false"
          @change="handleChange"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖动文件到此处 或 <em>点击上传</em>
            <div class="el-upload__tip">选择上传文件后请到传输页查看</div>
            <div class="el-upload__tip">*体验阶段 所有上传/下载操作后都需到传输页确认*</div>
          </div>
        </el-upload>
      </div>
      <!-- ==================== 弹出框 ==================== -->
      <!-- 新建文件夹 -->
      <el-dialog v-model="dialogVisible" title="新建文件夹">
        <el-form :model="folderForm">
          <el-form-item label="文件夹名称" label-width="120px">
            <el-input v-model="folderForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmCreateFolder">确认</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 分享单个文件 -->
      <el-dialog v-model="singleShareDialogVisible" title="分享文件">
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
      <el-dialog v-model="shareDialogVisible" title="分享文件">
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
      <el-dialog v-model="shareSuccessDialogVisible" title="分享成功">
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
  </div>
</template>

<script lang="ts" setup>
import LeftFile from '@/components/LeftFile.vue'
import { getUserItems } from '@/api/userItems'
import { Folder, Picture, UploadFilled } from '@element-plus/icons-vue'
import { useUploadFileStore } from '@/stores/uploadFile'
import { useUserFilesStore } from '@/stores/userFiles'
import { useDownloadFileStore } from '@/stores/downloadFile'
import { downloadChunk, createFolder, deleteItem, shareItems } from '@/api/file'
import { ElMessage, ElMessageBox } from 'element-plus' // 导入 ElMessage
import request from '@/utils/request'
import type { Result, ShareResultDTO } from '@/types/fileType'

import { useRouter } from 'vue-router'

const router = useRouter()

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

import axios from 'axios'
// const fileList = ref([]) as Array<any>
const fileList = ref<any[]>([]) // 明确类型为 any[]
const uploadRef = ref<UploadInstance>()
const uploadFileStore = useUploadFileStore()
const userFilesStore = useUserFilesStore()
const downloadFileStore = useDownloadFileStore()

console.log(userFilesStore.lastFolderId)

// 选中文件itemIds
const selectedItemIds = ref<number[]>([])

const handleSelectionChange = (selection: any[]) => {
  selectedItemIds.value = selection.map((file) => file.itemId)
}
// 弹出框相关
const dialogVisible = ref(false)
const folderForm = ref({
  name: '',
  pid: 0,
})

// 分享单个文件
const singleShareDialogVisible = ref(false)
const singleShareItemId = ref<number | null>(null)
const singleShareForm = ref({
  expireType: '',
  accessLimit: null as number | null,
})
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
  const accessLimitValue =
    singleShareForm.value.accessLimit !== null ? singleShareForm.value.accessLimit : 100

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
  } finally {
    singleShareDialogVisible.value = false
    singleShareForm.value.expireType = ''
    singleShareForm.value.accessLimit = null
  }
}

// 单文件分享测试
// const itemIds = ref([1, 2, 3, 4]) // 示例数据
// const expireType = ref(1) // 示例有效期类型
// const accessLimit = ref(10) // 示例访问次数限制
// const handleShareItemOrigin = async (itemId: number) => {
//   try {
//     const response = (await shareItems(
//       [itemId],
//       expireType.value,
//       accessLimit.value,
//     )) as unknown as Result
//     if (response.code === 1) {
//       ElMessage.success('分享成功')
//     } else {
//       ElMessage.error('分享失败')
//     }
//   } catch (error) {
//     console.error('分享失败:', error)
//   }
// }

// 分享多文件
const shareDialogVisible = ref(false)
const shareForm = ref({
  expireType: '',
  accessLimit: null as number | null,
})

const handleShareItemsDialog = () => {
  if (selectedItemIds.value.length === 0) {
    ElMessage.warning('请先选择要分享的文件')
    return
  }
  shareDialogVisible.value = true
}

const confirmShareItems = async () => {
  const expireTypeValue = parseInt(shareForm.value.expireType, 10)
  const accessLimitValue = shareForm.value.accessLimit !== null ? shareForm.value.accessLimit : 100

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
  } finally {
    shareDialogVisible.value = false
    shareForm.value.expireType = ''
    shareForm.value.accessLimit = null
  }
}

// 分享成功弹出框
const shareSuccessDialogVisible = ref(false)
const shareSuccessData = ref({
  shareStr: '',
  shareCode: '',
  shareLink: '',
})
const handleShareSuccess = async (shareStr: string, shareCode: string, shareLink: string) => {
  shareSuccessDialogVisible.value = true
  shareSuccessData.value.shareStr = shareStr
  shareSuccessData.value.shareCode = shareCode
  shareSuccessData.value.shareLink = shareLink
}

// 复制分享链接
const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareSuccessData.value.shareLink)
    ElMessage.success('分享链接已复制到剪贴板')
  } catch (err) {
    console.error('无法复制到剪贴板:', err)
    ElMessage.error('无法复制分享链接')
  }
}

// 创建文件夹
const createNewFolder = () => {
  // 获取当前文件夹的 id 作为 pid
  const currentFolder = userFilesStore.userFilePath[userFilesStore.userFilePath.length - 1]
  // const currentFolder = fileList.value[0].pId
  console.log('createNewFolder', currentFolder)
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
      // 刷新文件列表
      const currentFolder = userFilesStore.userFilePath[userFilesStore.userFilePath.length - 1]
      // const currentFolder = fileList.value[0].pId
      const response = (await getUserItems(
        currentFolder ? currentFolder.id : 0,
      )) as unknown as Result
      if (response.code === 1) {
        // as any[]
        fileList.value = (response.data as unknown as Array<any>).sort(
          (a, b) => a.itemType - b.itemType,
        )
      } else {
        console.error('Failed to fetch user items:', response.msg)
      }
      dialogVisible.value = false
      ElMessage.success('文件夹创建成功')
    } else {
      console.error('Failed to create folder:', res.msg)
      ElMessage.error('文件夹创建失败')
    }
  } catch (error) {
    console.error('Error creating folder:', error)
    ElMessage.error('文件夹创建失败')
  }
}
// 重进直接清空
userFilesStore.userFilePath = []
//http://localhost:8080/user/file/downloadChunk  downloadTest

// 待做: formatSize pinia化
// 格式化文件大小
const formatSize = (fileSize: number) => {
  let size = fileSize || 0
  let i = 0
  while (size >= 1024 && i < UNITS.length - 1) {
    size /= 1024
    i++
  }
  return size.toFixed(2) + ' ' + UNITS[i]
}
// 下载单个文件
const downloadFile = async (itemId: number, fileId: number, fileSize: number, itemName: string) => {
  try {
    const chunkSize = CHUNK_DOWNLOAD_SIZE // 每个片段的大小（50KB）
    let start = 0
    // 添加文件到下载文件存储
    downloadFileStore.addFile(itemId, itemName, fileSize)

    // 如果浏览器支持 showSaveFilePicker
    // window.showSaveFilePicker, 测试环境,不进入if时可以写 0
    if (window.showSaveFilePicker) {
      // 请求文件系统写入权限
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: itemName,
      })
      const writableStream = await fileHandle.createWritable()

      downloadFileStore.setFileStatus(itemId, '正在下载')

      // 分片下载并写入
      while (start < fileSize) {
        const end = Math.min(start + chunkSize - 1, fileSize - 1)
        const chunkBlob = (await downloadChunk(
          itemId,
          fileId,
          start,
          end,
        )) as unknown as WriteParams
        await writableStream.write(chunkBlob)
        // await writableStream.write(chunkBlob)
        start = end + 1

        // 更新已下载的分片数量
        downloadFileStore.incrementDownloadChunks(itemId)
        // if(downloadFileStore.files[])
      }
      // 关闭写入流
      await writableStream.close()
      console.log('文件下载完成')
    } else {
      // 回退方案：使用传统的文件下载方式
      const blobParts: BlobPart[] = []
      while (start < fileSize) {
        const end = Math.min(start + chunkSize - 1, fileSize - 1)
        const chunkBlob = (await downloadChunk(itemId, fileId, start, end)) as unknown as Blob
        // const chunkResponse = await downloadChunk(itemId, fileId, start, end)
        // const chunkBlob = new Blob([chunkResponse.data], { type: 'application/octet-stream' }) // 转换为 Blob

        blobParts.push(chunkBlob)
        start = end + 1

        // 更新已下载的分片数量
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
      console.log('文件下载完成')
    }
  } catch (error) {
    console.error('文件下载失败:', error)
  }
}

// 计算属性：生成当前的文件夹路径
const folderPath = computed(() => {
  return userFilesStore.getAllFolders()
  // .filter((folder) => folder.directoryLevel <= userFilesStore.getAllFolders().length - 1)
})

const formatUpdateTime = (updateTime: number[] | undefined): string => {
  if (!updateTime || updateTime.length !== 6) {
    return ''
  }
  const [year, month, day, hour, minute, second] = updateTime
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

const handleChange = (file: UploadFile) => {
  uploadFileStore.addFile(file, userFilesStore.lastFolderId)
}

onMounted(async () => {
  try {
    const res = (await getUserItems(0)) as unknown as Result
    if (res.code === 1) {
      userFilesStore.userFilePath.push({
        id: 0,
        name: '根目录',
        directoryLevel: 0,
      })
      // fileList.value = res.data
      // (res.data as unknown as Array<any>)
      fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    } else {
      console.error('Failed to fetch user items:', res.msg)
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
})

const handleFileClick = async (itemPId: number, directoryLevel: number, itemName: string) => {
  console.log('Clicked on itemPId:', itemPId)
  try {
    const res = (await getUserItems(itemPId)) as unknown as Result
    if (res.code === 1) {
      userFilesStore.userFilePath.push({
        id: itemPId,
        directoryLevel: directoryLevel + 1,
        name: itemName,
      })
      // fileList.value = res.data
      fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    } else {
      console.error('Failed to fetch user items:', res.msg)
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
}

const handleFolderPathClick = async (folderId: number) => {
  console.log('Clicked on folder path:', folderId)
  try {
    // 获取当前文件夹的索引
    const folderIndex = userFilesStore.getAllFolders().findIndex((folder) => folder.id === folderId)
    if (folderIndex === -1) {
      console.error('Folder not found:', folderId)
      return
    }

    // 删除当前文件夹及其之后的所有文件夹
    userFilesStore.userFilePath = userFilesStore.userFilePath.slice(0, folderIndex + 1)

    // 获取新的文件列表
    const folder = userFilesStore.getFolderById(folderId)
    if (folder) {
      const response = (await getUserItems(Number(folder.id))) as unknown as Result
      if (response.code === 1) {
        // fileList.value = response.data
        fileList.value = (response.data as unknown as Array<any>).sort(
          (a, b) => a.itemType - b.itemType,
        )
      } else {
        console.error('Failed to fetch user items:', response.msg)
      }
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
}

const handleDeleteItem = async (itemId: number, itemType: number) => {
  try {
    // 弹出确认对话框
    if (itemType === 0) {
      await ElMessageBox.confirm('确定要删除该文件夹包含内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
    }

    const res = (await deleteItem(itemId)) as unknown as Result
    if (res.code === 1) {
      // 刷新文件列表
      const currentFolder = userFilesStore.userFilePath[userFilesStore.userFilePath.length - 1]
      const response = (await getUserItems(
        currentFolder ? currentFolder.id : 0,
      )) as unknown as Result
      if (response.code === 1) {
        fileList.value = (response.data as unknown as Array<any>).sort(
          (a, b) => a.itemType - b.itemType,
        )
      } else {
        console.error('Failed to fetch user items:', response.msg)
      }
      ElMessage.success('文件/文件夹删除成功')
    } else {
      console.error('Failed to delete item:', res.msg)
      ElMessage.error('文件/文件夹删除失败')
    }
  } catch (error) {
    console.error('Error deleting item:', error)
    ElMessage.error('文件/文件夹删除失败')
  }
}

// 文件预览
const previewFile = async (itemId: number) => {
  try {
    console.log('itemId:', itemId)

    const res = (await request.get(`/user/view/preview?itemId=${itemId}`)) as Result
    console.log('Response:', res) // 打印完整的响应
    if (res.code === 1) {
      // as URL
      const previewUrl = res.data as unknown as string // 后端返回的预览链接
      if (previewUrl) {
        window.open(new URL(previewUrl)) // 打开预览页面
        // 导航到加载页面，并传递预览URL作为查询参数
        // router.push({ name: 'LoadingPage', query: { previewUrl } })
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

// 文件搜索
const searchKeyword = ref('')
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
      console.error('搜索失败:', res.msg)
      ElMessage.error('搜索失败')
    }
  } catch (error) {
    console.error('搜索请求失败:', error)
    ElMessage.error('搜索请求失败')
  }
}

const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) {
    return text
  }
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<em class="em-highlight">$1</em>')
}
</script>

<style lang="less" scoped>
.common-layout {
  display: flex;
  height: 76vh;

  .all-files {
    background-color: rgba(188, 143, 143, 0.61);
    height: 100%;
    .el-table {
      height: 43vh;
      // ::v-deep em {
      :deep(em) {
        color: rgb(255, 94, 0);
        font-style: normal;
      }
    }
  }
}

.folder-path {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 16px;

  .folder-item {
    color: #409eff;
    cursor: pointer;
    margin: 0 4px;

    &:hover {
      // text-decoration: underline;
      color: rgb(39, 223, 255);
    }

    &.last-item {
      font-weight: bold; // 最后一个元素加粗
      color: #000; // 最后一个元素颜色改为黑色
    }
    &.last-item:hover {
      font-weight: bold; // 最后一个元素加粗
      color: #4530fc; // 最后一个元素颜色改为黑色
    }
  }

  .separator {
    margin: 0 4px;
    color: #999;
  }
}

.operation-buttons {
  display: flex;
  justify-content: flex-end; /* 右对齐 */
  // gap: 8px; /* 按钮之间的间距 */
}

.operation-buttons .el-button {
  min-width: 50px; /* 统一按钮宽度 */
}
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;

  .search-box {
    width: 250px;
    margin-left: 900px;
  }
}
</style>
