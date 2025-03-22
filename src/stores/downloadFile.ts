import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DownloadFileInfo, DownloadFileRecord } from '@/types/fileType'
import { CHUNK_DOWNLOAD_SIZE, UNITS } from '@/constants/constants'

export const useDownloadFileStore = defineStore('downloadFile', () => {
  const files = ref<DownloadFileRecord>({})
  // 添加下载文件
  const addFile = (itemId: number, fileName: string, fileSize: number) => {
    // 待做: itemId在files不存在时才添加
    const file: DownloadFileInfo = {
      itemId,
      fileName,
      fileSize,
      downloadStatus: '已准备',
      downloadedChunks: 0,
      totalChunks: 0,
    }
    file.totalChunks = Math.ceil(file.fileSize / CHUNK_DOWNLOAD_SIZE)

    files.value[file.itemId] = file
  }
  // 格式化文件大小
  const formatSize = (itemId: number) => {
    const file = files.value[itemId]
    let size = file?.fileSize || 0
    let i = 0
    while (size >= 1024 && i < UNITS.length - 1) {
      size /= 1024
      i++
    }
    return size.toFixed(2) + ' ' + UNITS[i]
  }

  // 更新已上传的分片数量的方法
  const incrementDownloadChunks = (itemId: number) => {
    console.log('触发 - 更新已下载的分片数量的方法', itemId)
    const file = files.value[itemId]
    if (file) {
      file.downloadedChunks += 1
    }
    // 判断是否全部分片下载完成
    if (file.downloadedChunks === file.totalChunks) {
      file.downloadStatus = '已完成'
    }
  }
  // 下载进度
  const downloadProgress = computed(() => {
    return (itemId: number) => {
      const file = files.value[itemId]
      if (!file || file.totalChunks === 0) return 0
      return Math.round((file.downloadedChunks / file.totalChunks) * 100)
    }
  })

  // 获取文件状态
  const getFileStatus = (itemId: number) => {
    return files.value[itemId].downloadStatus
  }

  // 移除文件
  const removeFile = (itemId: number) => {
    if (files.value[itemId]) {
      delete files.value[itemId]
    }
  }

  // 检查文件是否暂停
  const isFilePaused = (itemId: number) => {
    return files.value[itemId]?.downloadStatus === '已暂停'
  }
  // 设置文件状态的方法
  const setFileStatus = (itemId: number, newStatus: string) => {
    // console.log('触发 - 设置文件状态的方法')
    // console.log('文件状态-前', files.value[itemId].downloadStatus)
    const file = files.value[itemId]
    if (file) {
      files.value[itemId].downloadStatus = newStatus
    }
    // console.log('文件状态-后', files.value[itemId].downloadStatus)
  }

  return {
    files,
    downloadProgress,
    addFile,
    formatSize,
    incrementDownloadChunks,
    getFileStatus,
    removeFile,
    isFilePaused,
    setFileStatus,
  }
})
