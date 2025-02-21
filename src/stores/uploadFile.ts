import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestHandler } from 'element-plus'

export const useUploadFileStore = defineStore('uploadFile', () => {
  // 文件状态对象
  const files = ref<
    Record<
      number,
      {
        name: string
        size: number
        status: string // 文件状态：已准备、正在上传、已暂停、已完成、上传失败
        uploadedChunks: number // 已上传的分片数量
        totalChunks: number // 总分片数量
        uploadedChunkIndexes: number[] // 已上传的分片下标
      }
    >
  >({})

  // 初始化文件上传状态的方法
  const initFileStatus = (uid: number, name: string, size: number, totalChunks: number) => {
    files.value[uid] = {
      name,
      size,
      uploadedChunks: 0,
      totalChunks,
      status: '已准备',
      uploadedChunkIndexes: [],
    }
  }

  // 获取文件对象的方法
  const getFileByUid = (
    uid: number,
  ): {
    name: string
    size: number
    status: string
    uploadedChunks: number
    totalChunks: number
    uploadedChunkIndexes: number[]
  } | null => {
    if (files.value[uid]) {
      return files.value[uid]
    }
    console.log('未成功根据uid获取文件对象')
    return null
  }

  // 更新已上传的分片数量的方法
  const incrementUploadedChunks = (uid: number, chunkIndex: number) => {
    if (files.value[uid]) {
      files.value[uid].uploadedChunks += 1
      files.value[uid].uploadedChunkIndexes.push(chunkIndex)
    }
  }

  // 设置文件状态的方法
  const setFileStatus = (uid: number, status: string) => {
    console.log('触发 - 设置文件状态的方法')
    console.log('文件状态-前', files.value[uid].status)
    const file = files.value[uid]
    if (file) {
      files.value[uid].status = status
    }
    console.log('文件状态-后', files.value[uid].status)
  }

  // 重置文件状态的方法
  const removeFileStatus = (uid: number) => {
    if (files.value[uid]) {
      delete files.value[uid]
    }
  }

  // 计算文件上传进度的 getter
  const uploadFileProgress = (uid: number) => {
    const file = files.value[uid]
    if (!file || file.totalChunks === 0) return 0
    return Math.round((file.uploadedChunks / file.totalChunks) * 100)
  }
  // 检查文件是否暂停
  const isFilePaused = (uid: number) => {
    return files.value[uid]?.status === '已暂停'
  }

  // 返回状态和方法
  return {
    files,
    initFileStatus,
    getFileByUid,
    incrementUploadedChunks,
    setFileStatus,
    removeFileStatus,
    uploadFileProgress,
    isFilePaused,
  }
})
