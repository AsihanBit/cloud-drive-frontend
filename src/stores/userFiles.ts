import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FolderInfo } from '@/types/fileType'

// 定义一个 Pinia 存储，用于管理用户的浏览文件信息

export const useUserFilesStore = defineStore('userFiles', () => {
  const userFilePath = ref<FolderInfo[]>([])

  // 添加文件夹
  const addFolder = (folder: FolderInfo) => {
    userFilePath.value.push(folder)
  }

  // 删除文件夹
  const removeFolder = (folderId: number) => {
    userFilePath.value = userFilePath.value.filter((folder) => folder.id !== folderId)
  }

  // 更新文件夹
  const updateFolder = (folderId: number, newName: string) => {
    const folder = userFilePath.value.find((folder) => folder.id === folderId)
    if (folder) {
      folder.name = newName
    }
  }

  // 获取所有文件夹
  const getAllFolders = () => {
    return userFilePath.value
  }

  // 根据 ID 获取文件夹
  const getFolderById = (folderId: number) => {
    return userFilePath.value.find((folder) => folder.id === folderId)
  }

  // 计算属性：返回最后一个目录的 id
  const lastFolderId = computed(() => {
    const paths = userFilePath.value
    console.log(paths.length > 0 ? paths[paths.length - 1].id : null)
    return paths.length > 0 ? paths[paths.length - 1].id : 0
  })

  return {
    userFilePath,
    addFolder,
    removeFolder,
    updateFolder,
    getAllFolders,
    getFolderById,
    lastFolderId,
  }
})
