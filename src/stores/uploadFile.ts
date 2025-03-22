import { defineStore } from 'pinia'
import { ref } from 'vue'
// import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestHandler } from 'element-plus'
import type { UploadFile, UploadRawFile } from 'element-plus'
import type { FileRecord, FileInfo } from '@/types/fileType'
// 导入常量
import { CHUNK_SIZE, UNITS } from '@/constants/constants'
// const chunkSize = 5 * 1024 * 100 // 5MB

const chunkSize = CHUNK_SIZE
// const units = ['B', 'KB', 'MB', 'GB', 'TB']

export const useUploadFileStore = defineStore('uploadFile', () => {
  // ******************** 自定义对象类型 ********************
  const files = ref<FileRecord>({})
  // 初始化文件上传状态的方法
  const addFile = (rawFile: UploadFile, currentPId: number) => {
    const file: FileInfo = {
      ...rawFile,
      uploadStatus: '已准备',
      uploadedChunks: 0,
      totalChunks: 0,
      uploadedChunkIndexes: [],
      percentage: 0, // 进度百分比 防止报错重定义
      raw: rawFile.raw as UploadRawFile,
      targetPathId: currentPId,
      workers: [], // 添加 workers 数组
      abortControllers: [], // 添加 abortControllers 数组
    }
    if (!file.size) {
      file.size = 0
    }
    const totalChunks = Math.ceil(file.size / chunkSize)
    file.totalChunks = totalChunks

    files.value[file.uid] = file
  }
  // 格式化文件大小
  const formatSize = (fileUid: number) => {
    const file = files.value[fileUid]
    let size = file?.size || 0
    let i = 0
    while (size >= 1024 && i < UNITS.length - 1) {
      size /= 1024
      i++
    }
    return size.toFixed(2) + ' ' + UNITS[i]
  }

  // 更新已上传的分片数量的方法
  const incrementUploadedChunks = (uid: number, chunkIndex: number) => {
    console.log('触发 - 更新已上传的分片数量的方法', uid, chunkIndex)
    const file = files.value[uid]
    if (file) {
      file.uploadedChunks += 1
      file.uploadedChunkIndexes.push(chunkIndex)
    }
  }

  // 计算文件上传进度的 getter
  const uploadProgress = (uid: number) => {
    const file = files.value[uid]
    if (!file || file.totalChunks === 0) return 0
    return Math.round((file.uploadedChunks / file.totalChunks) * 100)
  }

  // 获取文件状态
  const getFileStatus = (uid: number) => {
    return files.value[uid].uploadStatus
  }

  // 移除文件
  const removeFile = (uid: number) => {
    if (files.value[uid]) {
      delete files.value[uid]
    }
  }

  // 检查文件是否暂停
  const isFilePaused = (uid: number) => {
    return files.value[uid]?.uploadStatus === '已暂停'
  }

  // // 设置文件状态的方法
  // const setFileStatus = (uid: number, newStatus: string) => {
  //   console.log('触发 - 设置文件状态的方法')
  //   console.log('文件状态-前', files.value[uid].uploadStatus)
  //   const file = files.value[uid]
  //   if (file) {
  //     files.value[uid].uploadStatus = newStatus
  //   }
  //   console.log('文件状态-后', files.value[uid].uploadStatus)
  // }

  // 在 uploadFile.ts 中
  const setFileStatus = (uid: number, newStatus: string) => {
    console.log('触发 - 设置文件状态的方法')
    console.log('文件状态-前', files.value[uid].uploadStatus)
    const file = files.value[uid]
    if (file) {
      files.value[uid].uploadStatus = newStatus
      if (newStatus === '已暂停') {
        // 终止所有 Worker
        file.workers?.forEach((worker) => worker.terminate())
        // 终止所有上传请求
        file.abortControllers?.forEach((controller) => controller.abort())
      }
    }
    console.log('文件状态-后', files.value[uid].uploadStatus)
  }
  // *****************************************
  // 返回状态和方法
  return {
    files,
    addFile,
    formatSize,
    incrementUploadedChunks,
    uploadProgress,
    getFileStatus,
    setFileStatus,
    removeFile,
    isFilePaused,
  }
})
