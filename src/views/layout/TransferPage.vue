<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <h3>文件传输</h3>
        </el-header>
        <el-container>
          <el-aside>
            <LeftTabs></LeftTabs>
          </el-aside>
          <el-container>
            <el-main>
              <!-- <button @click="mergeTest">合并测试</button> -->
              <el-button @click="showUpload = true">上传列表</el-button>
              <el-button @click="showUpload = false">下载列表</el-button>
              <!-- 怎么写v-show,再写一个文件下载的el-table -->
              <!-- 文件上传 -->
              <div v-show="showUpload">
                <el-upload
                  ref="uploadRef"
                  class=""
                  :limit="10"
                  :auto-upload="false"
                  :show-file-list="false"
                  :multiple="true"
                  @change="handlePiniaChange"
                >
                  <template #trigger>
                    <el-button type="primary"> 选择文件/文件夹 </el-button>
                  </template>
                  <el-button class="ml-3" type="success" @click="submitPiniaUpload">
                    开始上传
                  </el-button>
                  <template #tip>
                    <!-- 要做吗?新文件覆盖旧文件 -->
                    <!-- 待做:上传时显示目标位置,浏览页面添加上传按钮 -->
                    <div class="el-upload__tip text-red">已限制选择不可超10文件</div>
                  </template>
                </el-upload>
                <!-- 新的表 -->
                <el-table
                  :data="Object.values(uploadFileStore.files)"
                  stripe
                  style="width: 100%; margin-top: 20px"
                >
                  <el-table-column prop="name" label="文件名" width="180"></el-table-column>
                  <el-table-column prop="uploadStatus" label="上传状态" width="180">
                  </el-table-column>
                  <el-table-column prop="size" label="大小（字节）">
                    <template #default="scope">
                      {{ uploadFileStore.formatSize(scope.row.uid) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="上传进度" width="180">
                    <template #default="scope">
                      <el-progress
                        :percentage="uploadFileStore.uploadProgress(scope.row.uid)"
                      ></el-progress>
                      <!-- <span>下标: {{ getIndexByUid(scope.row.uid) }}</span> -->
                    </template>
                  </el-table-column>
                  <!-- 移除 -->
                  <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default="scope">
                      <el-button
                        v-if="uploadFileStore.getFileStatus(scope.row.uid) === '已准备'"
                        link
                        type="primary"
                        size="small"
                        @click.prevent="startPiniaUpload(scope.row.uid)"
                      >
                        上传
                      </el-button>
                      <el-button
                        v-else-if="uploadFileStore.getFileStatus(scope.row.uid) === '正在上传'"
                        link
                        type="warning"
                        size="small"
                        @click.prevent="pauseUpload(scope.row.uid)"
                      >
                        暂停
                      </el-button>
                      <el-button
                        v-else-if="uploadFileStore.getFileStatus(scope.row.uid) === '已暂停'"
                        link
                        type="primary"
                        size="small"
                        @click.prevent="resumeUpload(scope.row.uid)"
                      >
                        继续
                      </el-button>
                      <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="deleteRow(scope.$index)"
                      >
                        移除
                      </el-button>
                      <span v-if="uploadFileStore.getFileStatus(scope.row.uid) === '正在上传'">
                        上传中...
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 文件下载 -->
              <div v-show="!showUpload">
                <!-- 下载文件列表 -->
                <el-table
                  v-show="!showUpload"
                  :data="Object.values(downloadFileStore.files)"
                  stripe
                  style="width: 100%; margin-top: 20px"
                >
                  <el-table-column prop="fileName" label="文件名" width="180"></el-table-column>
                  <el-table-column prop="downloadStatus" label="下载状态" width="180">
                  </el-table-column>
                  <el-table-column prop="fileSize" label="大小（字节）">
                    <template #default="scope">
                      {{ downloadFileStore.formatSize(scope.row.itemId) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="下载进度" width="180">
                    <template #default="scope">
                      <el-progress
                        :percentage="downloadFileStore.downloadProgress(scope.row.itemId)"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <!-- 移除 -->
                  <!-- @click.prevent="
                          downloadFile(
                            scope.row.itemId,
                            scope.row.fileId,
                            scope.row.fileSize,
                            scope.row.fileName,)
                        " -->
                  <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default="scope">
                      <el-button
                        v-if="downloadFileStore.getFileStatus(scope.row.itemId) === '已准备'"
                        link
                        type="primary"
                        size="small"
                      >
                        下载
                      </el-button>
                      <!--
                        @click.prevent="pauseDownload(scope.row.itemId)"
                       -->
                      <el-button
                        v-else-if="downloadFileStore.getFileStatus(scope.row.itemId) === '正在下载'"
                        link
                        type="warning"
                        size="small"
                      >
                        暂停
                      </el-button>
                      <!-- @click.prevent="resumeDownload(scope.row.itemId)" -->
                      <el-button
                        v-else-if="downloadFileStore.getFileStatus(scope.row.itemId) === '已暂停'"
                        link
                        type="primary"
                        size="small"
                      >
                        继续
                      </el-button>
                      <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="downloadFileStore.removeFile(scope.row.itemId)"
                      >
                        移除
                      </el-button>
                      <span v-if="downloadFileStore.getFileStatus(scope.row.itemId) === '正在下载'">
                        下载中...
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftTabs from '@/components/LeftTabs.vue'
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
import { genFileId, ElMessage } from 'element-plus'
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
      if (res === 1) {
        uploadFileStore.setFileStatus(fileUid, '已完成')
        ElMessage.success(`文件 ${file.name} 上传成功`)
      }
    } catch (error) {
      uploadFileStore.setFileStatus(fileUid, '上传失败')
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

    // 处理上传成功逻辑
    console.log('处理上传成功逻辑', res)
    if (res === 1) {
      uploadFileStore.setFileStatus(fileUid, '已完成')
      ElMessage.success(`文件 ${file.name} 上传成功`)
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

const deleteRow = (fileUid: number) => {
  console.log('移除文件', fileUid)
  uploadFileStore.removeFile(fileUid)

  // const fileUid = fileList.value[index].uid
  // fileList.value.splice(index, 1)
  // uploadFileStore.removeFile(fileUid)
  // console.log(fileList.value)
}

// ********* 测试方法 *********

const mergeTest = async () => {
  const res = await request.post('/user/file/mergeTest')
}
</script>

<style scoped lang="less">
.common-layout {
  .el-container {
    // background-color: #0f5757;
    .el-header {
      // background-color: #f5ff67;
      background: linear-gradient(to right, #ffdfa2, #fff59e);
      text-align: center;
      // min-height: 8vh;
    }
    .el-container {
      .el-aside {
        width: 120px;
      }
    }
    .el-main {
      // background-color: #6bb5ff;
      background: linear-gradient(to bottom, #d7eeff, #8dcbff);
      text-align: center;
      min-height: 82vh;
    }
    .el-footer {
      // background-color: #b6ffa7;
      background: linear-gradient(to bottom, #8dcbff, #1fffa2);
      text-align: center;
      min-height: 8vh;
    }
  }
}

.el-main {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
