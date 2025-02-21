<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside>
            <LeftTabs></LeftTabs>
          </el-aside>
          <el-container>
            <el-main>
              <button>随切随传按钮</button>
              <button @click="mergeTest">合并测试</button>
              <!-- 文件上传 -->
              <el-upload
                ref="uploadRef"
                class=""
                :limit="3"
                :auto-upload="false"
                :http-request="handleUpload"
                :show-file-list="false"
                :multiple="true"
                @change="handleChange"
              >
                <template #trigger>
                  <el-button type="primary"> 选择文件/文件夹 </el-button>
                </template>
                <el-button class="ml-3" type="success" @click="submitUpload"> 点击上传 </el-button>
                <template #tip>
                  <div class="el-upload__tip text-red">最多上3文件,新文件覆盖旧文件</div>
                </template>
              </el-upload>
              <el-table :data="fileList" stripe style="width: 100%; margin-top: 20px">
                <el-table-column prop="name" label="文件名" width="180"></el-table-column>
                <el-table-column prop="status" label="状态" width="180">
                  <template #default="scope">
                    {{ uploadFileStore.files[scope.row.uid]?.status }}
                  </template>
                </el-table-column>
                <el-table-column prop="size" label="大小（字节）"></el-table-column>
                <el-table-column label="进度" width="180">
                  <template #default="scope">
                    <el-progress
                      :percentage="uploadFileStore.uploadFileProgress(scope.row.uid)"
                    ></el-progress>
                  </template>
                </el-table-column>
                <!-- 移除 -->
                <el-table-column fixed="right" label="Operations" min-width="120">
                  <template #default="scope">
                    <el-button
                      v-if="uploadFileStore.files[scope.row.uid]?.status === '已准备'"
                      link
                      type="primary"
                      size="small"
                      @click.prevent="startUpload(scope.row.uid)"
                    >
                      上传
                    </el-button>
                    <el-button
                      v-else-if="uploadFileStore.files[scope.row.uid]?.status === '正在上传'"
                      link
                      type="warning"
                      size="small"
                      @click.prevent="pauseUpload(scope.row.uid)"
                    >
                      暂停
                    </el-button>
                    <el-button
                      v-else-if="uploadFileStore.files[scope.row.uid]?.status === '已暂停'"
                      link
                      type="primary"
                      size="small"
                      @click.prevent="resumeUpload(scope.row.uid)"
                    >
                      继续
                    </el-button>
                    <span v-if="uploadFileStore.files[scope.row.uid]?.status === '正在上传'">
                      上传中...
                    </span>
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click.prevent="deleteRow(scope.$index)"
                    >
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
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
import { ref } from 'vue'
import type { Reactive, Ref } from 'vue'
import type {
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

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadRawFile[]>([])
const uploadFileStore = useUploadFileStore()

const handleChange = (file: UploadRawFile, fileListData: UploadRawFile[]) => {
  // 更新 fileList
  fileList.value = fileListData
  console.log(fileList.value)

  // 检查文件状态是否已经初始化
  if (!uploadFileStore.files[file.uid]) {
    // 初始化文件上传状态
    const chunkSize = 5 * 1024 * 100 // 5MB
    const totalChunks = Math.ceil(file.size / chunkSize)
    uploadFileStore.initFileStatus(file.uid, file.name, file.size, totalChunks)
    console.log('触发了handleChange，初始化文件状态')
  }
}

const handleUpload: UploadRequestHandler = async (options: any) => {
  const file: UploadRawFile = options.file
  console.log('handleUpload-options', options)
  console.log('handleUpload-options.file', options.file)
  uploadFileStore.setFileStatus(file.uid, '正在上传')
  try {
    const res = await uploadFileChunksThreadPool(file)
    // 处理上传成功逻辑
    console.log('处理上传成功逻辑', res)
    if (res === 1) {
      uploadFileStore.setFileStatus(file.uid, '已完成')
      ElMessage.success(`文件 ${file.name} 上传成功`)
    }
  } catch (error) {
    ElMessage.error(`Failed to upload file: ${error.msg}`)
    uploadFileStore.setFileStatus(file.uid, '上传失败')
  }
}

const pauseUpload = (fileUid: number) => {
  uploadFileStore.setFileStatus(fileUid, '已暂停')
  // 可以在这里保存已经上传的分片信息
}

const resumeUpload = (fileUid: number) => {
  uploadFileStore.setFileStatus(fileUid, '正在上传')
  // 从上次上传的位置继续上传
  startUpload(fileUid)
}
const startUpload = async (fileUid: number) => {
  // 找到对应的文件
  const file = fileList.value.find((f) => f.uid === fileUid)
  if (!file) {
    console.error('未找到对应的文件')
    return
  }

  // 设置文件状态为正在上传
  uploadFileStore.setFileStatus(fileUid, '正在上传')

  try {
    // 确保传递的是原始的 UploadRawFile 对象  Blob 对象
    const rawFile: UploadRawFile = file.raw // 提取原始的 File 对象
    if (!rawFile || !(rawFile instanceof File)) {
      console.error('无效的文件对象:', rawFile)
      console.error('文件类型:', typeof rawFile)
      return
    }
    // 调用 uploadFileChunksThreadPool 函数上传文件
    const res = await uploadFileChunksThreadPool(rawFile)

    // 处理上传成功逻辑
    console.log('处理上传成功逻辑', res)
    if (res === 1) {
      uploadFileStore.setFileStatus(fileUid, '已完成')
      ElMessage.success(`文件 ${file.name} 上传成功`)
    }
  } catch (error) {
    ElMessage.error(`Failed to upload file: ${error.message}`)
    uploadFileStore.setFileStatus(fileUid, '上传失败')
  }
}
const submitUpload = () => {
  if (!uploadRef.value) {
    console.error('上传实例未定义')
    return
  }
  uploadRef.value.submit()
}
const deleteRow = (index: number) => {
  console.log('移除文件', index)

  const fileUid = fileList.value[index].uid
  fileList.value.splice(index, 1)
  uploadFileStore.removeFileStatus(fileUid)
  console.log(fileList.value)
}

// ********* 测试方法 *********

const mergeTest = async () => {
  const res = await request.post('/user/file/mergeTest')
}
</script>

<style scoped lang="less">
.common-layout {
  .el-container {
    background-color: #70ffff;
    .el-header {
      background-color: #f5ff67;
      text-align: center;
      min-height: 8vh;
    }
    .el-container {
      .el-aside {
        width: 120px;
      }
    }
    .el-main {
      background-color: #6bb5ff;
      text-align: center;
      min-height: 82vh;
    }
    .el-footer {
      background-color: #b6ffa7;
      text-align: center;
      min-height: 8vh;
    }
  }
}
</style>
