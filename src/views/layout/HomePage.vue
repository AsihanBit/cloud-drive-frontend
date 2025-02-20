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
                    {{ fileUploadStatus[scope.row.uid].status }}
                  </template>
                </el-table-column>
                <el-table-column prop="size" label="大小（字节）"></el-table-column>
                <!-- 移除 -->
                <el-table-column fixed="right" label="Operations" min-width="120">
                  <template #default="scope">
                    <el-button
                      v-if="fileUploadStatus[scope.row.uid].status === '已准备'"
                      link
                      type="primary"
                      size="small"
                      @click.prevent="startUpload(scope.row.uid)"
                    >
                      上传
                    </el-button>
                    <el-button
                      v-else-if="fileUploadStatus[scope.row.uid].status === '正在上传'"
                      link
                      type="warning"
                      size="small"
                      @click.prevent="pauseUpload(scope.row.uid)"
                    >
                      暂停
                    </el-button>
                    <el-button
                      v-else-if="fileUploadStatus[scope.row.uid].status === '已暂停'"
                      link
                      type="primary"
                      size="small"
                      @click.prevent="resumeUpload(scope.row.uid)"
                    >
                      继续
                    </el-button>
                    <span v-if="fileUploadStatus[scope.row.uid].status === '正在上传'"
                      >上传中...</span
                    >
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
import { ref, reactive, onComputed } from 'vue'
import type { Reactive, Ref } from 'vue'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
// import { uploadFileByCutThreadPool } from '@/api/file'
import { uploadFileChunksThreadPool } from '@/utils/chunkUtils'
import { genFileId, ElMessage } from 'element-plus'

import request from '@/utils/request'

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadRawFile[]>([])

// const fileUploadStatus = ref<{
//   [key: string]: {
//     isPaused: Ref<boolean>
//     uploadedChunks: Ref<number[]>
//     status: Ref<string>
//   }
// }>({})

// 简化后的 fileUploadStatus 定义
const fileUploadStatus = ref<
  Record<
    string,
    {
      isPaused: boolean
      status: string
    }
  >
>({})
const handleUpload = async (options: any) => {
  const file = options.file
  console.log(fileUploadStatus.value[file.uid])
  fileUploadStatus.value[file.uid].status = '正在上传'
  try {
    const res = await uploadFileChunksThreadPool(file)
    // 处理上传成功逻辑
    console.log('处理上传成功逻辑', res)
    if (res === 1) {
      fileUploadStatus.value[file.uid].status = '已完成'
      ElMessage.success(`文件 ${file.name} 上传成功`)
    }
  } catch (error) {
    ElMessage.error(`Failed to upload file: ${error.msg}`)
    fileUploadStatus.value[file.uid].status = '上传失败'
  }
}

const handleChange = (file: UploadRawFile, fileListData: UploadRawFile[]) => {
  // 更新 fileList
  fileList.value = fileListData
  console.log(fileList.value)

  if (!fileUploadStatus.value[file.uid]) {
    fileUploadStatus.value[file.uid] = {
      isPaused: true,
      status: '已准备',
    }
  }
  console.log(fileUploadStatus.value[file.uid].status)
}

const pauseUpload = (fileUid: string) => {
  fileUploadStatus.value[fileUid].isPaused = true
  fileUploadStatus.value[fileUid].status = '已暂停'
  // 可以在这里保存已经上传的分片信息
}

const resumeUpload = (fileUid: string) => {
  const uid = Number(fileUid) // 将 fileUid 转换为 number 类型
  fileUploadStatus.value[fileUid].isPaused = false
  fileUploadStatus.value[fileUid].status = '正在上传'
  // 从上次上传的位置继续上传
  const file = fileList.value.find((f) => f.uid === uid)
  if (file) {
    handleUpload({ file })
  }
}
const submitUpload = () => {
  if (!uploadRef.value) {
    console.error('上传实例未定义')
    return
  }
  // uploadRef.value!.submit()
  uploadRef.value.submit()
}

const deleteRow = (index: number) => {
  console.log('移除文件', index)

  const fileUid = fileList.value[index].uid
  fileList.value.splice(index, 1)
  delete fileUploadStatus.value[fileUid]
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
