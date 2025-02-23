<template>
  <div>
    <div class="common-layout">
      <LeftFile />
      <div class="all-files">
        <el-table :data="fileList">
          <el-table-column prop="itemId" label="Item ID" width="180" />
          <el-table-column prop="itemName" label="文件名称" width="180" />
          <el-table-column prop="itemType" label="类型" width="180">
            <template #default="scope">
              <span v-if="scope.row.itemType === 1" style="cursor: pointer; color: black">
                文件
              </span>
              <span
                v-else
                @click="handleFileClick(scope.row.itemId)"
                style="cursor: pointer; color: blue"
              >
                文件夹
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="fileId" label="File ID" width="180" />
          <el-table-column prop="fileSize" label="文件大小" width="180" />
          <el-table-column prop="fileExtension" label="File Extension" width="180" />
          <el-table-column label="Update Time" width="180">
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
          @change="handleChange"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖动文件到此处 或 <em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </template>
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
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadFile,
  UploadRequestHandler,
  UploadRequestOptions,
} from 'element-plus'
import { ref, onMounted } from 'vue'
const fileList = ref([])
const uploadRef = ref<UploadInstance>()
const uploadFileStore = useUploadFileStore()
const formatUpdateTime = (updateTime: number[]) => {
  const [year, month, day, hour, minute, second] = updateTime
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

const handleChange = (file: UploadFile) => {
  uploadFileStore.addFile(file)
}

onMounted(async () => {
  try {
    const res = await getUserItems(0)
    if (res.code === 1) {
      fileList.value = res.data
    } else {
      console.error('Failed to fetch user items:', res.msg)
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
})

const handleFileClick = async (itemId: number) => {
  console.log('Clicked on itemId:', itemId)
  try {
    const response = await getUserItems(itemId)
    if (response.code === 1) {
      fileList.value = response.data
    } else {
      console.error('Failed to fetch user items:', response.msg)
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
  }
}
</style>
