<template>
  <div>
    <div class="common-layout">
      <LeftFile />
      <div class="all-files">
        <el-button type="primary" @click="downloadTest()"> 下载测试 </el-button>
        <el-button type="primary" @click="downloadFullFile()"> 下载测试 2</el-button>
        <!-- 文件夹路径 -->
        <!-- TODO 路径太长时,只显示根路径和最后三个文件夹路径 -->
        <div class="folder-path">
          <span
            v-for="(folder, index) in folderPath"
            :key="folder.id"
            @click="handleFolderPathClick(folder.id)"
            style="cursor: pointer; color: blue; margin-right: 5px"
          >
            {{ folder.name }}
            <span v-if="index < folderPath.length - 1"> > </span>
          </span>
        </div>
        <el-table :data="fileList">
          <el-table-column prop="itemId" label="Item ID" width="80" />
          <el-table-column prop="itemName" label="文件名称" width="180" />
          <el-table-column prop="directoryLevel" label="文件层级" width="100" />
          <el-table-column prop="itemType" label="类型" width="180">
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
          <el-table-column prop="fileSize" label="文件大小" width="180" />
          <el-table-column prop="fileExtension" label="文件扩展名" width="100" />
          <el-table-column label="操作" width="90">
            <template #default="scope">
              <el-button
                type="primary"
                @click="
                  downloadFile(
                    scope.row.itemId,
                    scope.row.fileId,
                    scope.row.fileSize,
                    scope.row.itemName,
                  )
                "
                >下载</el-button
              >
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
          </div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LeftFile from '@/components/LeftFile.vue'
import { getUserItems } from '@/api/userItems'
import { Folder, Picture, UploadFilled } from '@element-plus/icons-vue'
import { useUploadFileStore } from '@/stores/uploadFile'
import { useUserFilesStore } from '@/stores/userFiles'
import { downloadChunk } from '@/api/file'
import request from '@/utils/request'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadFile,
  UploadRequestHandler,
  UploadRequestOptions,
} from 'element-plus'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const fileList = ref([])
const uploadRef = ref<UploadInstance>()
const uploadFileStore = useUploadFileStore()
const userFilesStore = useUserFilesStore()

console.log(userFilesStore.lastFolderId)
// 重进直接清空
userFilesStore.userFilePath = []
//http://localhost:8080/user/file/downloadChunk  downloadTest

// 下载单个文件
const downloadFile = async (itemId: number, fileId: number, fileSize: number, itemName: string) => {
  try {
    const chunkSize = 1024 * 1024 * 5 // 每个片段的大小（50KB）
    let start = 0
    // 请求文件系统写入权限
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: itemName,
    })
    const writableStream = await fileHandle.createWritable()

    // 分片下载并写入
    while (start < fileSize) {
      const end = Math.min(start + chunkSize - 1, fileSize - 1)
      const chunkBlob = await downloadChunk(itemId, fileId, start, end)
      await writableStream.write(chunkBlob)
      // await writableStream.write(chunkBlob)
      start = end + 1
    }

    // 关闭写入流
    await writableStream.close()
    console.log('文件下载完成')
  } catch (error) {
    console.error('文件下载失败:', error)
  }
}

// 分片下载
const downloadChunk1 = async (start, end) => {
  try {
    const response = await request.get('/user/file/downloadChunk', {
      responseType: 'blob',
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    })
    // return response.data
    // return response
    return new Blob([response], { type: 'application/octet-stream' }) // 明确指定类型
  } catch (error) {
    console.error('下载文件片段失败:', error)
    throw error
  }
}
const downloadTest = async () => {
  try {
    // const fileSize = 1237003 // txt
    const fileSize = 139922562
    const chunkSize = 1024 * 1024 * 5 // 每个片段的大小（50KB）
    let start = 0

    // 请求文件系统写入权限
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: '233.txt',
    })
    const writableStream = await fileHandle.createWritable()

    // 分片下载并写入
    while (start < fileSize) {
      const end = Math.min(start + chunkSize - 1, fileSize - 1)
      const chunkBlob = await downloadChunk1(start, end)

      await writableStream.write(chunkBlob)
      // await writableStream.write(chunkBlob)
      start = end + 1
    }

    // 关闭写入流
    await writableStream.close()
    console.log('文件下载完成')
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
    const res = await getUserItems(0)
    if (res.code === 1) {
      userFilesStore.userFilePath.push({
        id: 0,
        name: '根目录',
        directoryLevel: 0,
      })
      fileList.value = res.data
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
    const res = await getUserItems(itemPId)
    if (res.code === 1) {
      userFilesStore.userFilePath.push({
        id: itemPId,
        directoryLevel: directoryLevel + 1,
        name: itemName,
      })
      fileList.value = res.data
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
      const response = await getUserItems(Number(folder.id))
      if (response.code === 1) {
        fileList.value = response.data
      } else {
        console.error('Failed to fetch user items:', response.msg)
      }
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  display: flex;
  height: 76vh;

  .all-files {
    background-color: rosybrown;
    height: 100%;
    .el-table {
      height: 52vh;
    }
  }
}
</style>
<!--
// 获取文件大小
const getFileSize = async () => {
  try {
    const response = await axios.head('/downloadChunk')
    return parseInt(response.headers['content-length'], 10)
  } catch (error) {
    console.error('获取文件大小失败:', error)
    throw error
  }
}

// 下载文件 内存存储
const downloadTest1 = async () => {
  try {
    // 获取文件大小
    // const fileSize = await getFileSize()
    const fileSize = 1237003
    const chunkSize = 1024 * 500 // 每个片段的大小（1MB）
    const chunks = []
    let start = 0

    // 分片下载
    while (start < fileSize) {
      const end = Math.min(start + chunkSize - 1, fileSize - 1)
      const chunkBlob = await downloadChunk(start, end)
      chunks.push(chunkBlob)
      start = end + 1
    }

    // 合并片段
    const mergedBlob = mergeBlobs(chunks)

    // 保存文件
    saveFile(mergedBlob, '233.txt')
    console.log('文件下载完成')
  } catch (error) {
    console.error('文件下载失败:', error)
  }
}
// 合并 Blob 片段
const mergeBlobs = (blobs) => {
  return new Blob(blobs, { type: 'application/octet-stream' })
}
// 保存文件到本地
const saveFile = (blob, filename) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

// 一次整个下载
const downloadTest = async () => {
  try {
    const response = await request.get('/user/file/downloadChunk', {
      responseType: 'blob',
      // onDownloadProgress: progressEvent => {
      //   progress.value = Math.round(
      //     (progressEvent.loaded / progressEvent.total) * 100
      //   )
      // }
    })
    saveFile(response, 'downloaded_file.txt')
  } catch (err) {
    throw new Error(`完整文件下载失败: ${err.message}`)
  }
}
// 保存文件到本地
const saveFile = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
-->
