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
                <el-table-column prop="status" label="状态" width="180"></el-table-column>
                <el-table-column prop="size" label="大小（字节）"></el-table-column>
                <!-- 移除 -->
                <el-table-column fixed="right" label="Operations" min-width="120">
                  <template #default="scope">
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
import { ref, onComputed } from 'vue'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import {
  uploadFile,
  uploadFileChunks,
  uploadFileByCut,
  uploadFileByCutThreadPool,
} from '@/api/file'
import { genFileId, ElMessage } from 'element-plus'
import { cutFileChunk } from '@/utils/cutFile-sui'
import request from '@/utils/request'

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadRawFile[]>([])

// const testChunkUpload = async () => {
//   await cutFileChunk()
// }
const mergeTest = async () => {
  const res = await request.post('/user/file/mergeTest')
}
// 处理文件选择变化
const handleChange = (file: UploadRawFile, fileListData: UploadRawFile[]) => {
  // 更新 fileList
  fileList.value = fileListData
  console.log(fileList.value)
}

const submitUpload = () => {
  if (!uploadRef.value) {
    console.error('上传实例未定义')
    return
  }
  // uploadRef.value!.submit()
  uploadRef.value.submit()
}

const handleUpload = async (options: any) => {
  const file = options.file
  try {
    // const res = await uploadFile(file) // 调用自定义上传函数
    // const res = await uploadFileChunks(file) // 调用自定义上传函数
    // const res = await uploadFileByCut(file) // 调用自定义上传函数
    const res = await uploadFileByCutThreadPool(file) // 调用自定义上传函数
    // const res = await cutFileChunk(file) // 调用自定义上传函数
    // ElMessage.success(`File uploaded successfully: ${res.msg}`)
    // console.log('Uploaded file:', res.data)
  } catch (error) {
    ElMessage.error(`Failed to upload file: ${error.msg}`)
    // ElMessage.error(`Failed to upload file catch`)
    // console.log('Failed Uploaded file:', res.data)
  }
}

const deleteRow = (index: number) => {
  console.log(index)
  console.log(fileList.value)

  fileList.value.splice(index, 1)
  console.log(fileList.value)
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
