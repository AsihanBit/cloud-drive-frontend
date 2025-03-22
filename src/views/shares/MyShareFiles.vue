<template>
  <div class="my-share-files">
    <!-- 文件夹路径显示 -->
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

    <!-- @selection-change="handleSelectionChange" -->
    <el-table :data="sharedFiles" @row-click="handleRowClick">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="shareItemId" label="分享条目ID" width="90"></el-table-column>
      <el-table-column prop="shareId" label="分享ID" width="80"></el-table-column>
      <el-table-column prop="userId" label="用户ID" width="120"></el-table-column>
      <el-table-column prop="itemId" label="用户条目ID" width="120"></el-table-column>
      <el-table-column prop="itemName" label="条目名称" width="70"></el-table-column>
      <el-table-column prop="itemType" label="条目类型" width="160"></el-table-column>
      <el-table-column prop="fileId" label="文件id" width="80"></el-table-column>
      <el-table-column prop="fileSize" label="大小" width="80"></el-table-column>
      <el-table-column prop="fileCover" label="封面" width="80"></el-table-column>
      <el-table-column prop="fileExtension" label="扩展名" width="80"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getSharedItems } from '@/api/share'
import { useRoute } from 'vue-router'

const sharedFiles = ref([])
const route = useRoute()
const folderPath = ref<{ id: number; name: string }[]>([])

onMounted(async () => {
  const shareId = route.params.shareId as number
  // const res = await getSharedItems(route.params.shareId, null)
  // sharedFiles.value = res.data
  await loadFolderContent(shareId, null)
  folderPath.value = [{ id: 0, name: '根目录' }]
})

// 加载文件夹内容
const loadFolderContent = async (shareId: number, pItemId: number | null) => {
  const res = await getSharedItems(shareId, pItemId)
  sharedFiles.value = res.data
}

const handleRowClick = async (row: any) => {
  if (row.itemType === 0) {
    // 如果是文件夹，则添加到路径中
    folderPath.value.push({ id: row.shareItemId, name: row.itemName })
    // 加载该文件夹的内容
    await loadFolderContent(row.shareId, row.shareItemId)

    // const res = await getSharedItems(row.shareId, row.shareItemId)
    // sharedFiles.value = res.data
  }
  if (row.itemType === 1) {
    // TODO: 预览文件
  }
}

// 点击路径中的文件夹
const handleFolderPathClick = async (pItemId: number) => {
  const index = folderPath.value.findIndex((folder) => folder.id === pItemId)
  if (index !== -1) {
    // 截断路径到点击的文件夹
    folderPath.value = folderPath.value.slice(0, index + 1)
    // 加载该文件夹的内容
    const shareId = route.params.shareId as number
    await loadFolderContent(shareId, pItemId)
  }
}
</script>

<style lang="less" scoped>
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
</style>
